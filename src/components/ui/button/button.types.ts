import type { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
export type ButtonSize = "small" | "medium" | "large"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  isLoading?: boolean
}