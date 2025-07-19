import type React from "react"
import { EnhancedNavigation } from "./enhanced-navigation"

export function EnhancedDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg-3))]">
      <EnhancedNavigation />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
