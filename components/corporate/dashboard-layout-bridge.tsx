"use client"

import { DashboardProvider } from "@/contexts/dashboard-context"
import { ReactNode } from "react"
import { DashboardLayout } from "./dashboard-layout"

interface DashboardLayoutBridgeProps {
  children: ReactNode
  title?: string
  description?: string
}

/**
 * Bridge component that wraps the DashboardLayout with the DashboardProvider
 * This ensures that dashboard context is available to all dashboard components
 */
export function DashboardLayoutBridge({
  children,
  title = "Dashboard",
  description
}: DashboardLayoutBridgeProps) {
  return (
    <DashboardProvider>
      <DashboardLayout
        title={title}
        description={description}
      >
        {children}
      </DashboardLayout>
    </DashboardProvider>
  )
}

/**
 * Re-export the DashboardLayout for backward compatibility
 */
export { DashboardLayout } from "./dashboard-layout"