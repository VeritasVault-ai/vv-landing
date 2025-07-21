import type React from "react"
import { cn } from "@/lib/utils"

type SectionTheme = "dashboard" | "analytics" | "strategy" | "documentation"

interface ThemedSectionProps {
  theme: SectionTheme
  className?: string
  children: React.ReactNode
}

export function ThemedSection({ theme, className, children }: ThemedSectionProps) {
  // Define theme-specific styles
  const themeStyles = {
    dashboard: "bg-gradient-dashboard-dark",
    analytics: "bg-gradient-primary-dark",
    strategy: "bg-gradient-strategy-dark",
    documentation: "bg-gradient-docs-dark",
  }

  return (
    <section className={cn("py-12", themeStyles[theme], className)} data-theme={theme}>
      {children}
    </section>
  )
}
