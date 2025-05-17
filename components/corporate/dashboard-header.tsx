"use client"

import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { useState } from "react"
import { DashboardStatus } from "./dashboard-status"
import { WebSocketStatus } from "@/types/websocket-infrastructure"

interface DashboardHeaderProps {
  title: string
  description?: string
  isSimulated?: boolean
  connectionStatus?: WebSocketStatus
  lastUpdated?: string
  onRefresh?: () => Promise<void>
}

/**
 * Header component for dashboard sections
 * Displays title, description, connection status, and action buttons
 */
export function DashboardHeader({
  title,
  description,
  isSimulated = false,
  connectionStatus = 'disconnected',
  lastUpdated,
  onRefresh
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return
    
    try {
      setIsRefreshing(true)
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-slate-600 dark:text-slate-400 mt-1">{description}</p>
        )}
      </div>
      
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-3">
        <DashboardStatus 
          isSimulated={isSimulated}
          connectionStatus={connectionStatus}
          lastUpdated={lastUpdated}
        />
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  )
}