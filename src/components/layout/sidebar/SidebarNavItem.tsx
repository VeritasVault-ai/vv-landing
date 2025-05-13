'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SidebarBadge } from './SidebarBadge'
import { useSidebar } from './SidebarContext'

interface SidebarNavItemProps {
  href: string
  icon: ReactNode
  label: string
  badge?: string | number
  badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

/**
 * Navigation item component for the sidebar
 */
export function SidebarNavItem({
  href,
  icon,
  label,
  badge,
  badgeVariant,
  className,
  activeClassName,
  inactiveClassName
}: SidebarNavItemProps) {
  const pathname = usePathname()
  const { collapsed } = useSidebar()
  
  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && activeClassName,
        !isActive && inactiveClassName,
        className
      )}
    >
      <span className={cn(
        "h-5 w-5 flex-shrink-0", 
        isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
      )}>
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
      {!collapsed && badge && (
        <SidebarBadge content={badge} variant={badgeVariant} />
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="flex flex-col">
              <span>{label}</span>
              {badge && (
                <span className="text-xs mt-1">{badge}</span>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}