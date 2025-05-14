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
import { useTheme } from "@/src/context/ThemeProvider" // Updated import path
import { ColorMode, ThemeVariant, ExperienceType } from "@/src/types/theme"
import { getAvailableVariants } from "@/src/utils/theme-utils"

// Define the return type from next-themes' useTheme hook
interface NextThemeValues {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  systemTheme?: string | undefined;
  resolvedTheme?: string | undefined;
  themes: string[];
}

// Define the return type from our custom useTheme hook
interface CustomThemeValues {
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
  availableThemeVariants: ThemeVariant[];
  experience: ExperienceType;
  colorMode: ColorMode;
}

/**
 * Provides a unified interface for accessing and managing theme state by combining values from both the `next-themes` library and a custom theme context.
 *
 * Returns theme-related properties and setters from both sources, including the current theme, theme variant, available themes, experience type, color mode, and a computed `isDark` flag.
 *
 * @returns An object containing consolidated theme state and setters from both `next-themes` and the custom theme context, along with a boolean indicating if the current theme is dark.
 *
 * @remark If either the `next-themes` or custom theme provider is missing, fallback default values are used and a warning is logged.
 */
export function useUnifiedTheme() {
  // Default values in case hooks fail
  let nextThemeValues: NextThemeValues = {
    theme: 'light',
    setTheme: (theme: string) => {},
    systemTheme: 'light',
    resolvedTheme: 'light',
    themes: ['light', 'dark']
  }
  
  let customThemeValues: CustomThemeValues = {
    themeVariant: 'standard' as ThemeVariant,
    setThemeVariant: (variant: ThemeVariant) => {},
    availableThemeVariants: [] as ThemeVariant[],
    experience: 'standard' as ExperienceType,
    colorMode: 'light' as ColorMode,
  }
  
  // Try to get next-themes values, but don't fail if provider is missing
  try {
    const nextThemes = useNextTheme();
    nextThemeValues = {
      theme: nextThemes.theme || 'light',
      setTheme: nextThemes.setTheme,
      systemTheme: nextThemes.systemTheme || 'light',
      resolvedTheme: nextThemes.resolvedTheme || 'light',
      themes: nextThemes.themes || ['light', 'dark']
    };
  } catch (error) {
    console.warn("next-themes provider not available:", error)
  }
  
  // Try to get custom theme values, but don't fail if provider is missing
  try {
    const themeContext = useTheme();
    if (themeContext) {
      customThemeValues = {
        themeVariant: themeContext.themeVariant || 'standard' as ThemeVariant,
        setThemeVariant: themeContext.setThemeVariant || ((variant: ThemeVariant) => {}),
        availableThemeVariants: themeContext.experience ? 
          getAvailableVariants(themeContext.experience) : 
          ['standard', 'corporate'] as ThemeVariant[],
        experience: themeContext.experience || 'standard' as ExperienceType,
        colorMode: themeContext.colorMode || 'light' as ColorMode,
      };
    }
  } catch (error) {
    console.warn("custom theme provider not available:", error)
  }
  
  return {
    // Next-themes properties
    theme: nextThemeValues.theme,
    setTheme: nextThemeValues.setTheme,
    systemTheme: nextThemeValues.systemTheme,
    resolvedTheme: nextThemeValues.resolvedTheme,
    themes: nextThemeValues.themes,
    
    // Custom theme properties
    themeVariant: customThemeValues.themeVariant,
    setThemeVariant: customThemeValues.setThemeVariant,
    availableThemeVariants: customThemeValues.availableThemeVariants,
    experience: customThemeValues.experience,
    colorMode: customThemeValues.colorMode,
    
    // Computed properties
    isDark: nextThemeValues.theme === "dark" || 
            (nextThemeValues.theme === "system" && nextThemeValues.systemTheme === "dark") ||
            nextThemeValues.resolvedTheme === "dark" ||
            customThemeValues.colorMode === "dark",
  }
}