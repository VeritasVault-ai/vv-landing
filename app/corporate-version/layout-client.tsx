"use client"

import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Client component layout for all corporate version pages
 * Provides theme context for all child pages
 */
export function CorporateLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      {children}
    </ThemeProvider>
  )
}