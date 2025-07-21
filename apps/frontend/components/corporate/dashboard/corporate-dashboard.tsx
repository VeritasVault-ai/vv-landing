'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './corporate-dashboard.module.css'

// Import dynamic dashboard components
import {
  DynamicAIAnalyticsDashboard,
  DynamicAdminDashboard,
  DynamicAnalyticsDashboard,
  DynamicConsumerDashboard,
  DynamicDashboardOverview,
  DynamicDashboardPerformance,
  DynamicDashboardVoting,
  DynamicEventGridDashboard,
  DynamicFlashLoanExplorer,
  DynamicMarketDashboard,
  DynamicModelPortfolioDashboard,
  DynamicCorporateDashboard as DynamicModularCorporateDashboard,
  DynamicOffChainDashboard,
  DynamicOnChainDashboard,
  DynamicRiskAssessmentDashboard,
  DynamicStrategiesDashboard,
  DynamicTreasuryDashboard
} from '@/components/dynamic-imports/dashboard-imports'

// Import dashboard configuration utilities
import {
  DashboardCategory,
  DashboardConfig,
  categoryDisplayNames,
  createDashboardConfig,
  getDashboardsByCategory
} from './dashboard-config'

/**
 * Enhanced Corporate Dashboard with sidebar navigation to switch between different dashboards
 */
export function CorporateDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Create dashboard components object to pass to the configuration function
  const dashboardComponents = {
    ModularCorporateDashboard: DynamicModularCorporateDashboard,
    AIAnalyticsDashboard: DynamicAIAnalyticsDashboard,
    DashboardPerformance: DynamicDashboardPerformance,
    DashboardVoting: DynamicDashboardVoting,
    DashboardOverview: DynamicDashboardOverview,
    AdminDashboard: DynamicAdminDashboard,
    AnalyticsDashboard: DynamicAnalyticsDashboard,
    ConsumerDashboard: DynamicConsumerDashboard,
    ModelPortfolioDashboard: DynamicModelPortfolioDashboard,
    EventGridDashboard: DynamicEventGridDashboard,
    MarketDashboard: DynamicMarketDashboard,
    TreasuryDashboard: DynamicTreasuryDashboard,
    OnChainDashboard: DynamicOnChainDashboard,
    OffChainDashboard: DynamicOffChainDashboard,
    StrategiesDashboard: DynamicStrategiesDashboard,
    RiskAssessmentDashboard: DynamicRiskAssessmentDashboard,
    FlashLoanExplorer: DynamicFlashLoanExplorer
  }
  
  // Generate dashboard configurations using the utility function
  const readonlyDashboards = createDashboardConfig({
    lazy: false, // We're using next/dynamic instead of lazy loading
    styles,
    components: dashboardComponents
  })
  
  // Convert readonly array to regular array to fix TypeScript error
  const dashboards = [...readonlyDashboards] as DashboardConfig[]
  
  // Determine active dashboard based on URL path or hash fragment
  const getInitialDashboard = () => {
    // First check if there's a hash fragment that matches a dashboard ID
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hash) {
      const foundByHash = dashboards.find(dash => dash.id === hash || dash.id.toLowerCase() === hash.toLowerCase());
      if (foundByHash) return foundByHash.id;
    }
  
    // Otherwise check the path
    const dashPath = pathname.split('/').slice(0, 4).join('/')
    const foundByPath = dashboards.find(dash => dash.path === dashPath)
    return foundByPath ? foundByPath.id : dashboards[0].id
  }
  const [activeDashboard, setActiveDashboard] = useState(() => getInitialDashboard())
  
  // Find the currently active dashboard component
  const currentDashboard = dashboards.find(
    dashboard => dashboard.id === activeDashboard
  ) || dashboards[0]
  
  const ActiveDashboardComponent = currentDashboard.component
  
  // Update URL when dashboard changes
  const handleDashboardChange = (dashboardId: string) => {
    const dashboard = dashboards.find(d => d.id === dashboardId)
    if (dashboard) {
      setActiveDashboard(dashboardId)
      // Use replace instead of push to avoid building up history stack
      router.replace(`${dashboard.path}#${dashboardId}`)
    }
  }
  
  // Sync URL with active dashboard when path or hash changes
  useEffect(() => {
    const dashId = getInitialDashboard()
    if (dashId !== activeDashboard) {
      setActiveDashboard(dashId)
    }
  }, [pathname, activeDashboard])
  
  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const dashId = getInitialDashboard()
      if (dashId !== activeDashboard) {
        setActiveDashboard(dashId)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [activeDashboard])
  // List of all available dashboard categories
  const categories: DashboardCategory[] = ['main', 'analytics', 'portfolio', 'tools', 'admin']
  
  return (
    <div className={styles.appContainer}>
   
      <div className={styles.dashboardContainer}>
        {/* Sidebar for dashboard selection */}
        <div className={styles.dashboardSidebar}>
          <h3 className={styles.sidebarTitle}>Dashboards</h3>
          <nav className={styles.dashboardNav}>
            {categories.map(category => (
              <div key={category} className={styles.categoryGroup}>
                <div className={styles.categoryLabel}>{categoryDisplayNames[category]}</div>
                {getDashboardsByCategory(dashboards, category).map(dashboard => (
                  <Button
                    key={dashboard.id}
                    variant={activeDashboard === dashboard.id ? "secondary" : "ghost"}
                    className={styles.dashboardButton}
                    onClick={() => handleDashboardChange(dashboard.id)}
                  >
                    <span className={styles.dashboardIcon}>{dashboard.icon}</span>
                    <span className={styles.dashboardName}>{dashboard.name}</span>
                  </Button>
                ))}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Main dashboard content area */}
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardComponentWrapper}>
            <ActiveDashboardComponent />
          </div>
        </div>
      </div>
      
    </div>
  )
}