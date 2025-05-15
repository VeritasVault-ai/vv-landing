"use client"

import { CorporateLandingPage } from "@/components/corporate/corporate-landing-page"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Wraps the CorporateLandingPage with appropriate theme context
 */
export function CorporateLandingPageWithTheme() {
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <CorporateLandingPage />
    </ThemeProvider>
  )
}