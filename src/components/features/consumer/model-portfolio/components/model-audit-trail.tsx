"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import styles from "../model-portfolio-dashboard.module.css"

interface AuditEvent {
  timestamp: string
  event: string
  details: string
  actor: string
}

interface ModelAuditTrailProps {
  auditTrail: AuditEvent[]
}

export const ModelAuditTrail = ({ auditTrail }: ModelAuditTrailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <Card className={styles.auditTrail}>
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.auditList}>
          {auditTrail.map((event, index) => (
            <div key={index} className={styles.auditItem}>
              <div className={styles.auditTimestamp}>
                {formatDate(event.timestamp)}
              </div>
              <div className={styles.auditEvent}>
                <div className={styles.auditEventTitle}>
                  {event.event} {event.actor !== "System" && `by ${event.actor}`}
                </div>
                <div className={styles.auditEventDetails}>
                  {event.details}
                </div>
              </div>
            </div>
          ))}
        </div>
        {auditTrail.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No audit events recorded yet.
          </div>
        )}
      </CardContent>
    </Card>
  )
}