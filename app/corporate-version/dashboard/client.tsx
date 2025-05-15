"use client"

import { useState, useEffect } from "react"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

/**
 * Client component for the dashboard page
 */
export function DashboardClient() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <RobustThemeProvider
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.VERITASVAULT}
      defaultColorMode={COLOR_MODES.DARK}
    >
      <DashboardLayout>
        <DashboardOverview isLoading={isLoading} />
      </DashboardLayout>
    </RobustThemeProvider>
  )
}