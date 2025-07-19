"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface SmartDataOptions<T> {
  initialData?: T
  refreshInterval?: number // in milliseconds
  onError?: (error: Error) => void
  processPollingInterval?: number // in milliseconds
}

interface RefreshStatus {
  lastUpdated?: string
  nextRefresh?: string
  isRefreshing?: boolean
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  meta?: {
    refreshStatus?: RefreshStatus
    processId?: string
    [key: string]: any
  }
}

/**
 * Hook for fetching data from smart API endpoints
 */
export function useSmartData<T>(endpoint: string, options: SmartDataOptions<T> = {}) {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [refreshStatus, setRefreshStatus] = useState<RefreshStatus | null>(null)
  const { toast } = useToast()

  // Fetch data function
  const fetchData = async (forceRefresh = false) => {
    try {
      setIsLoading(true)

      // Add refresh parameter if forcing refresh
      const url = forceRefresh ? `${endpoint}${endpoint.includes("?") ? "&" : "?"}refresh=true` : endpoint

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const result: ApiResponse<T> = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Unknown error")
      }

      // Update data if available
      if (result.data) {
        setData(result.data)
      }

      // Update refresh status
      if (result.meta?.refreshStatus) {
        setRefreshStatus(result.meta.refreshStatus)
      }

      // If there's a background process, poll for its completion
      if (result.meta?.processId && result.meta?.refreshStatus?.isRefreshing) {
        pollProcessStatus(result.meta.processId)
      }

      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)

      if (options.onError) {
        options.onError(error)
      } else {
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        })
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Poll for process status
  const pollProcessStatus = async (processId: string) => {
    try {
      const interval = setInterval(async () => {
        const response = await fetch(`/api/process-status/${processId}`)

        if (!response.ok) {
          clearInterval(interval)
          return
        }

        const result = await response.json()

        if (result.success && result.data) {
          const status = result.data.status

          if (status === "completed") {
            clearInterval(interval)
            // Refetch data to get the updated version
            fetchData()
          } else if (status === "failed") {
            clearInterval(interval)
            toast({
              title: "Data refresh failed",
              description: result.data.errorMessage || "Unknown error",
              variant: "destructive",
            })
          }
        }
      }, options.processPollingInterval || 2000) // Poll every 2 seconds by default

      // Clean up interval
      return () => clearInterval(interval)
    } catch (err) {
      console.error("Error polling process status:", err)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchData()

    // Set up refresh interval if specified
    if (options.refreshInterval) {
      const intervalId = setInterval(() => {
        fetchData()
      }, options.refreshInterval)

      return () => clearInterval(intervalId)
    }
  }, [endpoint])

  // Function to manually refresh data
  const refresh = () => fetchData(true)

  return {
    data,
    isLoading,
    error,
    refreshStatus,
    refresh,
  }
}
