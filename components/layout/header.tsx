"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogoFull } from "@/components/ui/logo-full"
import { ThemeToggleRobust } from "@/components/theme-toggle-robust"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
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
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/dashboard"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/pools"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/pools"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              Liquidity Pools
            </Link>
            <Link
              href="/strategies"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/strategies"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              Strategies
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/how-it-works"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              How It Works
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggleRobust />
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/demo">Launch App</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
