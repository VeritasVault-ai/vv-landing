"use client"

import { ThemeSettings } from "@/components/corporate/theme-settings"
import { RobustThemeToggle } from "@/components/robust-theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { ChevronDown, LogOut, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CorporateHeaderProps {
  isLoggedIn?: boolean;
  setIsLoggedIn?: (value: boolean) => void;
}

/**
 * Header component for the corporate version of the site
 * Includes navigation, theme toggle, theme settings, and call-to-action buttons
 * Uses the robust theme provider to ensure theme context is always available
 */
export function CorporateHeader({ isLoggedIn = false, setIsLoggedIn }: CorporateHeaderProps) {
  const { isDark } = useRobustTheme()

  // Toggle login state (for demo purposes)
  const handleAuthAction = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(!isLoggedIn)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/corporate-version" className="flex items-center gap-2">
            <Image 
              src={isDark ? "/logo-white.png" : "/logo.png"} 
              alt="VeritasVault Logo" 
              width={36} 
              height={36} 
            />
            <span className="font-semibold text-xl text-slate-900 dark:text-white">VeritasVault<span className="text-blue-600">.net</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {/* Dashboard link - only visible when logged in */}
            {isLoggedIn && (
              <Link 
                href="/corporate/dashboard" 
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Dashboard
              </Link>
            )}
            
            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Solutions <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/solutions/treasury">Treasury Management</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/solutions/portfolio">Portfolio Optimization</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/solutions/risk">Risk Management</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/solutions/compliance">Compliance</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/corporate-version/pricing" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </Link>
            
            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Company <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/careers">Careers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/corporate-version/contact">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <RobustThemeToggle />
          <ThemeSettings />
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/corporate/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/corporate/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleAuthAction} className="text-red-500 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={handleAuthAction}>
                  Log In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/corporate-version/demo">Request Demo</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}