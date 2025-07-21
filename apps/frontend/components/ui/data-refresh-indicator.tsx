"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface DataRefreshIndicatorProps {
  processId?: string
  lastUpdated?: string
  className?: string
}

export function DataRefreshIndicator({ processId, lastUpdated, className = "" }: DataRefreshIndicatorProps) {
  const [status, setStatus] = useState<"idle" | "refreshing" | "complete" | "error">(processId ? "refreshing" : "idle")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    if (!processId) return

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/process-status/${processId}`)
        const data = await response.json()

        if (data.status === "completed") {
          setStatus("complete")
        } else if (data.status === "error") {
          setStatus("error")
        } else {
          setStatus("refreshing")
          // Check again in 2 seconds
          setTimeout(checkStatus, 2000)
        }
      } catch (error) {
        console.error("Error checking process status:", error)
        setStatus("error")
      }

      setLastChecked(new Date())
    }

    checkStatus()
  }, [processId])

  // Format the last updated time
  const formatTime = (dateString?: string) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className={`flex items-center text-xs text-muted-foreground ${className}`}>
      {status === "refreshing" && (
        <>
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
          <span>Refreshing data...</span>
        </>
      )}

      {status === "complete" && <span>Updated at {formatTime(lastUpdated)}</span>}

      {status === "error" && <span className="text-destructive">Refresh failed</span>}

      {status === "idle" && lastUpdated && <span>Updated at {formatTime(lastUpdated)}</span>}
    </div>
  )
}
