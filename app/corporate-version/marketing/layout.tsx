import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ExperienceProvider } from "@/src/providers/unified-theme-provider"

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
    <ExperienceProvider experience={EXPERIENCE_TYPES.CORPORATE}>
      {children}
    </ExperienceProvider>
  )
}