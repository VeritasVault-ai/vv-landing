"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { AboutHero } from "@/components/corporate/about/about-hero"
import { AboutMission } from "@/components/corporate/about/about-mission"
import { AboutTeam } from "@/components/corporate/about/about-team"
import { AboutTimeline } from "@/components/corporate/about/about-timeline"

/**
 * Client component for the About page
 */
export function AboutClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          <AboutHero />
          <AboutMission />
          <AboutTeam />
          <AboutTimeline />
        </main>
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}