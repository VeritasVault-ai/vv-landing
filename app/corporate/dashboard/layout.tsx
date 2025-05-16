"use client"

import { CollapsibleSidebar } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/lib/context/ThemeProvider'
import {
  BarChart3,
  Droplets,
  FlaskConical,
  HelpCircle,
  LayoutDashboard,
  Settings,
  ShieldAlert
} from 'lucide-react'
import { ReactNode } from 'react'

// Define corporate dashboard navigation items
const navigationItems = [
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
const secondaryNavigationItems = [
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

/**
 * Dashboard layout component that provides a consistent layout for all dashboard pages
 * with a collapsible sidebar and main content area
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <CollapsibleSidebar 
        style="gradient"
        homeHref="/corporate"
        navigationItems={navigationItems}
        secondaryNavigationItems={secondaryNavigationItems}
        upgradeButtonText="Enterprise Features"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}