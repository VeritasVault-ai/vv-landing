"use client"
import { useState, useEffect } from "react"
import { AlertTriangle, Bell, Settings, DollarSign, Shield, ArrowRightLeft, Newspaper } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import styles from "./alerts-panel.module.css"

interface Alert {
  id: string
  type: "price" | "security" | "transaction" | "news"
  title: string
  description: string
  timestamp: string
}

export interface AlertsPanelProps {
  chain?: string
}

export const AlertsPanel = ({ chain = "all" }: AlertsPanelProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Simulate loading alerts data
    const loadAlerts = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // Mock alerts data
      const mockData: Alert[] = [
        {
          id: "a1",
          type: "price",
          title: "ETH price alert",
          description: "ETH has increased by 5% in the last hour",
          timestamp: "2023-05-12T15:10:00Z",
        },
        {
          id: "a2",
          type: "security",
          title: "Unusual login attempt",
          description: "Login attempt from a new location detected",
          timestamp: "2023-05-12T14:05:00Z",
        },
        {
          id: "a3",
          type: "transaction",
          title: "Transaction confirmed",
          description: "Your withdrawal of 0.5 ETH has been confirmed",
          timestamp: "2023-05-12T12:30:00Z",
        },
        {
          id: "a4",
          type: "news",
          title: "Market update",
          description: "New regulatory framework announced for crypto assets",
          timestamp: "2023-05-12T10:15:00Z",
        },
      ]
      
      setAlerts(mockData)
      setIsLoading(false)
    }
    
    loadAlerts()
  }, [chain])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "price":
        return <DollarSign className={`${styles.alertIcon} ${styles.price}`} />
      case "security":
        return <Shield className={`${styles.alertIcon} ${styles.security}`} />
      case "transaction":
        return <ArrowRightLeft className={`${styles.alertIcon} ${styles.transaction}`} />
      case "news":
        return <Newspaper className={`${styles.alertIcon} ${styles.news}`} />
      default:
        return <AlertTriangle className={styles.alertIcon} />
    }
  }

  return (
    <Card className={styles.alertsCard}>
      <CardHeader className={styles.cardHeader}>
        <div>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Recent notifications and alerts</CardDescription>
        </div>
        <Button variant="outline" size="sm" className={styles.configButton}>
          <Settings className={styles.buttonIcon} />
          <span>Configure</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className={styles.alertsList}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.alertItemSkeleton}>
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        ) : alerts.length > 0 ? (
          <div className={styles.alertsList}>
            {alerts.map((alert) => (
              <div key={alert.id} className={styles.alertItem}>
                {getAlertIcon(alert.type)}
                <div className={styles.alertContent}>
                  <div className={styles.alertTitle}>{alert.title}</div>
                  <div className={styles.alertDescription}>{alert.description}</div>
                </div>
                <div className={styles.alertTime}>{formatTime(alert.timestamp)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Bell className={styles.emptyIcon} />
            <p>No alerts at this time</p>
            <Button variant="outline" size="sm">
              Configure Alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}