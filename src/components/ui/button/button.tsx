"use client"

import { clsx } from "clsx"
import { forwardRef } from "react"
import styles from "./button.module.css"
import type { ButtonProps } from "./button.types"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      fullWidth = false,
      disabled = false,
      isLoading = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
      className
    )

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"