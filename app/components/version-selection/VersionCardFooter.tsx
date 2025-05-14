"use client"

import { Button } from "@/components/ui/button"
import styles from "./VersionCard.module.css"

interface VersionCardFooterProps {
  onContinue: () => void
  buttonText: string
  buttonClassName?: string
}

export function VersionCardFooter({
  onContinue,
  buttonText,
  buttonClassName = "bg-blue-600 hover:bg-blue-700"
}: VersionCardFooterProps) {
  return (
    <div className={styles.footerWrapper}>
      <Button
        className={`w-full ${buttonClassName}`}
        onClick={(e) => {
          e.stopPropagation();
          onContinue();
        }}
      >
        {buttonText}
      </Button>
    </div>
  )
}