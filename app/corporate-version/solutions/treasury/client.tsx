"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { TreasuryHero } from "./components/treasury-hero"
import { TreasuryFeatures } from "./components/treasury-features"
import { TreasuryDashboard } from "./components/treasury-dashboard"
import { TreasuryCaseStudy } from "./components/treasury-case-study"
import { TreasuryCTA } from "./components/treasury-cta"
import { ComingSoonBanner } from "@/components/corporate/coming-soon-banner"

/**
 * Client component for the Treasury Management solution page
 */
export function TreasurySolutionClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <ComingSoonBanner />
        
        <main className="flex-grow">
          <TreasuryHero />
          <TreasuryFeatures />
          <TreasuryDashboard />
          <TreasuryCaseStudy />
          <TreasuryCTA />
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}