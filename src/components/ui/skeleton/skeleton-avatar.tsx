"use client"

import { forwardRef } from "react"
import styles from "./skeleton.module.css"
import type { SkeletonAvatarProps } from "./skeleton.types"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  (
    {
      size = "medium",
      animation = "pulse",
      className,
      ...props
    },
    ref
  ) => {
    const sizeInPx = typeof size === "number" ? size : undefined
    const sizeClass = typeof size === "string" ? styles[`avatar-${size}`] : undefined
    
    return (
      <Skeleton
        ref={ref}
        circle
        animation={animation}
        className={cn(sizeClass, className)}
        width={sizeInPx}
        height={sizeInPx}
        {...props}
      />
    )
  }
)

SkeletonAvatar.displayName = "SkeletonAvatar"