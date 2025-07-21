import React from "react"
import { cn } from "@/lib/utils"
import styles from "@/styles/standard-button.module.css"

interface StandardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success" | "warning" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const StandardButton = React.forwardRef<HTMLButtonElement, StandardButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          {
            [styles.sm]: size === "sm",
            [styles.lg]: size === "lg",
            [styles.icon]: size === "icon",
            [styles.loading]: isLoading,
            [styles.withIcon]: leftIcon || rightIcon,
          },
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        {!isLoading && children}
        {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </button>
    )
  },
)

StandardButton.displayName = "StandardButton"
