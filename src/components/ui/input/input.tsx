"use client"

import { forwardRef } from "react"
import styles from "./input.module.css"
import type { InputProps } from "./input.types"
import { cn } from "@/lib/utils"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      size = "medium",
      variant = "default",
      fullWidth = false,
      error = false,
      disabled = false,
      readOnly = false,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`
    
    return (
      <div className={cn(styles.inputContainer, fullWidth && styles.fullWidth, className)}>
        {label && (
          <label htmlFor={inputId} className={cn(styles.label, disabled && styles.disabled)}>
            {label}
          </label>
        )}
        <div
          className={cn(
            styles.inputWrapper,
            styles[`size-${size}`],
            styles[`variant-${variant}`],
            error && styles.error,
            disabled && styles.disabled,
            readOnly && styles.readOnly,
            leftIcon && styles.hasLeftIcon,
            rightIcon && styles.hasRightIcon,
          )}
        >
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            className={styles.input}
            {...props}
          />
          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>
        {(helperText || errorText) && (
          <div className={cn(styles.helperText, error && styles.errorText)}>{error ? errorText : helperText}</div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"