import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import type { ReactNode } from "react"

/**
 * Wraps child components with a unified theme provider configured for the corporate experience.
 *
 * @param children - The content to be rendered within the corporate dashboard layout.
 */
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