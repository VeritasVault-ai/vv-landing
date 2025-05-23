"use client"

import { Card } from "@/components/ui/card"
import { User } from "lucide-react"
import styles from "./VersionCard.module.css"
import { VersionCardFeatureList } from "./VersionCardFeatureList"
import { VersionCardFooter } from "./VersionCardFooter"
import { VersionCardHeader } from "./VersionCardHeader"

interface StandardVersionCardProps {
  isSelected: boolean
  onSelect: () => void
  onContinue: () => void
}

/**
 * Renders a selectable card presenting the "Standard Experience" version with its features and a continue action.
 *
 * Displays a header with an icon and description, a list of standard features, and a button to proceed with this version.
 *
 * @param isSelected - Indicates whether the card is currently selected.
 * @param onSelect - Callback invoked when the card is clicked.
 * @param onContinue - Callback invoked when the continue button is clicked.
 */
export function StandardVersionCard({ isSelected, onSelect, onContinue }: StandardVersionCardProps) {
  const standardFeatures = [
    "Personalized dashboard",
    "AI-powered strategy recommendations",
    "Real-time analytics",
    "Multi-chain support"
  ]

  return (
    <Card
      className={`${styles.versionCard} ${styles.standardCard} ${
        isSelected ? styles.standardCardSelected : styles.standardCardUnselected
      }`}
      onClick={onSelect}
    >
      <div className={styles.cardContent}>
        <VersionCardHeader
          icon={User}
          title="Standard Experience"
          description="Perfect for individual traders and DeFi enthusiasts looking for a streamlined interface with powerful AI insights"
          iconColor="text-blue-400"
          iconBgColor="bg-blue-500/20"
        />
        
        <VersionCardFeatureList 
          features={standardFeatures}
          checkColor="text-blue-500"
        />
        
        <VersionCardFooter
          onContinue={onContinue}
          buttonText="Select Standard Version"
          buttonClassName="bg-blue-600 hover:bg-blue-700"
        />
      </div>
    </Card>
  )
}