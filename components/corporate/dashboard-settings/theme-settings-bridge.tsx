"use client"

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error.
 * It wraps the ThemeSettings component with a GlobalThemeProvider.
 * 
 * TODO: Once the theme provider hierarchy is properly refactored, this file should be deleted.
 */

import { GlobalThemeProvider } from "@/components/global-theme-provider"
import { ThemeSettings as OriginalThemeSettings } from "./theme-settings"
import { DashboardSettings } from "@/contexts/dashboard-context-improved"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

interface ThemeSettingsProps {
  settings: DashboardSettings
  onChange: (settings: Partial<DashboardSettings>) => void
}

/**
 * Wraps the original ThemeSettings component with a GlobalThemeProvider using the CORPORATE experience type.
 *
 * @param props - The settings and change handler to be passed to the original ThemeSettings component.
 *
 * @remark
 * This is a temporary bridge component to resolve theme context issues during migration. Remove once the theme provider hierarchy is refactored.
 */
export function ThemeSettings(props: ThemeSettingsProps) {
  return (
    <GlobalThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <OriginalThemeSettings {...props} />
    </GlobalThemeProvider>
  )
}