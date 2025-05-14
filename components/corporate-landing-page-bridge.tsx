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

/**
 * Renders the corporate landing page wrapped in a global theme provider with the corporate experience.
 *
 * @remark
 * This is a temporary bridge component to resolve theme context issues during migration. Remove once the corporate landing page is refactored.
 */
export function CorporateLandingPage() {
  return (
    <GlobalThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <OriginalCorporateLandingPage />
    </GlobalThemeProvider>
  )
}