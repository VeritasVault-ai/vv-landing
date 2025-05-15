"use client"
import { useState, useEffect } from "react"
import { Search, Filter, RefreshCw, Clock, Tag, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EventItem } from "@/components/features/event-grid/event-item"
import styles from "./event-feed.module.css"

type EventType =
  | "system.status"
  | "system.error"
  | "user.login"
  | "user.logout"
  | "user.created"
  | "data.updated"
  | "security.alert"
  | "security.access"

type EventFilter = {
  eventType?: EventType
  source?: string
  severity?: string
}

type Event = {
  id: string
  eventType: EventType
  title: string
  description: string
  source: string
  severity: "critical" | "warning" | "info" | "success"
  timestamp: string
  data?: Record<string, any>
}

// Mock events data
const generateMockEvents = (count: number): Event[] => {
  const eventTypes: EventType[] = [
    "system.status",
    "system.error",
    "user.login",
    "user.logout",
    "user.created",
    "data.updated",
    "security.alert",
    "security.access",
  ]
  const sources = ["api", "database", "auth-service", "data-processor", "scheduler", "monitoring"]
  const severities = ["critical", "warning", "info", "success"] as const
  
  const events: Event[] = []
  
  for (let i = 0; i < count; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const severity = severities[Math.floor(Math.random() * severities.length)]
    
    let title = ""
    let description = ""
    
    switch (eventType) {
      case "system.status":
        title = "System Status Update"
        description = `${source} service reported status: ${severity === "success" ? "healthy" : "degraded"}`
        break
      case "system.error":
        title = "System Error Detected"
        description = `Error in ${source} service: Connection timeout`
        break
      case "user.login":
        title = "User Login"
        description = `User admin@example.com logged in successfully`
        break
      case "user.logout":
        title = "User Logout"
        description = `User admin@example.com logged out`
        break
      case "user.created":
        title = "New User Created"
        description = `New user account created: user${i}@example.com`
        break
      case "data.updated":
        title = "Data Updated"
        description = `${source} data updated successfully`
        break
      case "security.alert":
        title = "Security Alert"
        description = `Suspicious activity detected from IP 192.168.1.${i % 255}`
        break
      case "security.access":
        title = "Access Attempt"
        description = `${severity === "critical" ? "Failed" : "Successful"} access attempt to ${source}`
        break
    }
    
    events.push({
      id: `event-${i}`,
      eventType,
      title,
      description,
      source,
      severity,
      timestamp: `${i < 5 ? i + 1 : i < 10 ? 10 : 30 * (i % 10)} ${i < 10 ? "minute" : "hour"}${i < 5 ? "" : "s"} ago`,
      data: {
        details: `Additional details for event ${i}`,
        metadata: {
          ip: `192.168.1.${i % 255}`,
          user: i % 3 === 0 ? "admin@example.com" : `user${i}@example.com`,
          resource: `/api/v1/${source}/${i}`,
        },
      },
    })
  }
  
  return events
}

interface EventFeedProps {
  topicId: string
  title?: string
  description?: string
  initialFilter?: EventFilter
  maxEvents?: number
}

export const EventFeed = ({
  topicId,
  title = "Event Feed",
  description,
  initialFilter = {},
  maxEvents = 20,
}: EventFeedProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [filter, setFilter] = useState<EventFilter>(initialFilter)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  
  // Simulate fetching events
  useEffect(() => {
    setLoading(true)
    // Simulate API delay
    const timer = setTimeout(() => {
      const mockEvents = generateMockEvents(maxEvents)
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [maxEvents, topicId])
  
  // Apply filters and search
  const filteredEvents = events.filter((event) => {
    // Apply type filter
    if (filter.eventType && event.eventType !== filter.eventType) {
      return false
    }
    
    // Apply source filter
    if (filter.source && event.source !== filter.source) {
      return false
    }
    
    // Apply severity filter
    if (filter.severity && event.severity !== filter.severity) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.source.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const refreshEvents = () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const mockEvents = generateMockEvents(maxEvents)
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
      
      <div className={styles.toolbar}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.actions}>
          <Button variant="outline" size="sm" className={styles.actionButton} onClick={() => {}}>
            <Filter className={styles.actionIcon} />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className={styles.actionButton} onClick={refreshEvents}>
            <RefreshCw className={`${styles.actionIcon} ${loading ? styles.spinning : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      {Object.keys(filter).length > 0 && (
        <div className={styles.activeFilters}>
          <div className={styles.filterBadges}>
            {filter.eventType && (
              <Badge variant="outline" className={styles.filterBadge}>
                <Tag className={styles.badgeIcon} />
                <span>Type: {filter.eventType}</span>
              </Badge>
            )}
            
            {filter.source && (
              <Badge variant="outline" className={styles.filterBadge}>
                <Server className={styles.badgeIcon} />
                <span>Source: {filter.source}</span>
              </Badge>
            )}
            
            {filter.severity && (
              <Badge variant="outline" className={styles.filterBadge}>
                <Clock className={styles.badgeIcon} />
                <span>Severity: {filter.severity}</span>
              </Badge>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className={styles.clearFiltersButton} onClick={() => setFilter({})}>
            Clear filters
          </Button>
        </div>
      )}
      
      <div className={styles.eventsList}>
        {loading ? (
          <div className={styles.loadingState}>
            <RefreshCw className={`${styles.loadingIcon} ${styles.spinning}`} />
            <p>Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No events found</p>
          </div>
        ) : (
          filteredEvents.map((event) => <EventItem key={event.id} event={event} />)
        )}
      </div>
    </div>
  )
}