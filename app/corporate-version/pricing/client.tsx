-white"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { PricingHero } from "@/components/corporate/pricing/pricing-hero"
import { PricingTiers } from "@/components/corporate/pricing/pricing-tiers"
import { PricingFAQ } from "@/components/corporate/pricing/pricing-faq"
import { PricingCTA } from "@/components/corporate/pricing/pricing-cta"

/**
 * Client component for the Pricing page
 */
export function PricingClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          <PricingHero />
          <PricingTiers />
          <PricingFAQ />
          <PricingCTA />
        </main>
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}