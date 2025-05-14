'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from './SidebarNavItem'
import { SidebarNavGroup } from './SidebarNavGroup'
import { NavItemOrGroup } from './types'

interface SidebarNavigationProps {
  items: NavItemOrGroup[]
  className?: string
  secondaryItems?: NavItemOrGroup[]
  secondaryClassName?: string
}

/**
 * Renders a sidebar navigation menu with primary and optional secondary navigation items or groups.
 *
 * Displays navigation links and grouped items in a vertical layout, supporting custom styling for both primary and secondary sections.
 *
 * @param items - Array of navigation items or groups to display in the main section.
 * @param className - Optional CSS class for the main navigation container.
 * @param secondaryItems - Optional array of navigation items or groups for the secondary section.
 * @param secondaryClassName - Optional CSS class for the secondary navigation container.
 */
export function SidebarNavigation({
  items,
  className,
  secondaryItems,
  secondaryClassName
}: SidebarNavigationProps) {
  return (
    <nav className={cn("flex-1 space-y-1 px-2 py-4", className)}>
      <div className="space-y-1">
        {items.map((item, index) => (
          item.type === 'link' ? (
            <SidebarNavItem
              key={`nav-item-${index}-${item.href}`}
              href={item.href}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              badgeVariant={item.badgeVariant}
            />
          ) : (
            <SidebarNavGroup
              key={`nav-group-${index}-${item.label}`}
              label={item.label}
              icon={item.icon}
              items={item.items}
              badge={item.badge}
              badgeVariant={item.badgeVariant}
              defaultOpen={item.defaultOpen}
            />
          )
        ))}
      </div>

      {secondaryItems && secondaryItems.length > 0 && (
        <div className={cn("mt-10 pt-6 border-t border-gray-200 dark:border-gray-800", secondaryClassName)}>
          {secondaryItems.map((item, index) => (
            item.type === 'link' ? (
              <SidebarNavItem
                key={`secondary-nav-item-${index}-${item.href}`}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                badgeVariant={item.badgeVariant}
              />
            ) : (
              <SidebarNavGroup
                key={`secondary-nav-group-${index}-${item.label}`}
                label={item.label}
                icon={item.icon}
                items={item.items}
                badge={item.badge}
                badgeVariant={item.badgeVariant}
                defaultOpen={item.defaultOpen}
              />
            )
          ))}
        </div>
      )}
    </nav>
  )
}