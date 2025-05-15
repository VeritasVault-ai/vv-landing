"use client"

import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"

/**
 * Client component layout for all corporate version pages
 * Provides theme context for all child pages and includes header and footer
 * Uses the RobustThemeProvider to ensure theme context is always available
 */
export function CorporateLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="flex flex-col min-h-screen">
        <CorporateHeader />
        <main className="flex-grow">
          {children}
        </main>
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}