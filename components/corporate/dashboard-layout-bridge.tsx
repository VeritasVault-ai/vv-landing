"use client"

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error.
 * It wraps the original DashboardLayout with a GlobalThemeProvider.
 * 
 * TODO: Once the dashboard layout is properly refactored, this file should be deleted.
 */

import { ReactNode } from "react"
import { DashboardLayout as OriginalDashboardLayout } from "./dashboard-layout"
import { GlobalThemeProvider } from "../global-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
  userInitials?: string
}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <GlobalThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <OriginalDashboardLayout {...props} />
    </GlobalThemeProvider>
  )
}