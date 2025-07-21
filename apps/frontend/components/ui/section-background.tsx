import type React from "react"
import { cn } from "@/lib/utils"

interface SectionBackgroundProps {
  variant: "primary" | "secondary" | "dashboard" | "strategy" | "docs"
  className?: string
  children: React.ReactNode
}

export function SectionBackground({ variant, className, children }: SectionBackgroundProps) {
  // Get the appropriate gradient based on the theme and variant
  const gradientStyle = {
    backgroundImage: `var(--gradient-${variant}-dark)`,
  }

  return (
    <section className={cn("relative py-12", className)} style={gradientStyle}>
      {children}
    </section>
  )
}
