import type { InputHTMLAttributes } from "react"

export type SwitchVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info"
export type SwitchSize = "small" | "medium" | "large"
export type LabelPosition = "left" | "right"

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Optional label for the switch
   */
  label?: string
  /**
   * Position of the label relative to the switch
   */
  labelPosition?: LabelPosition
  /**
   * Visual style variant
   */
  variant?: SwitchVariant
  /**
   * Size of the switch
   */
  size?: SwitchSize
}