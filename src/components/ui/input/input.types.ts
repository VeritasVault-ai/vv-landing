import type { InputHTMLAttributes, ReactNode } from "react"

export type InputSize = "small" | "medium" | "large"
export type InputVariant = "default" | "filled" | "outlined" | "unstyled"

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize
  variant?: InputVariant
  fullWidth?: boolean
  error?: boolean
  disabled?: boolean
  readOnly?: boolean
  label?: string
  helperText?: string
  errorText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}