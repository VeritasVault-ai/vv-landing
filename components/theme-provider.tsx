"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { EnhancedDarkThemeProvider } from "./enhanced-dark-theme-provider"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <EnhancedDarkThemeProvider>{children}</EnhancedDarkThemeProvider>
    </NextThemesProvider>
  )
}
