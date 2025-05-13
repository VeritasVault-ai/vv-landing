'use client'

// Analytics tracking for tab changes
import { DashboardOverview } from "@/components/corporate/dashboard-overview"
import { DashboardPerformance } from "@/components/corporate/dashboard-performance"
import { ModelResults } from "@/components/corporate/model-results"
import { DashboardVoting } from "@/components/corporate/voting"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardProvider, useDashboard } from "@/contexts/dashboard-context-improved"
import { useDashboardRealtime } from "@/lib/services/dashboard-realtime-manager"
import { BarChart3, Calculator, TrendingUp, Vote } from "lucide-react"
import { useEffect } from "react"

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
  }, [setActiveTab])

  // Handle manual refresh based on active tab
  const handleRefresh = async () => {
    await refreshData(activeTab as DashboardTab)
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

// Wrap the dashboard content with the provider
export function DashboardContent() {
  return (
    <DashboardProvider>
      <DashboardContentInner />
    </DashboardProvider>
  )
}