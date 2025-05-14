// app/corporate-version/dashboard/layout.tsx
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { ReactNode } from "react"

/**
 * Wraps dashboard content in a corporate-themed context provider.
 *
 * @param children - The content to display within the corporate dashboard layout.
 * @returns The provided {@link children} wrapped in a {@link UnifiedThemeProvider} configured for the corporate experience.
 */
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