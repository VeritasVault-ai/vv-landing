'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './corporate-dashboard.module.css'
import { Menu, X } from 'lucide-react'

// Import layout components
import { CorporateHeader } from '@/components/corporate/corporate-header'
import { CorporateFooter } from '@/components/corporate/corporate-footer'

// Import dashboard configuration utilities
import {
  DashboardCategory,
  categoryDisplayNames,
  createDashboardConfig,
  getDashboardsByCategory
} from './dashboard-config-optimized'

// Import error boundary for better error handling
import { ErrorBoundary } from '@/components/error-boundary'

/**
 * Enhanced Corporate Dashboard with sidebar navigation to switch between different dashboards
 * Uses lazy loading for better performance and error boundaries for better error handling
 * Includes responsive design for mobile devices
 */
export function CorporateDashboardOptimized() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  
  // Generate dashboard configurations using the utility function
  const dashboards = createDashboardConfig(styles)
  
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
      
      // On mobile, collapse the sidebar after selection
      if (window.innerWidth < 768) {
        setSidebarExpanded(false)
      }
    }
  }
  
  // Sync URL with active dashboard when path changes
  useEffect(() => {
    const dashId = getInitialDashboard()
    if (dashId !== activeDashboard) {
      setActiveDashboard(dashId)
    }
  }, [pathname, activeDashboard])
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768 && sidebarExpanded) {
        const sidebar = document.getElementById('dashboard-sidebar')
        const toggle = document.getElementById('sidebar-toggle')
        
        if (sidebar && 
            toggle && 
            !sidebar.contains(event.target as Node) && 
            !toggle.contains(event.target as Node)) {
          setSidebarExpanded(false)
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebarExpanded])
  
  // List of all available dashboard categories
  const categories: DashboardCategory[] = ['main', 'analytics', 'portfolio', 'tools', 'admin']
  
  // Toggle sidebar expansion on mobile
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }
  
  return (
    <div className={styles.appContainer}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar for dashboard selection */}
        <div 
          id="dashboard-sidebar"
          className={`${styles.dashboardSidebar} ${sidebarExpanded ? styles.expanded : ''}`}
        >
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
        
        {/* Mobile sidebar toggle button */}
        <div 
          id="sidebar-toggle"
          className={styles.sidebarToggle}
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Close sidebar" : "Open sidebar"}
          role="button"
          tabIndex={0}
        >
          {sidebarExpanded ? <X size={20} /> : <Menu size={20} />}
        </div>
        
        {/* Main dashboard content area */}
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>{currentDashboard.name}</h1>
            <p className={styles.dashboardDescription}>{currentDashboard.description}</p>
          </div>
          <ErrorBoundary>
            <div className={styles.dashboardComponentWrapper}>
              <ActiveDashboardComponent />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}