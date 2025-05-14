"use client"

/**
 * Unified Theme Provider
 * 
 * This component combines both our custom theme system and next-themes to provide
 * a unified theming solution across the application.
 * 
 * It should be placed at the root of the application to ensure all components
 * have access to theme context.
 */

import { ReactNode, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProvider as CustomThemeProvider } from "@/src/lib/context/ThemeProvider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { useCurrentExperience } from "@/src/hooks/use-current-experience"

interface UnifiedThemeProviderProps {
  children: ReactNode
  defaultExperience?: string
}

/**
 * Root-level component that provides theme context to the entire application
 */
export function UnifiedThemeProvider({ 
  children, 
  defaultExperience
}: UnifiedThemeProviderProps) {
  // Use the current experience based on route if no default is provided
  const routeBasedExperience = useCurrentExperience()
  const experienceToUse = defaultExperience || routeBasedExperience
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CustomThemeProvider defaultExperience={experienceToUse}>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}

/**
 * Simplified provider for use in specific sections that need a fixed experience
 */
export function ExperienceProvider({ 
  children, 
  experience 
}: { 
  children: ReactNode, 
  experience: string 
}) {
  return (
    <CustomThemeProvider defaultExperience={experience}>
      {children}
    </CustomThemeProvider>
  )
}