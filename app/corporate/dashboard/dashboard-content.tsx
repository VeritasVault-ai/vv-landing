"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/corporate/dashboard-header"
import { BarChart3, Calculator, TrendingUp, Vote } from "lucide-react"
import DashboardOverview from "./overview"
import { DashboardPerformance } from "./performance"
import { ModelResults } from "./models"
import { DashboardVoting } from "./voting"
import { useDashboardData } from "@/lib/hooks/useDashboardData"

/**
 * Determines whether a given string is a valid dashboard tab identifier.
 */
function isValidTab(tab: string): tab is 'overview' | 'performance' | 'models' | 'voting' {
  return ['overview', 'performance', 'models', 'voting'].includes(tab)
}

/**
 * Dashboard content component that handles tab-based navigation and real-time data updates
 */
export function DashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'models' | 'voting'>('overview')
  const {
    dashboardData,
    connectionStatus,
    isAnyDataSimulated,
    refresh
  } = useDashboardData()

  // Handle tab changes
  const handleTabChange = (value: string) => {
    if (isValidTab(value)) {
      setActiveTab(value)
      window.location.hash = value
    }
  }

  // Effect to handle URL hash for direct linking to tabs
  useEffect(() => {
    // Check if there's a hash in the URL that corresponds to a tab
    const hash = window.location.hash.replace('#', '')
    if (hash && isValidTab(hash)) {
      setActiveTab(hash)
    }
    
    // Update hash when tab changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '')
      if (newHash && isValidTab(newHash)) {
        setActiveTab(newHash)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      await refresh()
    } catch (err) {
      console.error('Dashboard manual refresh failed', err)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader
          title="Corporate Dashboard"
          description="Real-time metrics and system status"
          isSimulated={isAnyDataSimulated}
          connectionStatus={connectionStatus}
          lastUpdated={dashboardData?.lastUpdated}
          onRefresh={handleRefresh}
        />
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="space-y-6 mt-6"
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
      </div>
    </div>
  )
}