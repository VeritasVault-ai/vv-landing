"use client"

import { CorporateLandingPage } from "./corporate-landing-page"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Client-only wrapper for CorporateLandingPage with ThemeProvider
 * This component will only be rendered on the client side
 */
export default function CorporateLandingPageClient() {
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <CorporateLandingPage />
    </ThemeProvider>
  )
}