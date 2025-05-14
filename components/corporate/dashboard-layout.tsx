"use client"

import { Button } from "@/components/ui/button"
import { useDashboard } from "@/contexts/dashboard-context-improved"
import { Download, RefreshCw } from "lucide-react"
import { ReactNode, useState } from "react"
import { DashboardSettings } from "./dashboard-settings"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
  userInitials?: string
  themeVariant?: string // Accept themeVariant as a prop instead of using useTheme
}

// Move the year calculation outside the component
const currentYear = new Date().getFullYear()

/**
 * Provides a responsive layout wrapper for a corporate or themed dashboard, including header navigation, user avatar, action buttons, and footer.
 *
 * Renders a sticky header with branding and navigation links, a main section with title, description, and action buttons (refresh, export, settings), and a footer. Supports theme-based branding and customizable user avatar initials. The refresh button triggers either a provided refresh callback or a context-based refresh, with built-in loading state management.
 *
 * @param children - Content to display within the dashboard layout.
 * @param title - Main heading for the dashboard section.
 * @param description - Optional subtitle or description under the title.
 * @param onRefresh - Optional async callback for refreshing dashboard data.
 * @param userInitials - Optional initials to display in the user avatar.
 * @param themeVariant - Optional theme identifier to control branding.
 */
export function DashboardLayout({ 
  children, 
  title, 
  description = "Portfolio overview and performance metrics",
  onRefresh,
  userInitials = "IT", // Default value if not provided
  themeVariant = "corporate" // Default value if not provided
}: DashboardLayoutProps) {
  const { settings, refreshData } = useDashboard()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    if (isRefreshing) return
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

  const isVeritasVault = themeVariant === 'veritasvault'

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                {isVeritasVault ? (
                  <>
                    <span>Veritas</span>
                    <span className="text-blue-700 dark:text-blue-400">Vault</span>
                    <span className="text-blue-500">.ai</span>
                  </>
                ) : (
                  <>Corporate Dashboard</>
                )}
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 ml-6">
              <a
                href="/corporate/dashboard"
                className="text-sm font-medium text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1"
              >
                Dashboard
              </a>
              <a
                href="/corporate/portfolio"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/corporate/strategies"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Strategies
              </a>
              <a
                href="/corporate/analytics"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Analytics
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span
                className="text-blue-700 dark:text-blue-300 font-medium"
                aria-label={`User avatar for ${userInitials}`}
              >
                {userInitials}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className={`container mx-auto px-4 py-8 ${settings.compactView ? 'space-y-4' : 'space-y-6'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <DashboardSettings />
          </div>
        </div>

        {children}
      </main>

      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; {currentYear} {isVeritasVault ? 'VeritasVault.ai' : 'Corporate Dashboard'}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}