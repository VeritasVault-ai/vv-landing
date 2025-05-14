"use client"

import { forwardRef } from "react"
import styles from "./progress.module.css"
import type { ProgressProps } from "./progress.types"
import { cn } from "@/lib/utils"

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "primary",
      size = "medium",
      showValue = false,
      valuePosition = "right",
      label,
      className,
      ...props
    },
    ref
  ) => {
    // Ensure value is between 0 and max
    const normalizedValue = Math.max(0, Math.min(value, max))
    const percentage = (normalizedValue / max) * 100
    
    return (
      <div className={cn(styles.progressContainer, className)}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.progressWrapper}>
          {showValue && valuePosition === "left" && (
            <div className={cn(styles.valueText, styles[`valuePosition-${valuePosition}`])}>
              {normalizedValue}%
            </div>
          )}
          
          <div 
            ref={ref}
            className={cn(styles.progressBar, styles[`variant-${variant}`], styles[`size-${size}`])} 
            {...props}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={normalizedValue}
              aria-valuemin={0}
              aria-valuemax={max}
            >
              {showValue && valuePosition === "inside" && (
                <div className={cn(styles.valueText, styles[`valuePosition-${valuePosition}`])}>
                  {normalizedValue}%
                </div>
              )}
            </div>
          </div>
          
          {showValue && valuePosition === "right" && (
            <div className={cn(styles.valueText, styles[`valuePosition-${valuePosition}`])}>
              {normalizedValue}%
            </div>
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"