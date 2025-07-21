"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

interface DashboardActivityProps {
  limit?: number
}

/**
 * Component that displays recent activity and transactions
 */
export function DashboardActivity({ limit }: DashboardActivityProps) {
  // Mock data for recent activity
  const activities = [
    {
      id: "act-1",
      type: "deposit",
      asset: "USDC",
      amount: "50,000",
      status: "completed",
      timestamp: "2025-05-15T01:24:32Z"
    },
    {
      id: "act-2",
      type: "strategy",
      name: "Balanced Yield",
      action: "optimized",
      change: "+2.3% APY",
      status: "completed",
      timestamp: "2025-05-14T22:15:45Z"
    },
    {
      id: "act-3",
      type: "withdrawal",
      asset: "ETH",
      amount: "12.5",
      status: "pending",
      timestamp: "2025-05-14T18:30:12Z"
    },
    {
      id: "act-4",
      type: "alert",
      message: "Risk level increased in Strategy #3",
      severity: "warning",
      timestamp: "2025-05-14T14:22:05Z"
    },
    {
      id: "act-5",
      type: "deposit",
      asset: "ETH",
      amount: "25",
      status: "completed",
      timestamp: "2025-05-14T10:45:18Z"
    },
    {
      id: "act-6",
      type: "strategy",
      name: "High Yield",
      action: "created",
      status: "completed",
      timestamp: "2025-05-14T09:12:33Z"
    },
    {
      id: "act-7",
      type: "alert",
      message: "Smart contract audit completed",
      severity: "info",
      timestamp: "2025-05-13T22:05:41Z"
    },
    {
      id: "act-8",
      type: "withdrawal",
      asset: "USDC",
      amount: "15,000",
      status: "completed",
      timestamp: "2025-05-13T16:33:27Z"
    }
  ]
  
  // Apply limit if provided
  const displayedActivities = limit ? activities.slice(0, limit) : activities
  
  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`
    }
  }
  
  // Get icon based on activity type
  const getActivityIcon = (activity: any) => {
    switch (activity.type) {
      case "deposit":
        return <ArrowUpRight className="h-5 w-5 text-green-500" />
      case "withdrawal":
        return <ArrowDownRight className="h-5 w-5 text-amber-500" />
      case "strategy":
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "alert":
        return activity.severity === "warning" ? 
          <AlertCircle className="h-5 w-5 text-amber-500" /> : 
          <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }
  
  // Get activity description
  const getActivityDescription = (activity: any) => {
    switch (activity.type) {
      case "deposit":
        return `Deposited ${activity.amount} ${activity.asset}`
      case "withdrawal":
        return `Withdrew ${activity.amount} ${activity.asset}`
      case "strategy":
        return `Strategy "${activity.name}" ${activity.action} ${activity.change || ""}`
      case "alert":
        return activity.message
      default:
        return "Unknown activity"
    }
  }
  
  // Get status badge
  const getStatusBadge = (activity: any) => {
    if (!activity.status) return null
    
    let variant = "default"
    if (activity.status === "completed") variant = "success"
    if (activity.status === "pending") variant = "warning"
    if (activity.status === "failed") variant = "destructive"
    
    return (
      <Badge variant={variant as any} className="ml-2">
        {activity.status}
      </Badge>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest transactions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-0.5">
                {getActivityIcon(activity)}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium">
                    {getActivityDescription(activity)}
                    {getStatusBadge(activity)}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {limit && activities.length > limit && (
            <div className="text-center pt-2">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all activity
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}