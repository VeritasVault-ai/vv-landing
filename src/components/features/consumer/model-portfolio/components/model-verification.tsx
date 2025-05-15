"use client"
import { CheckCircle, Clock, ExternalLink, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import styles from "../model-portfolio-dashboard.module.css"

interface VerificationData {
  modelVerified: boolean
  lastVerifiedAt: string
  verificationHash: string
  verificationMethod: string
}

interface ModelVerificationProps {
  verificationData: VerificationData
}

export const ModelVerification = ({ verificationData }: ModelVerificationProps) => {
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

  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.verificationSection}>
          <div className={styles.verificationItem}>
            <div className={styles.verificationHeader}>
              <div className={styles.verificationTitle}>
                <CheckCircle className={styles.verificationIcon} color={verificationData.modelVerified ? "green" : "gray"} />
                Verification Status
              </div>
              <div>
                {verificationData.modelVerified ? (
                  <span className="text-green-600 font-medium">Verified</span>
                ) : (
                  <span className="text-amber-600 font-medium">Pending Verification</span>
                )}
              </div>
            </div>
            <div className={styles.verificationContent}>
              <p>
                {verificationData.modelVerified
                  ? "This model has been cryptographically verified and recorded on-chain."
                  : "This model is awaiting verification. Check back soon."}
              </p>
            </div>
          </div>

          <div className={styles.verificationItem}>
            <div className={styles.verificationHeader}>
              <div className={styles.verificationTitle}>
                <Clock className={styles.verificationIcon} />
                Last Verification
              </div>
            </div>
            <div className={styles.verificationContent}>
              <p>
                {verificationData.modelVerified
                  ? `Last verified on ${formatDate(verificationData.lastVerifiedAt)}`
                  : "Not yet verified"}
              </p>
            </div>
          </div>

          <div className={styles.verificationItem}>
            <div className={styles.verificationHeader}>
              <div className={styles.verificationTitle}>
                <Shield className={styles.verificationIcon} />
                Verification Method
              </div>
            </div>
            <div className={styles.verificationContent}>
              <p>{verificationData.verificationMethod}</p>
              <p className="mt-2 text-sm">
                Hash: <span className={styles.hashValue}>{shortenHash(verificationData.verificationHash)}</span>
              </p>
            </div>
            <div className={styles.verificationFooter}>
              <Button variant="outline" size="sm">
                View Proof <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}