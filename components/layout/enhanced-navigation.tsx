"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogoWithText } from "@/components/ui/logo-with-text"
import { ChevronDown } from "lucide-react"

export function EnhancedNavigation() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Strategies", href: "/strategies" },
    {
      name: "Platform",
      href: "#",
      dropdown: true,
      items: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Enterprise", href: "/enterprise" },
      ],
    },
    {
      name: "Tools",
      href: "#",
      dropdown: true,
      items: [
        { name: "Analytics", href: "/analytics" },
        { name: "Risk Assessment", href: "/risk-assessment" },
        { name: "Flash Loans", href: "/flash-loans" },
      ],
    },
    { name: "Resources", href: "/resources" },
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-opacity-50 backdrop-blur-md bg-[hsl(var(--dark-bg-2))] border-b border-[hsl(var(--card-border))]">
      <div className="flex items-center">
        <LogoWithText className="mr-8" />
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link href={item.href} className={cn("nav-link flex items-center", pathname === item.href && "active")}>
                {item.name}
                {item.dropdown && <ChevronDown className="ml-1 h-4 w-4 opacity-70" />}
              </Link>

              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[hsl(var(--dark-bg-1))] border border-[hsl(var(--card-border))] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-[hsl(var(--dark-bg-2))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="button-secondary">Sign In</button>
        <button className="button-primary">Get Started</button>
      </div>
    </nav>
  )
}
