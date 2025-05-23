'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { BarChart3, FileText, Shield, TrendingUp } from "lucide-react"
import { useEffect, useState } from 'react'
import { CorporateOverviewTab } from './tabs/CorporateOverviewTab'
import { CorporatePerformanceTab } from './tabs/CorporatePerformanceTab'
import { CorporateReportsTab } from './tabs/CorporateReportsTab'
import { CorporateRiskTab } from './tabs/CorporateRiskTab'

// Define a type for the valid tab values
type TabValue = "overview" | "performance" | "risk" | "reports";

/**
 * Renders a tabbed interface for the corporate dashboard, allowing users to switch between Overview, Performance, Risk, and Reports sections.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.defaultTab="overview"] - The default tab to be displayed.
 * @returns {JSX.Element} The tabbed dashboard component with corresponding content for each tab.
 */
export function CorporateDashboardTabs({
  defaultTab = "overview"
}: {
  defaultTab?: TabValue
}) {
  const [activeTab, setActiveTab] = useState<TabValue>(defaultTab)
  
  // Effect to handle URL hash for direct linking to tabs
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.replace('#', '')
    
    // Type guard to ensure hash is a valid tab value
    if (isValidTab(hash)) {
      setActiveTab(hash)
    }

    // Update tab when hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '')
      if (isValidTab(newHash)) {
        setActiveTab(newHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Type guard function to check if a string is a valid tab value
  const isValidTab = (value: string): value is TabValue => {
    return ['overview', 'performance', 'risk', 'reports'].includes(value);
  }

  const handleTabChange = (value: string) => {
    // Ensure value is a valid tab before setting it
    if (isValidTab(value)) {
      setActiveTab(value)
      window.location.hash = value

      trackNavigationEvent({
        feature_name: "corporate_dashboard_tab",
        tab_destination: value,
      })
    }
  }
  
  return (
    <Tabs defaultValue={defaultTab} className="space-y-6" onValueChange={handleTabChange}>
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