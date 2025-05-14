import { ReactNode } from 'react'

/**
 * Represents a simple navigation link item
 */
export interface NavItem {
  type: 'link'
  name: string
  href: string
  icon: ReactNode
  label: string
  badge?: string | number
  badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
}

/**
 * Represents a collapsible navigation group with sub-items
 */
export interface NavGroup {
  type: 'group'
  name: string
  label: string
  icon: ReactNode
  badge?: string | number
  badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
  items: {
    href: string
    label: string
    badge?: string | number
    badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
  }[]
  defaultOpen?: boolean
}

/**
 * Union type for navigation items (either links or groups)
 */
export type NavItemOrGroup = NavItem | NavGroup

/**
 * Style options for the sidebar
 */
export type SidebarStyle = 'default' | 'gradient'