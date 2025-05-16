'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './corporate-dashboard.module.css'

// Import layout components
import { CorporateHeader } from '@/components/layout/corporate-header'
import { CorporateFooter } from '@/components/layout/corporate-footer'

// Import dashboard components
import { CorporateDashboard as ModularCorporateDashboard } from '@/src/components/dashboard/CorporateDashboard'
import { AIAnalyticsDashboard } from '@/components/ai-analytics-dashboard'
import { DashboardPerformance } from '@/components/corporate/dashboard-performance'
import { DashboardVoting } from '@/components/corporate/voting'
import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { AdminDashboard } from '@/src/components/features/admin/admin-dashboard'
import { AnalyticsDashboard } from '@/src/components/features/analytics/analytics-dashboard'
import { ConsumerDashboard } from '@/src/components/features/consumer/dashboard/consumer-dashboard'
import { ModelPortfolioDashboard } from '@/src/components/features/consumer/model-portfolio/model-portfolio-dashboard'
import { EventGridDashboard } from '@/src/components/features/event-grid/event-grid-dashboard'
import { MarketDashboard } from '@/src/components/features/market-data/market-dashboard'
import { TreasuryDashboard } from '@/app/corporate-version/solutions/treasury/components/treasury-dashboard'

// Import modular analytics dashboards
import { OnChainDashboard } from './analytics/onchain-dashboard'
import { OffChainDashboard } from './analytics/offchain-dashboard'

// Import placeholder components for tools section
import { StrategiesDashboard } from './tools/strategies-dashboard'
import { RiskAssessmentDashboard } from './tools/risk-assessment-dashboard'
import { FlashLoansDashboard } from './tools/flash-loans-dashboard'

// Import dashboard configuration utilities
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
    FlashLoansDashboard
  }
  
  // Generate dashboard configurations using the utility function
  const dashboards = createDashboardConfig(dashboardComponents, styles)
  
  // Determine active dashboard based on URL path or default to first dashboard
  const getInitialDashboard = () => {
    const dashPath = pathname.split('/').slice(0, 4).join('/')
    const found = dashboards.find(dash => dash.path === dashPath)
    return found ? found.id : dashboards[0].id
  }
  
  const [activeDashboard, setActiveDashboard] = useState(getInitialDashboard())
  
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
      router.replace(dashboard.path)
    }
  }
  
  // Sync URL with active dashboard when path changes
  useEffect(() => {
    const dashId = getInitialDashboard()
    if (dashId !== activeDashboard) {
      setActiveDashboard(dashId)
    }
  }, [pathname, activeDashboard])
  
  // List of all available dashboard categories
  const categories: DashboardCategory[] = ['main', 'analytics', 'portfolio', 'tools', 'admin']
  
  return (
    <div className={styles.appContainer}>
      {/* Corporate Header */}
      <CorporateHeader />
      
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
      <CorporateFooter />
    </div>
  )
}