"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api/api-client"

export interface CorporateUpcomingEventsProps {
  className?: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  type: string
  importance: "high" | "medium" | "low"
}

export function CorporateUpcomingEvents({ className }: CorporateUpcomingEventsProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        // Fetch real data from API
        const response = await apiClient.get<Event[]>(`/events?filter=${filter}`)
        setEvents(response)
        setError(null)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load upcoming events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [filter])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
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
          <CardTitle>Upcoming Events</CardTitle>
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
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Calendar of important events</CardDescription>
        </div>
        <div className="flex space-x-2">
          <select
            className="px-2 py-1 text-sm border rounded-md"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="governance">Governance</option>
            <option value="protocol">Protocol Updates</option>
            <option value="market">Market Events</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No upcoming events</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                  <span className="text-sm font-medium">{formatDate(event.date).split(",")[0]}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(event.date).split(",")[1]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getImportanceColor(event.importance)}`}>
                      {event.importance}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CorporateUpcomingEvents
