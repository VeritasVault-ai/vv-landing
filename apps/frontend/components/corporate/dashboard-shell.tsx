"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { useDashboard } from "@/contexts/dashboard-context"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { ReactNode, Suspense, useEffect, useState } from "react"

interface DashboardShellProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
  userInitials?: string
  themeVariant?: string
}

/**
 * Renders a centered spinner as a loading indicator for dashboard sections in suspense.
 */
function DashboardSectionLoading() {
  return (
    <div className="w-full p-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 dark:border-blue-400"></div>
    </div>
  )
}

/**
 * Provides a compact, responsive layout for a corporate dashboard, including a minimalist header, title bar, scrollable content area, and footer.
 *
 * Wraps dashboard content with navigation controls, simulation indicators, and refresh functionality. Children are displayed within error and suspense boundaries to handle loading and runtime errors gracefully.
 *
 * @param children - The main dashboard content to render.
 * @param title - The primary heading displayed in the title bar.
 * @param description - Optional subtitle shown below the title.
 * @param onRefresh - Optional async callback invoked when the refresh button is clicked.
 *
 * @remark
 * Suppresses specific console warnings related to ResponsiveContainer during the component's lifecycle.
 */
export function DashboardShell({ 
  children, 
  title, 
  description = "Portfolio overview and performance metrics",
  onRefresh
}: DashboardShellProps) {
  const { settings, refreshData, isLoading: contextLoading, performanceData, portfolioData, marketData } = useDashboard()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { isDark } = useRobustTheme()
  // Check if any data is simulated
  const hasSimulatedData = 
    (performanceData?.isSimulated || 
     portfolioData?.isSimulated || 
     marketData?.isSimulated) && 
    settings.showSimulationIndicators;

  // Suppress console warnings about ResponsiveContainer
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = function(...args) {
      if (args[0] && typeof args[0] === 'string' && 
          args[0].includes('maybe you don\'t need to use a ResponsiveContainer')) {
        return;
      }
      originalWarn.apply(console, args);
    };
    
    return () => {
      console.warn = originalWarn;
    };
  }, []);
  
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
    <div className="flex flex-col h-screen">

      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto">
        <main className="container mx-auto px-4 py-4">
          <ErrorBoundary>
            <Suspense fallback={<DashboardSectionLoading />}>
              <div className="flex flex-col space-y-6 pb-6">
                {children}
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Minimal footer */}
      <div className="bg-slate-900 dark:bg-slate-950 py-2 px-4 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <div className="text-xs text-slate-400">© 2025 VeritasVault.net</div>
          <div className="flex space-x-4">
            <a href="/terms" className="text-xs text-slate-400 hover:text-white">Terms</a>
            <a href="/privacy" className="text-xs text-slate-400 hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  )
}