"use client"

/**
 * Unified Theme Hook
 * 
 * This hook combines functionality from both our custom theme system and next-themes,
 * providing a single interface for accessing all theme-related functionality.
 * 
 * Usage:
 * ```tsx
 * const { isDark, themeVariant, setTheme } = useUnifiedTheme();
 * ```
 */

import { useTheme as useNextTheme } from "next-themes"
import { useTheme as useCustomTheme } from "@/src/lib/context/ThemeProvider"

export function useUnifiedTheme() {
  const nextTheme = useNextTheme()
  const customTheme = useCustomTheme()
  
  return {
    // Next-themes properties
    theme: nextTheme.theme,
    setTheme: nextTheme.setTheme,
    systemTheme: nextTheme.systemTheme,
    
    // Custom theme properties
    themeVariant: customTheme.themeVariant,
    setThemeVariant: customTheme.setThemeVariant,
    availableThemeVariants: customTheme.availableThemeVariants,
    
    // Computed properties
    isDark: nextTheme.theme === "dark" || 
            (nextTheme.theme === "system" && nextTheme.systemTheme === "dark"),
  }
}