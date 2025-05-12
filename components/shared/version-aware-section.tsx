"use client"

import type React from "react"

import { useCurrentVersion } from "@/hooks/use-current-version"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface VersionAwareSectionProps extends HTMLAttributes<HTMLElement> {
  standardClassName?: string
  corporateClassName?: string
  children: React.ReactNode
}

export function VersionAwareSection({
  standardClassName,
  corporateClassName,
  className,
  children,
  ...props
}: VersionAwareSectionProps) {
  const { isCorporate } = useCurrentVersion()

  const finalClassName = cn(
    "py-12 px-4 md:px-6 lg:px-8",
    className,
    isCorporate ? corporateClassName : standardClassName,
  )

  return (
    <section className={finalClassName} {...props}>
      {children}
    </section>
  )
}
