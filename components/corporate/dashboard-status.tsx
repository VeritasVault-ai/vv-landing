"use client"

import { useEffect, useState } from "react"
import { SimulationIndicator } from "./simulation-indicator"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, AlertTriangle } from "lucide-react"
import { WebSocketStatus } from "@/lib/services/dashboard-realtime-manager"

interface DashboardStatusProps {
  isSimulated?: boolean
  connectionStatus?: WebSocketStatus
  lastUpdated?: string
  className?: string
}

/**
 * Component that displays the current status of the dashboard data
 * Shows connection status, simulation mode, and last update time
 */
export function DashboardStatus({
  isSimulated = false,
  connectionStatus = 'disconnected',
  lastUpdated,
  className
}: DashboardStatusProps) {
  const [timeAgo, setTimeAgo] = useState<string>("")
  
  // Update the time ago string every minute
  useEffect(() => {
    if (!lastUpdated) return
    
    const updateTimeAgo = () => {
      const lastUpdateTime = new Date(lastUpdated).getTime()
      const now = Date.now()
      const diffInSeconds = Math.floor((now - lastUpdateTime) / 1000)
      
      if (diffInSeconds < 60) {
        setTimeAgo("just now")
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        setTimeAgo(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`)
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        setTimeAgo(`${hours} ${hours === 1 ? 'hour' : 'hours'} ago`)
      } else {
        const days = Math.floor(diffInSeconds / 86400)
        setTimeAgo(`${days} ${days === 1 ? 'day' : 'days'} ago`)
      }
    }
    
    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [lastUpdated])
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Connection status */}
      <Badge 
        variant={connectionStatus === 'connected' ? 'outline' : 'destructive'}
        className="flex items-center gap-1.5"
      >
        {connectionStatus === 'connected' ? (
          <>
            <Wifi className="h-3.5 w-3.5" />
            <span>Connected</span>
          </>
        ) : connectionStatus === 'connecting' ? (
          <>
            <Wifi className="h-3.5 w-3.5 animate-pulse" />
            <span>Connecting...</span>
          </>
        ) : connectionStatus === 'error' ? (
          <>
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Connection Error</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3.5 w-3.5" />
            <span>Disconnected</span>
          </>
        )}
      </Badge>
      
      {/* Simulation indicator */}
      {isSimulated && <SimulationIndicator showLabel />}
      
      {/* Last updated time */}
      {lastUpdated && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Updated: {timeAgo}
        </span>
      )}
    </div>
  )
}