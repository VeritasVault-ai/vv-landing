"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api/api-client"

export interface CorporateRecentActivityProps {
  className?: string
}

interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  amount?: number
  status: string
}

export function CorporateRecentActivity({ className }: CorporateRecentActivityProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        // Fetch real data from API
        const response = await apiClient.get<Activity[]>(`/activities?filter=${filter}`)
        setActivities(response)
        setError(null)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError("Failed to load recent activities")
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [filter])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return "↓"
      case "withdrawal":
        return "↑"
      case "swap":
        return "⇄"
      case "stake":
        return "⚓"
      default:
        return "•"
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions and updates</CardDescription>
        </div>
        <div className="flex space-x-2">
          <select
            className="px-2 py-1 text-sm border rounded-md"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="swap">Swaps</option>
            <option value="stake">Staking</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No activities found</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                  <span className="text-lg">{getTypeIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activity.amount && (
                    <span className="font-medium">
                      {activity.type === "deposit" ? "+" : activity.type === "withdrawal" ? "-" : ""}$
                      {activity.amount.toLocaleString()}
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CorporateRecentActivity
