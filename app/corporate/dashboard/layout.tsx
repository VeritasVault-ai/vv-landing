"use client"

import { CollapsibleSidebar } from '@/components/layout/collapsible-sidebar'
import { NavItemOrGroup } from '@/src/components/layout/CollapsibleSidebar'
import { NavGroup, NavItem } from '@/src/components/layout/sidebar/types'
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
const navigationItems: NavItemOrGroup[] = [
  {
    type: 'link',
    name: 'Dashboard',
    href: '/corporate/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard'
  } as NavItem,
  {
    type: 'link',
    name: 'Analytics',
    href: '/corporate/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    label: 'Analytics'
  } as NavItem,
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
  } as NavGroup,
  {
    type: 'link',
    name: 'Pools',
    href: '/corporate/pools',
    icon: <Droplets className="h-5 w-5" />,
    label: 'Liquidity Pools',
    badge: '6'
  } as NavItem,
  {
    type: 'link',
    name: 'Risk Assessment',
    href: '/corporate/risk-assessment',
    icon: <ShieldAlert className="h-5 w-5" />,
    label: 'Risk Assessment'
  } as NavItem
]

// Define secondary navigation items
const secondaryNavigationItems: NavItemOrGroup[] = [
  {
    type: 'link',
    name: 'Settings',
    href: '/corporate/settings',
    icon: <Settings className="h-5 w-5" />,
    label: 'Settings'
  } as NavItem,
  {
    type: 'link',
    name: 'Help',
    href: '/corporate/help',
    icon: <HelpCircle className="h-5 w-5" />,
    label: 'Help & Support'
  } as NavItem
]

/**
 * Renders the corporate dashboard layout with a collapsible sidebar and main content area.
 *
 * Wraps all dashboard pages in a consistent structure, displaying navigation links and an upgrade button in the sidebar, and rendering the provided {@link children} as the main content.
 *
 * @param children - The content to display in the main area of the dashboard.
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