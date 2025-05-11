"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopover } from "./notifications-popover"
import { SettingsPopover } from "./settings-popover"
import { UserPopover } from "./user-popover"
import { LogoFull } from "@/components/ui/logo-full"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { navigationService } from "@/lib/services/navigation-service"
import type { NavigationItem } from "@/lib/models/types"

interface NavGroup {
  name: string
  items: NavigationItem[]
}

export function DynamicHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navGroups, setNavGroups] = useState<NavGroup[]>([])
  const [featuredNavItems, setFeaturedNavItems] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const navItems = await navigationService.getAll()

        // Group navigation items
        const groups: Record<string, NavigationItem[]> = {}
        navItems.forEach((item) => {
          if (!item.group) return

          if (!groups[item.group]) {
            groups[item.group] = []
          }
          groups[item.group].push(item)
        })

        // Convert to array of NavGroup
        const navGroupsArray = Object.entries(groups).map(([name, items]) => ({
          name,
          items,
        }))

        setNavGroups(navGroupsArray)

        // Set featured items
        setFeaturedNavItems(navItems.filter((item) => item.featured))
      } catch (error) {
        console.error("Failed to fetch navigation:", error)
        // Fallback to hardcoded navigation
        setNavGroups([
          {
            name: "Platform",
            items: [
              { id: 1, label: "Dashboard", href: "/dashboard", featured: true, order: 1, group: "Platform" },
              { id: 2, label: "Analytics", href: "/analytics", order: 2, group: "Platform" },
              { id: 3, label: "Pools", href: "/pools", order: 3, group: "Platform" },
            ],
          },
          {
            name: "Tools",
            items: [
              { id: 4, label: "Strategies", href: "/strategies", featured: true, order: 1, group: "Tools" },
              { id: 5, label: "Flash Loans", href: "/flash-loans", order: 2, group: "Tools" },
            ],
          },
          {
            name: "Resources",
            items: [
              { id: 6, label: "How It Works", href: "/how-it-works", order: 1, group: "Resources" },
              { id: 7, label: "Demo", href: "/demo", order: 2, group: "Resources" },
            ],
          },
        ])

        setFeaturedNavItems([
          { id: 1, label: "Dashboard", href: "/dashboard", featured: true, order: 1, group: "Platform" },
          { id: 4, label: "Strategies", href: "/strategies", featured: true, order: 1, group: "Tools" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNavigation()
  }, [])

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-[#0D1B2A]/95 to-[#1A1A2E]/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="h-8 w-40 bg-slate-700/20 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-700/20 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-slate-700/20 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-slate-700/20 animate-pulse rounded-full"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-[#0D1B2A]/95 to-[#1A1A2E]/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <LogoFull className="h-8" width={180} height={40} primaryColor="#3A86FF" secondaryColor="#4ECDC4" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-white relative group",
                pathname === "/"
                  ? "text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-[#4ECDC4]"
                  : "text-white/70 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-1/3 hover:after:h-0.5 hover:after:bg-[#4ECDC4]/50",
              )}
            >
              Home
            </Link>

            {/* Featured nav items */}
            {featuredNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-white relative group",
                    isActive
                      ? "text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-[#4ECDC4]"
                      : "text-white/70 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-1/3 hover:after:h-0.5 hover:after:bg-[#4ECDC4]/50",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Dropdown menus for nav groups */}
            {navGroups.map((group) => {
              // Skip groups with only featured items that are already shown
              const nonFeaturedItems = group.items.filter((item) => !item.featured)
              if (nonFeaturedItems.length === 0) return null

              return (
                <DropdownMenu key={group.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white group"
                    >
                      {group.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-gradient-to-b from-[#0D1B2A] to-[#1A1A2E] border-slate-700/50 shadow-lg shadow-blue-900/20"
                  >
                    {nonFeaturedItems.map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className="text-white/70 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5"
                      >
                        <Link href={item.href} className="w-full px-3 py-2">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationsPopover />
          <SettingsPopover />
          <UserPopover />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-gradient-to-b from-[#0D1B2A] to-[#1A1A2E]">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className={cn(
                "block px-4 py-3 text-base font-medium rounded-md hover:bg-white/5 transition-colors",
                pathname === "/"
                  ? "text-white bg-white/5 border-l-2 border-[#4ECDC4]"
                  : "text-white/70 border-l-2 border-transparent",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {navGroups.map((group) => (
              <div key={group.name} className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider">{group.name}</h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-md hover:bg-white/5 transition-colors",
                        pathname === item.href
                          ? "text-white bg-white/5 border-l-2 border-[#4ECDC4]"
                          : "text-white/70 border-l-2 border-transparent",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
