import type { HTMLAttributes } from "react"

export type ProgressVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info"
export type ProgressSize = "small" | "medium" | "large"
export type ValuePosition = "left" | "right" | "inside"

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress value
   */
  value?: number
  /**
   * Maximum value (100% progress)
   */
  max?: number
  /**
   * Visual style variant
   */
  variant?: ProgressVariant
  /**
   * Size of the progress bar
   */
  size?: ProgressSize
  /**
   * Whether to show the value as text
   */
  showValue?: boolean
  /**
   * Position of the value text
   */
  valuePosition?: ValuePosition
  /**
   * Optional label for the progress bar
   */
  label?: string
  /**
   * Additional CSS class names
   */
  className?: string
}