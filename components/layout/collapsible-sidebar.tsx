"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  LineChart,
  Droplets,
  FlaskConical,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { LogoIconOnly } from "@/components/ui/logo-icon-only"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: string | number
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Strategies", href: "/strategies", icon: LineChart },
  { name: "Pools", href: "/pools", icon: Droplets },
  { name: "Flash Loans", href: "/flash-loans", icon: FlaskConical },
]

const secondaryNavigation: NavItem[] = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

interface CollapsibleSidebarProps {
  className?: string
  onToggle?: (collapsed: boolean) => void
}

export function CollapsibleSidebar({ className, onToggle }: CollapsibleSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
        setMobileOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed)
    }
  }, [collapsed, onToggle])

  // Close mobile sidebar when navigating
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <item.icon
                className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-gray-500 dark:text-gray-400")}
              />
              {!collapsed && <span>{item.name}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setMobileOpen(true)} className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div
            className={cn(
              "flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <Link href="/" className={cn("flex items-center", collapsed && "justify-center")}>
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

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              {secondaryNavigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </nav>

          {/* User section */}
          <div
            className={cn(
              "flex items-center border-t border-gray-200 dark:border-gray-800 p-4",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={collapsed ? "icon" : "sm"}
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
          </div>
        </div>
      </div>
    </>
  )
}
