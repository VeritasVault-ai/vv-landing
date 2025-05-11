"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Import the theme toggle with no SSR to prevent hydration mismatch
const ThemeToggleClientSide = dynamic(() => import("@/components/theme-toggle-client-side"), {
  ssr: false,
})
import { NotificationsPopover } from "./notifications-popover"
import { SettingsPopover } from "./settings-popover"
import { UserPopover } from "./user-popover"
import { LogoFull } from "@/components/ui/logo-full"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavGroup {
  name: string
  items: NavItem[]
}

interface NavItem {
  name: string
  href: string
  featured?: boolean
}

export function UnifiedHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navGroups: NavGroup[] = [
    {
      name: "Platform",
      items: [
        { name: "Dashboard", href: "/dashboard", featured: true },
        { name: "Analytics", href: "/analytics" },
        { name: "Pools", href: "/pools" },
      ],
    },
    {
      name: "Tools",
      items: [
        { name: "Strategies", href: "/strategies", featured: true },
        { name: "Flash Loans", href: "/flash-loans" },
      ],
    },
    {
      name: "Resources",
      items: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "Demo", href: "/demo" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ]

  // Featured nav items to show directly in the header
  const featuredNavItems = navGroups.flatMap((group) => group.items.filter((item) => item.featured))

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-all duration-300",
    isScrolled
      ? "border-slate-800/50 bg-gradient-to-r from-[#0D1B2A]/95 to-[#1A1A2E]/95 backdrop-blur-sm shadow-sm"
      : "bg-transparent border-transparent",
  )

  return (
    <header className={headerClasses}>
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
                  {item.name}
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
                          {item.name}
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
          <ThemeToggleClientSide variant="icon-only" />

          {/* Show these components only on dashboard pages */}
          {pathname?.includes("/dashboard") ||
          pathname?.includes("/analytics") ||
          pathname?.includes("/strategies") ||
          pathname?.includes("/pools") ? (
            <>
              <NotificationsPopover />
              <SettingsPopover />
              <UserPopover />
            </>
          ) : (
            <Button asChild className="hidden md:inline-flex">
              <Link href="/demo">Launch App</Link>
            </Button>
          )}

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
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Show Launch App button in mobile menu for non-dashboard pages */}
            {!pathname?.includes("/dashboard") &&
              !pathname?.includes("/analytics") &&
              !pathname?.includes("/strategies") &&
              !pathname?.includes("/pools") && (
                <div className="px-4 pt-2">
                  <Button asChild className="w-full">
                    <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                      Launch App
                    </Link>
                  </Button>
                </div>
              )}
          </div>
        </div>
      )}
    </header>
  )
}
