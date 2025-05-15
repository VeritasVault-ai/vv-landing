"use client"

import { CorporateLandingPage } from "./corporate-landing-page"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"

/**
 * Client-only wrapper for CorporateLandingPage with RobustThemeProvider
 * This component will only be rendered on the client side
 */
export default function CorporateLandingPageClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <CorporateLandingPage />
    </RobustThemeProvider>
  )
}