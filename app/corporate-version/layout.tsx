// app/corporate-version/dashboard/layout.tsx
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { ReactNode } from "react"

export default function CorporateVersionDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Simply replace the old ThemeProvider with UnifiedThemeProvider
  return (
    <UnifiedThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      {children}
    </UnifiedThemeProvider>
  )
}