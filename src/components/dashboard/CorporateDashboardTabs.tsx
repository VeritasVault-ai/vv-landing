'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Shield, FileText } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { CorporateOverviewTab } from './tabs/CorporateOverviewTab'
import { CorporatePerformanceTab } from './tabs/CorporatePerformanceTab'
import { CorporateRiskTab } from './tabs/CorporateRiskTab'
import { CorporateReportsTab } from './tabs/CorporateReportsTab'

/**
 * Component for the tabbed interface in the corporate dashboard
 */
export function CorporateDashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    trackNavigationEvent({
      feature_name: "corporate_dashboard_tab",
      tab_destination: value,
    })
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6" onValueChange={handleTabChange}>
      <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
        <TabsTrigger
          value="overview"
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger
          value="performance"
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
        >
          <TrendingUp className="h-4 w-4" />
          <span>Performance</span>
        </TabsTrigger>
        <TabsTrigger
          value="risk"
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
        >
          <Shield className="h-4 w-4" />
          <span>Risk</span>
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
        >
          <FileText className="h-4 w-4" />
          <span>Reports</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <CorporateOverviewTab />
      </TabsContent>

      <TabsContent value="performance">
        <CorporatePerformanceTab />
      </TabsContent>

      <TabsContent value="risk">
        <CorporateRiskTab />
      </TabsContent>

      <TabsContent value="reports">
        <CorporateReportsTab />
      </TabsContent>
    </Tabs>
  )
}