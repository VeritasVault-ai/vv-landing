"use client"

import { useCurrentVersion } from "@/hooks/use-current-version"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"
import type React from "react"

interface VersionAwareHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  standardClassName?: string
  corporateClassName?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export function VersionAwareHeading({
  standardClassName,
  corporateClassName,
  className,
  level = 2,
  children,
  ...props
}: VersionAwareHeadingProps) {
  const { isCorporate } = useCurrentVersion()

  const finalClassName = cn(className, isCorporate ? corporateClassName : standardClassName)

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag className={finalClassName} {...props}>
      {children}
    </HeadingTag>
  )
}
