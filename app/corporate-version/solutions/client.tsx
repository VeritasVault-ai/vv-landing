"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { SolutionsHero } from "@/components/corporate/solutions/solutions-hero"
import { SolutionsOverview } from "@/components/corporate/solutions/solutions-overview"
import { SolutionsFeatures } from "@/components/corporate/solutions/solutions-features"
import { SolutionsCTA } from "@/components/corporate/solutions/solutions-cta"

/**
 * Client component for the Solutions page
 */
export function SolutionsClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          <SolutionsHero />
          <SolutionsOverview />
          <SolutionsFeatures />
          <SolutionsCTA />
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}