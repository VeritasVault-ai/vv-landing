"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { useDashboard } from "@/contexts/dashboard-context"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { Download, RefreshCw } from "lucide-react"
import { ReactNode, Suspense, useEffect, useRef, useState } from "react"
import { CorporateFooter } from "./corporate-footer"
import { CorporateHeader } from "./corporate-header"
import { DashboardSettings } from "./dashboard-settings"
import { SimulationIndicator } from "./simulation-indicator"

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
    <div className="w-full p-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 dark:border-blue-400"></div>
    </div>
  )
}

/**
 * Provides a compact, responsive layout wrapper for a corporate dashboard.
 * Features a minimalist header and footer with maximized content area.
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
      {/* Compact header with navigation */}
      <div className="bg-slate-900 dark:bg-slate-950 py-2 px-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CorporateHeader isLoggedIn={true} minimal={true} />
          </div>
          <div className="flex items-center space-x-2">
            {hasSimulatedData && <SimulationIndicator compact={true} />}
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 flex items-center gap-1"
              onClick={handleRefresh}
              disabled={isRefreshing || contextLoading}
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing || contextLoading ? 'animate-spin' : ''}`} />
              <span className="text-xs">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span className="text-xs">Export</span>
            </Button>
            <DashboardSettings compact={true} />
          </div>
        </div>
      </div>

      {/* Dashboard title bar - more compact */}
      <div className="bg-slate-800 dark:bg-slate-900 py-3 px-4 border-b border-slate-700">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-sm text-slate-300">{description}</p>
          </div>
        </div>
      </div>

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