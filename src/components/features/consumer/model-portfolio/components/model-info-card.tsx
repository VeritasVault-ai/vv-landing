"use client"
import { Clock, Hash, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "../model-portfolio-dashboard.module.css"

interface ModelInfoCardProps {
  createdAt: string
  lastUpdated: string
  riskProfile: string
  modelHash: string
}

export const ModelInfoCard = ({ createdAt, lastUpdated, riskProfile, modelHash }: ModelInfoCardProps) => {
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
    <Card className={styles.modelInfoCard}>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className={styles.infoTitle}>
              <Clock className="w-4 h-4 mr-1" /> Last Updated
            </div>
            <div className={styles.infoValue}>{formatDate(lastUpdated)}</div>
            <div className={styles.infoDescription}>Created on {formatDate(createdAt)}</div>
          </div>
          <div>
            <div className={styles.infoTitle}>
              <Shield className="w-4 h-4 mr-1" /> Risk Profile
            </div>
            <div className={styles.infoValue}>{riskProfile}</div>
            <div className={styles.infoDescription}>Based on your risk assessment</div>
          </div>
          <div className="md:col-span-2">
            <div className={styles.infoTitle}>
              <Hash className="w-4 h-4 mr-1" /> Model Hash
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={styles.hashValue}>{modelHash}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cryptographic hash of model parameters recorded on-chain</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className={styles.infoDescription}>
              Immutable record of model parameters stored on-chain
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}