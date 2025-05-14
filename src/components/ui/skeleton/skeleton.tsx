"use client"

import { forwardRef } from "react"
import styles from "./skeleton.module.css"
import type { SkeletonProps } from "./skeleton.types"
import { cn } from "@/lib/utils"

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      rounded = false,
      circle = false,
      animation = "pulse",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.skeleton,
          rounded && styles.rounded,
          circle && styles.circle,
          animation !== "none" && styles[animation],
          className
        )}
        style={{
          width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
          height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"