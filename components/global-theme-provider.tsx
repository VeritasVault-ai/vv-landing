"use client"

/**
 * Global Theme Provider
 * 
 * This component provides our custom theme context for the application.
 * It does NOT include the next-themes ThemeProvider since that's already
 * provided at the root layout level.
 */

import { ThemeProvider as CustomThemeProvider } from "@/lib/context/ThemeProvider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ReactNode } from "react"

interface GlobalThemeProviderProps {
  children: ReactNode
  defaultExperience?: string
}

export function GlobalThemeProvider({
  children,
  defaultExperience = EXPERIENCE_TYPES.STANDARD
}: GlobalThemeProviderProps) {
  return (
    <CustomThemeProvider defaultExperience={defaultExperience}>
      {children}
    </CustomThemeProvider>
  )
}