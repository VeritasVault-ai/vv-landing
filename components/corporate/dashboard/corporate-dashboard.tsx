'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './corporate-dashboard.module.css'

// Import dashboard components
import { TreasuryDashboard } from '@/app/corporate-version/solutions/treasury/components/treasury-dashboard'
import { AIAnalyticsDashboard } from '@/components/ai-analytics-dashboard'
import { DashboardPerformance } from '@/components/corporate/dashboard-performance'
import { DashboardVoting } from '@/components/corporate/voting'
import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { CorporateDashboard as ModularCorporateDashboard } from '@/src/components/dashboard/CorporateDashboard'
import { AdminDashboard } from '@/src/components/features/admin/admin-dashboard'
import { AnalyticsDashboard } from '@/src/components/features/analytics/analytics-dashboard'
import { ConsumerDashboard } from '@/src/components/features/consumer/dashboard/consumer-dashboard'
import { ModelPortfolioDashboard } from '@/src/components/features/consumer/model-portfolio/model-portfolio-dashboard'
import { EventGridDashboard } from '@/src/components/features/event-grid/event-grid-dashboard'
import { MarketDashboard } from '@/src/components/features/market-data/market-dashboard'

// Import modular analytics dashboards
import { OffChainDashboard } from './analytics/offchain-dashboard'
import { OnChainDashboard } from './analytics/onchain-dashboard'

// Import placeholder components for tools section
import { StrategiesDashboard } from './tools/strategies-dashboard'

// Import dashboard configuration utilities
import { RiskAssessmentDashboard } from '@/components/demo/risk-assessment-dashboard'
import FlashLoanExplorer from '@/components/flash-loan-explorer'
import { VersionAwareFooter } from '@/src/components/layout/VersionAwareFooterBridge'
import {
  DashboardCategory,
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
    ModularCorporateDashboard,
    AIAnalyticsDashboard,
    DashboardPerformance,
    DashboardVoting,
    DashboardOverview,
    AdminDashboard,
    AnalyticsDashboard,
    ConsumerDashboard,
    ModelPortfolioDashboard,
    EventGridDashboard,
    MarketDashboard,
    TreasuryDashboard,
    OnChainDashboard,
    OffChainDashboard,
    StrategiesDashboard,
    RiskAssessmentDashboard,
    FlashLoanExplorer
  }
  
  // Generate dashboard configurations using the utility function
  const dashboards = createDashboardConfig(dashboardComponents, styles)
  
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
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>{currentDashboard.name}</h1>
            <p className={styles.dashboardDescription}>{currentDashboard.description}</p>
          </div>
          <div className={styles.dashboardComponentWrapper}>
            <ActiveDashboardComponent />
          </div>
        </div>
      </div>
      
      {/* Corporate Footer */}
      <VersionAwareFooter />
    </div>
  )
}