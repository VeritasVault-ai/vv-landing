"use client"

import { ThemeSettings } from "@/components/corporate/theme-settings"
import { RobustThemeToggle } from "@/components/robust-theme-toggle"
import { Button } from "@/components/ui/button"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import Image from "next/image"
import Link from "next/link"

/**
 * Header component for the corporate version of the site
 * Includes navigation, theme toggle, theme settings, and call-to-action buttons
 * Uses the robust theme provider to ensure theme context is always available
 */
export function CorporateHeader() {
  const { isDark } = useRobustTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/corporate-version" className="flex items-center gap-2">
            <Image 
              src={isDark ? "/logo-white.svg" : "/logo.png"} 
              alt="VeritasVault Logo" 
              width={36} 
              height={36} 
            />
            <span className="font-semibold text-xl text-slate-900 dark:text-white">VeritasVault<span className="text-blue-600">.net</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/corporate-version/solutions" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Solutions
            </Link>
            <Link href="/corporate-version/pricing" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </Link>
            <Link href="/corporate-version/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/corporate-version/contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <RobustThemeToggle />
          <ThemeSettings />
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/corporate-version/login">Log In</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/corporate-version/demo">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}