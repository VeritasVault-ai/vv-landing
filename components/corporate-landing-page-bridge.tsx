"use client"

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error.
 * It wraps the CorporateLandingPage with a GlobalThemeProvider.
 * 
 * TODO: Once the corporate landing page is properly refactored, this file should be deleted.
 */

import { CorporateLandingPage as OriginalCorporateLandingPage } from "./corporate/corporate-landing-page"
import { GlobalThemeProvider } from "./global-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

export function CorporateLandingPage() {
  return (
    <GlobalThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <OriginalCorporateLandingPage />
    </GlobalThemeProvider>
  )
}