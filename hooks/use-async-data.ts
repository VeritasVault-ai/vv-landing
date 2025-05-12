"use client"

import { useState, useEffect, useCallback } from 'react'
import { ApiError } from '@/lib/services/base-service'

interface AsyncDataState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  isRefreshing: boolean
}

/**
 * Custom hook for handling async data fetching with consistent loading and error states
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  initialData: T | null = null
) {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: initialData,
    isLoading: true,
    error: null,
    isRefreshing: false,
  })

  const fetchData = useCallback(async (showRefreshState = false) => {
    try {
      if (showRefreshState) {
        setState(prev => ({ ...prev, isRefreshing: true, error: null }))
      } else {
        setState(prev => ({ ...prev, isLoading: true, error: null }))
      }

      const result = await fetchFn()
      
      setState({
        data: result,
        isLoading: false,
        isRefreshing: false,
        error: null,
      })
      
      return result
    } catch (err) {
      console.error('Error fetching data:', err)
      
      let errorMessage = 'An unknown error occurred'
      
      if (err instanceof ApiError) {
        errorMessage = err.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: errorMessage,
      }))
      
      return null
    }
  }, [fetchFn])

  const refresh = useCallback(() => {
    return fetchData(true)
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchFn])

  return {
    ...state,
    refresh,
  }
}