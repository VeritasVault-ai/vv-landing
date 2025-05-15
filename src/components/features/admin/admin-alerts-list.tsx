"use client"
import { useState } from "react"
import { AlertCircle, AlertTriangle, Info, CheckCircle, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "./admin-alerts-list.module.css"

type AlertSeverity = "critical" | "warning" | "info" | "success"

type Alert = {
  id: string
  title: string
  message: string
  severity: AlertSeverity
  timestamp: string
  isRead: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "API Rate Limit Exceeded",
    message: "The CoinGecko API rate limit has been exceeded. Some market data may be delayed.",
    severity: "critical",
    timestamp: "10 minutes ago",
    isRead: false,
  },
  {
    id: "2",
    title: "New User Registration",
    message: "5 new users have registered in the last hour.",
    severity: "info",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Database Backup Completed",
    message: "Automated database backup completed successfully.",
    severity: "success",
    timestamp: "3 hours ago",
    isRead: true,
  },
  {
    id: "4",
    title: "Memory Usage Warning",
    message: "System memory usage has exceeded 80% for more than 15 minutes.",
    severity: "warning",
    timestamp: "5 hours ago",
    isRead: true,
  },
  {
    id: "5",
    title: "Failed Login Attempts",
    message: "Multiple failed login attempts detected from IP 192.168.1.254.",
    severity: "warning",
    timestamp: "1 day ago",
    isRead: true,
  },
]

interface AdminAlertsListProps {
  limit?: number
}

export const AdminAlertsList = ({ limit }: AdminAlertsListProps) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const displayedAlerts = limit ? alerts.slice(0, limit) : alerts

  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className={`${styles.alertIcon} ${styles.iconCritical}`} />
      case "warning":
        return <AlertTriangle className={`${styles.alertIcon} ${styles.iconWarning}`} />
      case "info":
        return <Info className={`${styles.alertIcon} ${styles.iconInfo}`} />
      case "success":
        return <CheckCircle className={`${styles.alertIcon} ${styles.iconSuccess}`} />
      default:
        return <Info className={styles.alertIcon} />
    }
  }

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
  }

  return (
    <div className={styles.alertsContainer}>
      {displayedAlerts.length === 0 ? (
        <div className={styles.noAlerts}>
          <Info className={styles.noAlertsIcon} />
          <p>No alerts to display</p>
        </div>
      ) : (
        <ul className={styles.alertsList}>
          {displayedAlerts.map((alert) => (
            <li
              key={alert.id}
              className={`${styles.alertItem} ${!alert.isRead ? styles.unread : ""}`}
              onClick={() => markAsRead(alert.id)}
            >
              <div className={styles.alertIconContainer}>{getSeverityIcon(alert.severity)}</div>
              <div className={styles.alertContent}>
                <div className={styles.alertHeader}>
                  <h4 className={styles.alertTitle}>{alert.title}</h4>
                  <div className={styles.alertTimestamp}>
                    <Clock className={styles.timestampIcon} />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
                <p className={styles.alertMessage}>{alert.message}</p>
              </div>
              <Button variant="ghost" size="icon" className={styles.alertAction}>
                <ChevronRight className={styles.actionIcon} />
              </Button>
            </li>
          ))}
        </ul>
      )}
      
      {limit && alerts.length > limit && (
        <div className={styles.viewAllContainer}>
          <Button variant="link" className={styles.viewAllButton}>
            View all alerts
          </Button>
        </div>
      )}
    </div>
  )
}