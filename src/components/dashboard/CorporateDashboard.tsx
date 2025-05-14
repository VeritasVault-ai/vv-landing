'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"
import { CollapsibleSidebar } from "@/src/components/layout/CollapsibleSidebar"
import { CorporateDashboardHeader } from "@/components/corporate/dashboard/corporate-dashboard-header"
import { CorporateDashboardMetrics } from './CorporateDashboardMetrics'
import { CorporateDashboardTabs } from './CorporateDashboardTabs'
import { 
  LayoutDashboard, 
  BarChart3, 
  LineChart, 
  Droplets, 
  FlaskConical, 
  Settings, 
  HelpCircle,
  ShieldAlert,
  Zap,
  BookOpen
} from 'lucide-react'
import { NavItemOrGroup } from '@/src/components/layout/sidebar'

/**
 * Main corporate dashboard component that brings together all dashboard modules
 */
export function CorporateDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  // Define corporate dashboard navigation items
  const navigationItems: NavItemOrGroup[] = [
    {
      type: 'link',
      name: 'Dashboard',
      href: '/corporate/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard'
    },
    {
      type: 'link',
      name: 'Analytics',
      href: '/corporate/analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      label: 'Analytics'
    },
    {
      type: 'group',
      name: 'Strategies',
      label: 'Strategies',
      icon: <FlaskConical className="h-5 w-5" />,
      items: [
        { href: '/corporate/strategies', label: 'My Strategies' },
        { href: '/corporate/strategies/create', label: 'Create Strategy' },
        { href: '/corporate/strategies/templates', label: 'Strategy Templates' }
      ],
      defaultOpen: true
    },
    {
      type: 'link',
      name: 'Pools',
      href: '/corporate/pools',
      icon: <Droplets className="h-5 w-5" />,
      label: 'Liquidity Pools',
      badge: '6'
    },
    {
      type: 'link',
      name: 'Risk Assessment',
      href: '/corporate/risk-assessment',
      icon: <ShieldAlert className="h-5 w-5" />,
      label: 'Risk Assessment'
    }
  ]

  // Define secondary navigation items
  const secondaryNavigationItems: NavItemOrGroup[] = [
    {
      type: 'link',
      name: 'Settings',
      href: '/corporate/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings'
    },
    {
      type: 'link',
      name: 'Help',
      href: '/corporate/help',
      icon: <HelpCircle className="h-5 w-5" />,
      label: 'Help & Support'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <CollapsibleSidebar 
          style="gradient"
          homeHref="/corporate"
          navigationItems={navigationItems}
          secondaryNavigationItems={secondaryNavigationItems}
          upgradeButtonText="Enterprise Features"
          onToggle={handleSidebarToggle}
        />

        {/* Main content */}
        <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          <CorporateDashboardHeader />

          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Institutional Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, Institutional Treasury Team</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                >
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <CorporateDashboardMetrics />
            <CorporateDashboardTabs />
          </div>
        </div>
      </div>
    </div>
  )
}