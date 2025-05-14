'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

import {
  SidebarProvider,
  useSidebar,
} from './SidebarContext'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNavigation } from './SidebarNavigation'
import { NavItemOrGroup, SidebarStyle } from './types'

interface CollapsibleSidebarProps {
  className?: string
  style?: SidebarStyle
  homeHref?: string
  navigationItems?: NavItemOrGroup[]
  secondaryNavigationItems?: NavItemOrGroup[]
  showThemeToggle?: boolean
  showUpgradeButton?: boolean
  showLogoutButton?: boolean
  upgradeButtonText?: string
  upgradeButtonIcon?: ReactNode
  onLogout?: () => void
  onToggle?: (collapsed: boolean) => void
  defaultCollapsed?: boolean
}

export function CollapsibleSidebar(props: CollapsibleSidebarProps) {
  return (
    <SidebarProvider
      defaultCollapsed={props.defaultCollapsed}
      onToggle={props.onToggle}
    >
      <SidebarContent {...props} />
    </SidebarProvider>
  )
}

function SidebarContent({
  className,
  style = 'default',
  homeHref = '/',
  navigationItems = [],
  secondaryNavigationItems = [],
  showThemeToggle = true,
  showUpgradeButton = true,
  showLogoutButton = true,
  upgradeButtonText = 'Upgrade to Pro',
  upgradeButtonIcon,
  onLogout,
}: CollapsibleSidebarProps) {
  // 👉 Pull values from context with the hook
  const { mobileOpen, closeMobile, collapsed } = useSidebar()

  return (
    <>
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        />
      )}

      <div
        className={cn(
          'fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          style === 'default'
            ? 'bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800'
            : 'border-r border-slate-800/30 bg-gradient-to-b from-[#0D1B2A] to-[#1A1A2E]',
          className
        )}
      >
        <div className="flex h-full flex-col">
          <SidebarHeader homeHref={homeHref} />

          <SidebarNavigation
            items={navigationItems}
            secondaryItems={secondaryNavigationItems}
          />

          <SidebarFooter
            showThemeToggle={showThemeToggle}
            showUpgradeButton={showUpgradeButton}
            showLogoutButton={showLogoutButton}
            upgradeButtonText={upgradeButtonText}
            upgradeButtonIcon={upgradeButtonIcon}
            onLogout={onLogout}
          />
        </div>
      </div>
    </>
  )
}
