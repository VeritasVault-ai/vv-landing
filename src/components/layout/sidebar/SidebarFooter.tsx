'use client'

import React, { ReactNode } from 'react'
import { LogOut, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ThemeToggle } from '@/src/components/ThemeToggle'
import { useSidebar } from './SidebarContext'

interface SidebarFooterProps {
  showThemeToggle?: boolean
  showUpgradeButton?: boolean
  showLogoutButton?: boolean
  upgradeButtonText?: string
  upgradeButtonIcon?: ReactNode
  onLogout?: () => void
  className?: string
}

/**
 * Footer component for the sidebar with theme toggle, upgrade button, and logout
 */
export function SidebarFooter({
  showThemeToggle = true,
  showUpgradeButton = true,
  showLogoutButton = true,
  upgradeButtonText = 'Upgrade to Pro',
  upgradeButtonIcon = <Sparkles className="mr-2 h-4 w-4" />,
  onLogout,
  className
}: SidebarFooterProps) {
  const { collapsed } = useSidebar()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior if no handler provided
      console.log('Logout clicked')
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800 p-4",
        className
      )}
    >
      {showThemeToggle && (
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>}
          <ThemeToggle variant={collapsed ? "minimal" : "default"} />
        </div>
      )}

      {showUpgradeButton && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  "w-full",
                  collapsed && "px-0"
                )}
                size={collapsed ? "icon" : "default"}
              >
                {collapsed ? upgradeButtonIcon : (
                  <>
                    {upgradeButtonIcon}
                    {upgradeButtonText}
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                {upgradeButtonText}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}

      {showLogoutButton && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "sm"}
                onClick={handleLogout}
                className={cn(
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  collapsed ? "w-10 h-10 p-0" : "w-full justify-start gap-2",
                )}
              >
                <LogOut className="h-5 w-5" />
                {!collapsed && <span>Log out</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Log out</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}