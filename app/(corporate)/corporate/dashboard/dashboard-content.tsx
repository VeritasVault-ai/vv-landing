'use client'

import { DashboardLayout } from "@/components/corporate/dashboard-layout"
import { DashboardOverview } from "@/components/corporate/dashboard-overview"
import { DashboardPerformance } from "@/components/corporate/dashboard-performance"
import { DashboardSummary } from "@/components/corporate/dashboard-summary"
import { ModelResults } from "@/components/corporate/model-results"
import { DashboardVoting } from "@/components/corporate/voting"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardProvider, useDashboard } from "@/contexts/dashboard-context-improved"
import { useDashboardRealtime } from "@/lib/services/dashboard-realtime-manager"
import { BarChart3, Calculator, TrendingUp, Vote } from "lucide-react"
import { useEffect } from "react"

/**
 * Renders the main content of the corporate dashboard, including summary cards, tabbed navigation, and real-time data updates.
 *
 * Synchronizes the active tab with the URL hash for direct linking and updates, and provides manual data refresh for the selected tab.
 *
 * @remark Initializes real-time data connections and ensures tab state remains consistent with the URL hash.
 */
function DashboardContentInner() {
  // Get dashboard state from context
  const { 
    activeTab, 
    setActiveTab, 
    refreshData
  } = useDashboard()
  
  // Initialize all real-time connections through the centralized manager
  useDashboardRealtime()

  // Analytics tracking for tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.location.hash = value
  }

  // Effect to handle URL hash for direct linking to tabs
  useEffect(() => {
    // Check if there's a hash in the URL that corresponds to a tab
    const hash = window.location.hash.replace('#', '')
    if (hash && ['overview', 'performance', 'models', 'voting'].includes(hash)) {
      setActiveTab(hash)
    }
    
    // Update hash when tab changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '')
      if (newHash && ['overview', 'performance', 'models', 'voting'].includes(newHash)) {
        setActiveTab(newHash)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [setActiveTab])

  // Handle manual refresh based on active tab
  const handleRefresh = async () => {
    await refreshData(activeTab as any)
  }

  return (
    <DashboardLayout 
      title="Corporate Dashboard" 
      description="Portfolio overview and performance metrics"
      onRefresh={handleRefresh}
    >
      {/* Dashboard Summary Cards */}
      <DashboardSummary />

      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Model Results</span>
          </TabsTrigger>
          <TabsTrigger value="voting" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            <span>Governance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="performance">
          <DashboardPerformance />
        </TabsContent>

        <TabsContent value="models">
          <ModelResults />
        </TabsContent>
        
        <TabsContent value="voting">
          <DashboardVoting />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

/**
 * Provides dashboard context and renders the main dashboard content.
 *
 * Wraps {@link DashboardContentInner} with {@link DashboardProvider} to supply state and real-time data to the dashboard UI.
 */
export function DashboardContent() {
  return (
    <DashboardProvider>
      <DashboardContentInner />
    </DashboardProvider>
  )
}
