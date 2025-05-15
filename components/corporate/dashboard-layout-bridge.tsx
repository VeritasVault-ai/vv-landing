"use client"

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error
 * and the "useDashboard must be used within a DashboardProvider" error.
 * It wraps the original DashboardLayout with both GlobalThemeProvider and DashboardProvider.
 * 
 * TODO: Once the dashboard layout is properly refactored, this file should be deleted.
 */

import { ReactNode } from "react"
import { DashboardLayout as OriginalDashboardLayout } from "./dashboard-layout"
import { GlobalThemeProvider } from "../global-theme-provider"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { DashboardProvider } from "@/contexts/dashboard-context"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
  userInitials?: string
}

/**
 * Wraps the dashboard layout with global theme provider and dashboard provider
 * to ensure both theme and dashboard contexts are available.
 *
 * @param props - Props to be passed to the dashboard layout, including children, title, optional description, optional refresh callback, and optional user initials.
 *
 * @remark
 * This component is a temporary bridge to resolve context issues and should be removed after the dashboard layout is refactored.
 */
export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <GlobalThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <DashboardProvider>
        <OriginalDashboardLayout {...props} />
      </DashboardProvider>
    </GlobalThemeProvider>
  )
}