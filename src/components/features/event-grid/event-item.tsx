"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, CheckCircle, Clock, Server, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import styles from "./event-item.module.css"

type EventType =
  | "system.status"
  | "system.error"
  | "user.login"
  | "user.logout"
  | "user.created"
  | "data.updated"
  | "security.alert"
  | "security.access"

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

interface EventItemProps {
  event: Event
}

export const EventItem = ({ event }: EventItemProps) => {
  const [expanded, setExpanded] = useState(false)

  const getSeverityIcon = (severity: Event["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className={`${styles.severityIcon} ${styles.iconCritical}`} />
      case "warning":
        return <AlertTriangle className={`${styles.severityIcon} ${styles.iconWarning}`} />
      case "info":
        return <Info className={`${styles.severityIcon} ${styles.iconInfo}`} />
      case "success":
        return <CheckCircle className={`${styles.severityIcon} ${styles.iconSuccess}`} />
      default:
        return <Info className={styles.severityIcon} />
    }
  }

  return (
    <div className={`${styles.eventItem} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.eventHeader} onClick={() => setExpanded(!expanded)}>
        <div className={styles.eventIconContainer}>{getSeverityIcon(event.severity)}</div>
        <div className={styles.eventContent}>
          <div className={styles.eventTitle}>{event.title}</div>
          <div className={styles.eventDescription}>{event.description}</div>
          <div className={styles.eventMeta}>
            <Badge variant="outline" className={styles.eventBadge}>
              <Tag className={styles.badgeIcon} />
              <span>{event.eventType}</span>
            </Badge>
            <Badge variant="outline" className={styles.eventBadge}>
              <Server className={styles.badgeIcon} />
              <span>{event.source}</span>
            </Badge>
            <Badge variant="outline" className={styles.eventBadge}>
              <Clock className={styles.badgeIcon} />
              <span>{event.timestamp}</span>
            </Badge>
          </div>
        </div>
        <div className={styles.expandButton}>
          {expanded ? <ChevronUp className={styles.expandIcon} /> : <ChevronDown className={styles.expandIcon} />}
        </div>
      </div>
      {expanded && event.data && (
        <div className={styles.eventDetails}>
          <div className={styles.detailsTitle}>Event Details</div>
          <pre className={styles.detailsContent}>{JSON.stringify(event.data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}