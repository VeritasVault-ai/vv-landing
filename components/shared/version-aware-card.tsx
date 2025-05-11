"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentVersion } from "@/hooks/use-current-version"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface VersionAwareCardProps extends HTMLAttributes<HTMLDivElement> {
  standardClassName?: string
  corporateClassName?: string
  children: React.ReactNode
}

export function VersionAwareCard({
  standardClassName,
  corporateClassName,
  className,
  children,
  ...props
}: VersionAwareCardProps) {
  const { isCorporate } = useCurrentVersion()

  const finalClassName = cn(className, isCorporate ? corporateClassName : standardClassName)

  return (
    <Card className={finalClassName} {...props}>
      {children}
    </Card>
  )
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
