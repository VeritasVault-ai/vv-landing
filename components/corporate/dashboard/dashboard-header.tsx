"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { Bell, ChevronDown, Search, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface DashboardHeaderProps {
  notificationCount?: number;
  onLogout?: () => void;
}

/**
 * Dashboard-specific header component that matches the design in the screenshot.
 * Includes logo, navigation links, search, notifications, and user menu.
 */
export function DashboardHeader({ notificationCount = 0, onLogout }: DashboardHeaderProps) {
  const { isDark } = useRobustTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/20 bg-slate-900 bg-opacity-95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section: Logo and main navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/corporate/dashboard" className="flex items-center gap-2">
            <Image 
              src="/logo-white.png"
              alt="VeritasVault Logo" 
              width={28} 
              height={28} 
            />
            <span className="font-semibold text-lg text-white">VeritasVault<span className="text-blue-400">.net</span></span>
          </Link>

          {/* Main navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/corporate/dashboard" 
              className="text-white hover:text-blue-400 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/corporate/dashboard/portfolio" 
              className="text-white/80 hover:text-blue-400 font-medium"
            >
              Portfolio
            </Link>
            <Link 
              href="/corporate/dashboard/strategies" 
              className="text-white/80 hover:text-blue-400 font-medium"
            >
              Strategies
            </Link>
            <Link 
              href="/corporate/dashboard/analytics" 
              className="text-white/80 hover:text-blue-400 font-medium"
            >
              Analytics
            </Link>
            
            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white/80 hover:text-blue-400">
                More <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-slate-800 border-slate-700">
                <DropdownMenuItem asChild className="text-white/80 hover:bg-slate-700 focus:bg-slate-700">
                  <Link href="/corporate/dashboard/treasury">Treasury</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white/80 hover:bg-slate-700 focus:bg-slate-700">
                  <Link href="/corporate/dashboard/risk-assessment">Risk Assessment</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white/80 hover:bg-slate-700 focus:bg-slate-700">
                  <Link href="/corporate/dashboard/reports">Reports</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Right section: Search, notifications, user */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-800/50 border border-slate-700 rounded-md py-1 px-3 pl-9 text-sm text-white placeholder:text-slate-400 w-60 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-slate-400" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-white/80 hover:text-blue-400">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                {notificationCount}
              </span>
            )}
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white">
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:inline">IT</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-white/80 hover:bg-slate-700 focus:bg-slate-700">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/80 hover:bg-slate-700 focus:bg-slate-700">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem 
                onClick={onLogout} 
                className="text-red-400 hover:bg-slate-700 focus:bg-slate-700"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}