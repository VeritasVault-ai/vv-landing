"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, Menu, X, User, Settings, LogOut, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCurrentVersion } from "@/hooks/use-current-version"

export function CorporateDashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { version } = useCurrentVersion()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={`/${version}`} className="flex items-center">
            <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
              <span>Veritas</span>
              <span className="text-blue-700 dark:text-blue-400">Vault</span>
              <span className="text-blue-500">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link
              href={`/${version}/dashboard`}
              className="text-sm font-medium text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1"
            >
              Dashboard
            </Link>
            <Link
              href={`/${version}/portfolio`}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href={`/${version}/strategies`}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Strategies
            </Link>
            <Link
              href={`/${version}/analytics`}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Analytics
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              >
                <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                  <Link href={`/${version}/compliance`} className="flex w-full">
                    Compliance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                  <Link href={`/${version}/reports`} className="flex w-full">
                    Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                  <Link href={`/${version}/settings`} className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative text-slate-700 dark:text-slate-300">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-white text-xs">
              3
            </Badge>
          </Button>

          <ThemeToggleEnhanced />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                  IT
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            >
              <DropdownMenuLabel className="text-slate-900 dark:text-slate-100">
                Institutional Treasury
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
              <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 focus:bg-slate-100 dark:focus:bg-slate-800">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden flex items-center">
          <ThemeToggleEnhanced />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <nav className="flex flex-col space-y-3">
              <Link
                href={`/${version}/dashboard`}
                className="text-sm font-medium text-blue-700 dark:text-blue-400 py-2 border-l-2 border-blue-700 dark:border-blue-400 pl-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href={`/${version}/portfolio`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href={`/${version}/strategies`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Strategies
              </Link>
              <Link
                href={`/${version}/analytics`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href={`/${version}/compliance`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Compliance
              </Link>
              <Link
                href={`/${version}/reports`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                href={`/${version}/settings`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 pl-3 hover:text-blue-700 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-700 dark:hover:border-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                  IT
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Institutional Treasury</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise Account</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="ghost"
                  className="justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
