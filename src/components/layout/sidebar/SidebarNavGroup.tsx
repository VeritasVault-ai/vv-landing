'use client'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { SidebarBadge } from './SidebarBadge'
import { useSidebar } from './SidebarContext'

interface NavSubItem {
  href: string
  label: string
  badge?: string | number
  badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
}

interface SidebarNavGroupProps {
  label: string
  icon: ReactNode
  items: NavSubItem[]
  defaultOpen?: boolean
  badge?: string | number
  badgeVariant?: 'default' | 'new' | 'primary' | 'secondary'
  className?: string
}

/**
 * Renders a collapsible navigation group in the sidebar with a label, icon, optional badge, and a list of sub-items.
 *
 * Expands automatically if any sub-item matches the current route. When the sidebar is collapsed, the group is not rendered.
 *
 * @param label - The group label displayed in the sidebar.
 * @param icon - The icon shown next to the label.
 * @param items - Array of navigation sub-items, each with a label, href, and optional badge.
 * @param defaultOpen - Whether the group is expanded by default.
 * @param badge - Optional badge content displayed next to the group label.
 * @param badgeVariant - Visual style for the badge.
 * @param className - Additional CSS classes for the group container.
 *
 * @returns A sidebar navigation group with collapsible sub-items.
 *
 * @remark The group is not displayed when the sidebar is collapsed.
 */
export function SidebarNavGroup({
  label,
  icon,
  items,
  defaultOpen = false,
  badge,
  badgeVariant,
  className
}: SidebarNavGroupProps) {
  const pathname = usePathname()
  const { collapsed } = useSidebar()
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  // Check if any child item is active
  const hasActiveChild = items.some(item => pathname === item.href || pathname.startsWith(`${item.href}/`))
  
  // Auto-open the group if it contains the active page
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true)
    }
  }, [hasActiveChild])

  // If sidebar is collapsed, we don't show the group expanded
  if (collapsed) {
    // In collapsed mode, we show the group as a tooltip trigger
    // This could be enhanced to show a flyout menu instead
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                hasActiveChild && "text-primary bg-primary/10",
              )}
            >
              <span
                className={cn(
                  "h-5 w-5",
                  hasActiveChild ? "text-primary" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {icon}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-0 w-48">
            <div className="flex flex-col gap-1 p-2">
              {items.map((item, index) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={`${item.href}-${index}`}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                      isActive && "text-primary bg-primary/10 font-medium"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <SidebarBadge
                          content={item.badge}
                          variant={item.badgeVariant}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
            hasActiveChild && "text-primary bg-primary/10",
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn(
              "h-5 w-5 flex-shrink-0", 
              hasActiveChild ? "text-primary" : "text-gray-500 dark:text-gray-400"
            )}>
              {icon}
            </span>
            <span>{label}</span>
            {badge && (
              <SidebarBadge content={badge} variant={badgeVariant} />
            )}
          </div>
          <ChevronRight
            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10 pr-2">
        <div className="flex flex-col gap-1 pt-1">
          {items.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                  isActive && "text-primary bg-primary/10 font-medium",
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <SidebarBadge content={item.badge} variant={item.badgeVariant} />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}