"use client"

import { Button } from "@/components/ui/button"
import styles from "./VersionCard.module.css"

interface VersionCardFooterProps {
  onContinue: () => void
  buttonText: string
  buttonClassName?: string
}

/**
 * Renders a footer section with a full-width button for version selection cards.
 *
 * @param onContinue - Callback invoked when the button is clicked.
 * @param buttonText - Text displayed on the button.
 * @param buttonClassName - Optional additional CSS classes for the button; defaults to a blue background with hover effect.
 */
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