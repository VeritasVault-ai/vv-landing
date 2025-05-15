"use client"

import dynamic from "next/dynamic"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from "@/src/context/ThemeProvider"

// Dynamically import CorporateLandingPage with no SSR
const CorporateLandingPage = dynamic(
  () => import("@/components/corporate/corporate-landing-page").then(mod => ({ default: mod.CorporateLandingPage })),
  { ssr: false }
)

/**
 * Wraps the CorporateLandingPage with appropriate theme context
 * Uses dynamic import with ssr: false to prevent server-side rendering issues
 */
export function CorporateLandingPageWithTheme() {
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <CorporateLandingPage />
    </ThemeProvider>
  )
}