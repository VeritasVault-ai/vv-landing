import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import type { ReactNode } from "react"

export default function CorporateVersionDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <UnifiedThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      {children}
    </UnifiedThemeProvider>
  )
}