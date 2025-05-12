"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogoFull } from "@/components/ui/logo-full"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggleRobust } from "@/components/theme-toggle-robust"

interface NavGroup {
  name: string
  items: NavItem[]
}

interface NavItem {
  name: string
  href: string
  featured?: boolean
}

export function CorporateHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Removed "Resources" group to make space for theme toggle
  const navGroups: NavGroup[] = [
    {
      name: "Solutions",
      items: [
        { name: "Enterprise", href: "/corporate/solutions/enterprise", featured: true },
        { name: "Financial", href: "/corporate/solutions/financial" },
        { name: "Government", href: "/corporate/solutions/government" },
      ],
    },
    {
      name: "Products",
      items: [
        { name: "Analytics", href: "/corporate/products/analytics", featured: true },
        { name: "Risk Management", href: "/corporate/products/risk-management" },
        // Added resources items here to consolidate
        { name: "Case Studies", href: "/corporate/resources/case-studies" },
        { name: "White Papers", href: "/corporate/resources/white-papers" },
      ],
    },
  ]

  // Featured nav items to show directly in the header
  const featuredNavItems = navGroups.flatMap((group) => group.items.filter((item) => item.featured))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/corporate" className="flex items-center">
            <LogoFull className="h-8" width={180} height={40} primaryColor="#3A86FF" secondaryColor="#4ECDC4" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/corporate"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/corporate"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
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
                    "px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
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
                      className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white group"
                    >
                      {group.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  >
                    {nonFeaturedItems.map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:text-slate-900 dark:focus:text-white"
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

        <div className="flex items-center gap-4">
          {/* Contact and Login buttons with more space for theme toggle */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/corporate/contact"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Contact
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/corporate/login">Login</Link>
            </Button>
          </div>

          {/* Theme toggle - with more space and better positioning */}
          <div className="flex items-center justify-center ml-2">
            <ThemeToggleRobust variant="default" />
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container py-4 space-y-4">
            <Link
              href="/corporate"
              className={cn(
                "block py-2 text-base font-medium",
                pathname === "/corporate"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {navGroups.map((group) => (
              <div key={group.name} className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {group.name}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block py-2 text-base font-medium",
                        pathname === item.href
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/corporate/contact"
              className="block py-2 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/corporate/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>

            {/* Mobile theme toggle */}
            <div className="flex items-center py-2">
              <span className="text-base font-medium text-slate-700 dark:text-slate-300 mr-2">Theme:</span>
              <ThemeToggleRobust variant="default" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
