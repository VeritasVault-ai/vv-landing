import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { applyGradientOverlay } from "@/lib/color-system"

interface GradientCardProps {
  variant?: "primary" | "secondary" | "dashboard" | "strategy" | "docs"
  overlayOpacity?: number
  className?: string
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function GradientCard({
  variant = "primary",
  overlayOpacity = 0.03,
  className,
  children,
  header,
  footer,
}: GradientCardProps) {
  // Get the appropriate gradient based on the theme and variant
  const gradientStyle = {
    backgroundImage: `var(--gradient-${variant}-dark)`,
  }

  // Apply a subtle gradient overlay
  const overlayStyle = {
    backgroundImage: applyGradientOverlay("#FFFFFF", overlayOpacity),
  }

  return (
    <Card
      className={cn("overflow-hidden border border-gray-800 dark:border-gray-700", className)}
      style={gradientStyle}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent className="relative">
        <div className="absolute inset-0" style={overlayStyle}></div>
        <div className="relative z-10">{children}</div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
