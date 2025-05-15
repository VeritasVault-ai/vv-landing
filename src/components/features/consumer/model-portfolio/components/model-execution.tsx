"use client"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import styles from "../model-portfolio-dashboard.module.css"

interface ExecutionRecord {
  id: string
  timestamp: string
  status: string
  transactionHash: string
  gasUsed: number
  blockNumber: number
}

interface ModelExecutionProps {
  executionHistory: ExecutionRecord[]
}

export const ModelExecution = ({ executionHistory }: ModelExecutionProps) => {
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

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.completed
      case "pending":
        return styles.pending
      case "failed":
        return styles.failed
      default:
        return ""
    }
  }

  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <Card className={styles.executionCard}>
      <CardHeader>
        <CardTitle>Execution History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.executionList}>
          {executionHistory.map((execution) => (
            <div key={execution.id} className={styles.executionItem}>
              <div className={styles.executionHeader}>
                <div className={styles.executionTitle}>
                  Execution at {formatDate(execution.timestamp)}
                </div>
                <div className={`${styles.executionStatus} ${getStatusClass(execution.status)}`}>
                  {execution.status}
                </div>
              </div>
              <div className={styles.executionDetails}>
                <div className={styles.executionDetail}>
                  <span className={styles.detailLabel}>Transaction Hash:</span>
                  <span className={styles.hashValue}>{shortenHash(execution.transactionHash)}</span>
                </div>
                <div className={styles.executionDetail}>
                  <span className={styles.detailLabel}>Block Number:</span>
                  <span className={styles.detailValue}>{execution.blockNumber}</span>
                </div>
                <div className={styles.executionDetail}>
                  <span className={styles.detailLabel}>Gas Used:</span>
                  <span className={styles.detailValue}>{execution.gasUsed.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View on Explorer <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}