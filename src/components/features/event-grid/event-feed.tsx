"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Filter, RefreshCw, Search, Server, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import styles from "./event-feed.module.css"
import { EventItem } from "./event-item"

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
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  
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

  const handleFilterClick = () => {
    setShowFilterDialog(true);
    // In a real implementation, you would show a dialog or dropdown
    // For now, we'll just toggle the state to demonstrate the functionality
    console.log("Filter dialog should open");
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
            aria-label="Search events"
          />
        </div>
        
        <div className={styles.actions}>
          <Button 
            variant="outline" 
            size="sm" 
            className={styles.actionButton} 
            onClick={handleFilterClick}
            aria-label="Open filter options"
          >
            <Filter className={styles.actionIcon} />
            <span>Filter</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={styles.actionButton} 
            onClick={refreshEvents}
            aria-label="Refresh events"
          >
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={styles.clearFiltersButton} 
            onClick={() => setFilter({})}
            aria-label="Clear all filters"
          >
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Filter Dialog would be rendered here in a real implementation */}
      {showFilterDialog && (
        <div 
          className={styles.filterDialogOverlay} 
          onClick={() => setShowFilterDialog(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-dialog-title"
        >
          <div className={styles.filterDialog} onClick={(e) => e.stopPropagation()}>
            {/* Filter Dialog Content */}
            <h4 id="filter-dialog-title">Filter Events</h4>
            <div className={styles.filterOptions}>
              {/* Event Type Filter */}
              <div className={styles.filterOption}>
                <label htmlFor="event-type-select">Event Type</label>
                <select
                  id="event-type-select"
                  value={filter.eventType || ""}
                  onChange={(e) => setFilter({ ...filter, eventType: e.target.value as EventType || undefined })}
                  aria-label="Filter by event type"
                >
                  <option value="">All Types</option>
                  <option value="system.status">System Status</option>
                  <option value="system.error">System Error</option>
                  <option value="user.login">User Login</option>
                  <option value="user.logout">User Logout</option>
                  <option value="user.created">User Created</option>
                  <option value="data.updated">Data Updated</option>
                  <option value="security.alert">Security Alert</option>
                  <option value="security.access">Security Access</option>
                </select>
              </div>
              
              {/* Source Filter */}
              <div className={styles.filterOption}>
                <label htmlFor="source-select">Source</label>
                <select
                  id="source-select"
                  value={filter.source || ""}
                  onChange={(e) => setFilter({ ...filter, source: e.target.value || undefined })}
                  aria-label="Filter by source"
                >
                  <option value="">All Sources</option>
                  <option value="api">API</option>
                  <option value="database">Database</option>
                  <option value="auth-service">Auth Service</option>
                  <option value="data-processor">Data Processor</option>
                  <option value="scheduler">Scheduler</option>
                  <option value="monitoring">Monitoring</option>
                </select>
              </div>
              
              {/* Severity Filter */}
              <div className={styles.filterOption}>
                <label htmlFor="severity-select">Severity</label>
                <select
                  id="severity-select"
                  value={filter.severity || ""}
                  onChange={(e) => setFilter({ ...filter, severity: e.target.value || undefined })}
                  aria-label="Filter by severity"
                >
                  <option value="">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                </select>
              </div>
            </div>
            
            <div className={styles.filterActions}>
              <Button 
                variant="outline" 
                onClick={() => setFilter({})}
                aria-label="Reset all filters"
              >
                Reset
              </Button>
              <Button 
                onClick={() => setShowFilterDialog(false)}
                aria-label="Apply filters and close dialog"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.eventsList}>
        {loading ? (
          <div className={styles.loadingState}>
            <RefreshCw className={`${styles.loadingIcon} ${styles.spinning}`} aria-hidden="true" />
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