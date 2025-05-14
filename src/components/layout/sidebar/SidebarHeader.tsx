'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { LogoIconOnly } from '@/components/ui/logo-icon-only'
import { useSidebar } from './SidebarContext'

interface SidebarHeaderProps {
  homeHref?: string
  className?: string
}

/**
 * Renders the header section of the sidebar with a logo and controls for collapsing, expanding, and opening the sidebar on mobile devices.
 *
 * @param homeHref - Optional URL for the logo link. Defaults to "/".
 * @param className - Optional additional CSS classes for the header container.
 */
export function SidebarHeader({ 
  homeHref = '/',
  className 
}: SidebarHeaderProps) {
  const { collapsed, toggleCollapsed, setMobileOpen } = useSidebar()

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setMobileOpen(true)} 
          className="rounded-full"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </div>

      {/* Sidebar header */}
      <div
        className={cn(
          "flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800",
          collapsed ? "justify-center" : "justify-between",
          className
        )}
      >
        <Link href={homeHref} className={cn("flex items-center", collapsed && "justify-center")}>
          {collapsed ? <LogoIconOnly className="h-8 w-8" /> : <Logo className="h-8 w-auto" />}
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="hidden md:flex">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Collapse sidebar</span>
          </Button>
        )}
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="absolute -right-4 top-7 hidden md:flex bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Expand sidebar</span>
          </Button>
        )}
      </div>
    </>
  )
}