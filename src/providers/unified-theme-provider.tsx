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

import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { useCurrentExperience } from "@/src/hooks/use-current-experience"
import { ThemeProvider as CustomThemeProvider } from "@/src/lib/context/ThemeProvider"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"

interface UnifiedThemeProviderProps {
  children: ReactNode
  defaultExperience?: string
}

/**
 * Provides a unified theme context to the application using both custom and system-based theming.
 *
 * Wraps its children with both the `next-themes` provider and a custom theme provider, selecting the theme experience based on the current route or an optional default.
 *
 * @param children - The components to receive the theme context.
 * @param defaultExperience - Optional default theme experience to use if no route-based experience is available.
 */
export function UnifiedThemeProvider({ 
  children, 
  defaultExperience = EXPERIENCE_TYPES.STANDARD
}: UnifiedThemeProviderProps) {
  // Use the current experience based on route if no default is provided
  const routeBasedExperience = useCurrentExperience()
  const experienceToUse = routeBasedExperience || defaultExperience
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CustomThemeProvider defaultExperience={experienceToUse}>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}

/**
 * Provides a fixed theme experience to its child components.
 *
 * Wraps children with {@link CustomThemeProvider} using the specified experience as the default.
 *
 * @param experience - The experience identifier to apply as the default theme.
 */
export function ExperienceProvider({ 
  children, 
  experience 
}: { 
  children: ReactNode, 
  experience: string 
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CustomThemeProvider defaultExperience={experience}>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}