import type { HTMLAttributes, ReactNode } from "react"

export type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"
export type BadgeSize = "small" | "medium" | "large"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}