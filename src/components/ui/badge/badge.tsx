"use client"

import { clsx } from "clsx"
import { forwardRef } from "react"
import styles from "./badge.module.css"
import type { BadgeProps } from "./badge.types"

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "medium",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          styles.badge,
          styles[variant],
          styles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"