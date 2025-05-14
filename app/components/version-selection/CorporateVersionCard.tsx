"use client"

import { Card } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import styles from "./VersionCard.module.css"
import { VersionCardFeatureList } from "./VersionCardFeatureList"
import { VersionCardFooter } from "./VersionCardFooter"
import { VersionCardHeader } from "./VersionCardHeader"

interface CorporateVersionCardProps {
  isSelected: boolean
  onSelect: () => void
  onContinue: () => void
}

/**
 * Renders a card presenting the Corporate version option with institutional features and selection controls.
 *
 * Displays a header, a list of corporate-level features, and a footer with a continue button. The card's appearance and selection state are determined by the {@link isSelected} prop.
 *
 * @param isSelected - Whether the card is currently selected.
 * @param onSelect - Callback invoked when the card is clicked.
 * @param onContinue - Callback invoked when the continue button is pressed.
 */
export function CorporateVersionCard({ isSelected, onSelect, onContinue }: CorporateVersionCardProps) {
  const corporateFeatures = [
    "Institutional-grade security",
    "Advanced portfolio optimization",
    "Compliance and audit features",
    "Enterprise API access"
  ]

  return (
    <Card
      className={`${styles.versionCard} ${styles.corporateCard} ${
        isSelected ? styles.corporateCardSelected : styles.corporateCardUnselected
      }`}
      onClick={onSelect}
    >
      <div className={styles.cardContent}>
        <VersionCardHeader
          icon={Building2}
          title="Corporate Experience"
          description="Designed for institutional investors and teams with advanced features and comprehensive reporting tools"
          iconColor="text-purple-400"
          iconBgColor="bg-purple-500/20"
        />
        
        <VersionCardFeatureList 
          features={corporateFeatures}
          checkColor="text-purple-500"
        />
        
        <VersionCardFooter
          onContinue={onContinue}
          buttonText="Select Corporate Version"
          buttonClassName="bg-purple-600 hover:bg-purple-700"
        />
      </div>
    </Card>
  )
}