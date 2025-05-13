"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboard } from "@/contexts/dashboard-context"
import { AlertTriangle, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

export function DashboardSummary() {
  const { overviewData, isLoading, errors, settings } = useDashboard()
  
  // Portfolio value update animation
  const [isPortfolioUpdating, setIsPortfolioUpdating] = useState(false)
  const [isRiskUpdating, setIsRiskUpdating] = useState(false)

  // Watch for changes in overviewData to trigger animations
  useEffect(() => {
    if (overviewData) {
      setIsPortfolioUpdating(true)
      const t = setTimeout(() => setIsPortfolioUpdating(false), 1500)
      return () => clearTimeout(t)
    }
  }, [overviewData?.portfolioValue.current])

  useEffect(() => {
    if (overviewData) {
      setIsRiskUpdating(true)
      const t = setTimeout(() => setIsRiskUpdating(false), 1500)
      return () => clearTimeout(t)
    }
  }, [overviewData?.riskScore.level])

  // If no metrics are visible, don't render anything
  const anyMetricVisible = Object.values(settings.visibleMetrics).some(value => value)
  if (!anyMetricVisible) {
    return null
  }

  if (isLoading.overview) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (errors.overview) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md mb-8">
        <p className="text-red-800 dark:text-red-200">{errors.overview}</p>
      </div>
    )
  }

  if (!overviewData) {
    return null
  }

  const { portfolioValue, activeStrategies, riskScore } = overviewData
  
  // Format portfolio value for display
  const MILLION = 1_000_000;
  const formattedValue = (portfolioValue.current / MILLION).toFixed(1)
  const isPositiveChange = portfolioValue.percentageChange >= 0

  // Calculate how many cards to display based on settings
  const visibleCards = Object.entries(settings.visibleMetrics)
    .filter(([_, isVisible]) => isVisible)
    .length

  // Adjust grid columns based on number of visible cards
  const gridCols = visibleCards === 1 ? "md:grid-cols-1" : 
                   visibleCards === 2 ? "md:grid-cols-2" : 
                   "md:grid-cols-3"

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6 mb-8`}>
      {settings.visibleMetrics.portfolioValue && (
        <Card className={`transition-all duration-300 ${isPortfolioUpdating ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
          <CardHeader className={`${settings.compactView ? 'py-3' : 'pb-2'}`}>
            <CardDescription>Portfolio Value</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              ${formattedValue}M
              <span className={`${isPositiveChange ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} text-sm font-normal ml-2 flex items-center`}>
                {isPositiveChange ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {portfolioValue.percentageChange}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className={settings.compactView ? 'py-3' : undefined}>
            <p className="text-sm text-slate-500 dark:text-slate-400">Updated {portfolioValue.lastUpdated}</p>
          </CardContent>
        </Card>
      )}

      {settings.visibleMetrics.activeStrategies && (
        <Card>
          <CardHeader className={`${settings.compactView ? 'py-3' : 'pb-2'}`}>
            <CardDescription>Active Strategies</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              {activeStrategies.count}
              <span className="text-blue-600 dark:text-blue-500 text-sm font-normal ml-2">
                {activeStrategies.optimized} optimized
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className={settings.compactView ? 'py-3' : undefined}>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated {activeStrategies.lastUpdated}</p>
          </CardContent>
        </Card>
      )}

      {settings.visibleMetrics.riskScore && (
        <Card className={`transition-all duration-300 ${isRiskUpdating ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
          <CardHeader className={`${settings.compactView ? 'py-3' : 'pb-2'}`}>
            <CardDescription>Risk Score</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              {riskScore.level}
              <span className={`${riskScore.status === 'Optimal' ? 'text-green-600 dark:text-green-500' : 'text-amber-600 dark:text-amber-500'} text-sm font-normal ml-2 flex items-center`}>
                <AlertTriangle className="h-4 w-4 mr-1" />
                {riskScore.status}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className={settings.compactView ? 'py-3' : undefined}>
            <p className="text-sm text-slate-500 dark:text-slate-400">{riskScore.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}