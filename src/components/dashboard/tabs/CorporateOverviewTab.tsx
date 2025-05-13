'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceChart } from "@/components/performance-chart"
import { AllocationChart } from "@/components/allocation-chart"
import { CorporatePortfolioSummary } from "@/components/corporate/dashboard/corporate-portfolio-summary"
import { CorporateRecentActivity } from "@/components/corporate/dashboard/corporate-recent-activity"
import { CorporateUpcomingEvents } from "@/components/corporate/dashboard/corporate-upcoming-events"

/**
 * Content for the Overview tab in the corporate dashboard
 */
export function CorporateOverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">Portfolio Performance</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                30-day historical performance
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PerformanceChart />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">Asset Allocation</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Current distribution
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <AllocationChart />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CorporatePortfolioSummary />
        </div>
        <div className="space-y-6">
          <CorporateRecentActivity />
          <CorporateUpcomingEvents />
        </div>
      </div>
    </div>
  )
}