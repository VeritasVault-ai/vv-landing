"use client"

import React, { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { DashboardSettings } from "./dashboard-settings"
import { useDashboard } from "@/contexts/dashboard-context-improved"
import { useTheme } from "@/lib/context/ThemeProvider"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
  onRefresh?: () => Promise<void>
}

export function DashboardLayout({ 
  children, 
  title, 
  description = "Portfolio overview and performance metrics",
  onRefresh 
}: DashboardLayoutProps) {
  const { settings, refreshData } = useDashboard()
  const { experience, themeVariant } = useTheme()

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh()
    } else {
      await refreshData()
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                {themeVariant === 'veritasvault' ? (
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
              <span className="text-blue-700 dark:text-blue-300 font-medium">IT</span>
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
            >
              <RefreshCw className="h-4 w-4" />
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
            &copy; {new Date().getFullYear()} {themeVariant === 'veritasvault' ? 'VeritasVault.ai' : 'Corporate Dashboard'}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}