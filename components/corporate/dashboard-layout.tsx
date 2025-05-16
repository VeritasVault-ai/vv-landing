"use client"

import { Button } from "@/components/ui/button"
import { useDashboard } from "@/contexts/dashboard-context"
import { Download, RefreshCw } from "lucide-react"
import { ReactNode, useState, Suspense } from "react"
import { DashboardSettings } from "./dashboard-settings"
import { CorporateHeader } from "./corporate-header"
import { CorporateFooter } from "./corporate-footer"
import { SimulationIndicator } from "./simulation-indicator"
import { ErrorBoundary } from "@/components/error-boundary"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
  userInitials?: string
  themeVariant?: string
}

/**
 * Loading fallback component for suspense boundaries
 */
function DashboardSectionLoading() {
  return (
    <div className="w-full p-8 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 dark:border-blue-400"></div>
    </div>
  )
}

/**
 * Provides a responsive layout wrapper for a corporate dashboard, using the corporate header and footer.
 *
 * Renders a main section with title, description, and action buttons (refresh, export, settings).
 * The refresh button triggers either a provided refresh callback or a context-based refresh,
 * with built-in loading state management.
 *
 * @param children - Content to display within the dashboard layout.
 * @param title - Main heading for the dashboard section.
 * @param description - Optional subtitle or description under the title.
 * @param onRefresh - Optional async callback for refreshing dashboard data.
 */
export function DashboardLayout({ 
  children, 
  title, 
  description = "Portfolio overview and performance metrics",
  onRefresh
}: DashboardLayoutProps) {
  const { settings, refreshData, isLoading: contextLoading, performanceData, portfolioData, marketData } = useDashboard()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { isDark } = useRobustTheme()

  // Check if any data is simulated
  const hasSimulatedData = 
    (performanceData?.isSimulated || 
     portfolioData?.isSimulated || 
     marketData?.isSimulated) && 
    settings.showSimulationIndicators;

  const handleRefresh = async () => {
    if (isRefreshing || contextLoading) return
    try {
      setIsRefreshing(true)
      if (onRefresh) {
        await onRefresh()
      } else {
        await refreshData()
      }
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* We're using the existing CorporateHeader component */}
      <CorporateHeader isLoggedIn={true} />

      <main className={`container mx-auto px-4 py-8 flex-grow ${settings?.compactView ? 'space-y-4' : 'space-y-6'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4 md:mt-0">
            {/* Show simulation indicator if there's simulated data */}
            {hasSimulatedData && (
              <SimulationIndicator showLabel />
            )}
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleRefresh}
                disabled={isRefreshing || contextLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing || contextLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <DashboardSettings />
            </div>
          </div>
        </div>

        {/* Wrap children in ErrorBoundary and Suspense for better error handling and loading states */}
        <ErrorBoundary>
          <Suspense fallback={<DashboardSectionLoading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* We're using the existing CorporateFooter component */}
      <CorporateFooter />
    </div>
  )
}