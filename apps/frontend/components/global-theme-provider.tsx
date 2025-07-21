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

/**
 * Provides a custom theme context to its child components.
 *
 * Wraps children with {@link CustomThemeProvider}, optionally setting a default theme experience.
 *
 * @param children - React elements to receive the theme context.
 * @param defaultExperience - Optional theme experience identifier; defaults to {@link EXPERIENCE_TYPES.STANDARD}.
 *
 * @returns Themed React elements wrapped in a custom theme provider.
 *
 * @remark Does not include the `next-themes` ThemeProvider, as it is assumed to be provided at the root layout.
 */
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