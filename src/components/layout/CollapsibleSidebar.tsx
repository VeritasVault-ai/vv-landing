'use client'

/**
 * Enhanced CollapsibleSidebar Component
 * 
 * This component is a consolidated implementation that combines features from multiple
 * sidebar implementations in the codebase. It provides a flexible, feature-rich sidebar
 * with collapsible functionality, nested navigation, badges, theme toggle, and more.
 */

import React from 'react'
import type { NavItemOrGroup, SidebarStyle } from './sidebar'
import { CollapsibleSidebar as ModularSidebar } from './sidebar'

// Re-export the types
export type { NavItemOrGroup, SidebarStyle } from './sidebar'

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
  upgradeButtonIcon?: React.ReactNode
  onLogout?: () => void
  onToggle?: (collapsed: boolean) => void
  defaultCollapsed?: boolean
}

/**
 * Renders a collapsible sidebar with customizable navigation, appearance, and feature toggles.
 *
 * Forwards all props to the modular sidebar implementation to provide navigation, theme toggling, upgrade, and logout functionality.
 *
 * @returns The rendered sidebar component.
 */
export function CollapsibleSidebar(props: CollapsibleSidebarProps) {
  return <ModularSidebar {...props} />
}