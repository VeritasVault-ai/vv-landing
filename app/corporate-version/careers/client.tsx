"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { CareersHero } from "@/components/corporate/careers/careers-hero"
import { CareersValues } from "@/components/corporate/careers/careers-values"
import { CareersOpenings } from "@/components/corporate/careers/careers-openings"
import { CareersBenefits } from "@/components/corporate/careers/careers-benefits"

/**
 * Client component for the Careers page
 */
export function CareersClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          <CareersHero />
          <CareersValues />
          <CareersBenefits />
          <CareersOpenings />
        </main>
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}