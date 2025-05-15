import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"

/**
 * Layout for corporate marketing pages
 * Ensures the correct theme experience is applied
 */
export default function CorporateMarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <UnifiedThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
        {children}
      </UnifiedThemeProvider>
  )
}