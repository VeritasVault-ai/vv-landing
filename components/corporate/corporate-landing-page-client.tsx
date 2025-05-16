"use client"

import { CorporateLandingPage } from "./corporate-landing-page"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

/**
 * Client-only wrapper for CorporateLandingPage with RobustThemeProvider
 * This component will only be rendered on the client side
 * It applies theme settings from URL parameters or stored preferences
 */
export default function CorporateLandingPageClient() {
  const searchParams = useSearchParams()
  const themeParam = searchParams.get('theme')
  
  // Parse theme parameter if present
  let defaultVariant = CORPORATE_VARIANTS.CORPORATE
  let defaultColorMode = COLOR_MODES.LIGHT
  
  if (themeParam) {
    const [variant, colorMode] = themeParam.split('-')
    if (variant && Object.values(CORPORATE_VARIANTS).includes(variant as any)) {
      defaultVariant = variant as any
    }
    if (colorMode && Object.values(COLOR_MODES).includes(colorMode as any)) {
      defaultColorMode = colorMode as any
    }
  }
  
  // Apply dark mode class directly to document if needed
  useEffect(() => {
    if (defaultColorMode === COLOR_MODES.DARK) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [defaultColorMode])
  
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={defaultVariant}
      defaultColorMode={defaultColorMode}
    >
      <CorporateLandingPage />
    </RobustThemeProvider>
  )
}