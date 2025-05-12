"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Droplets,
  LineChart,
  Sparkles,
  FlaskConical,
  Zap,
  BookOpen,
  ShieldAlert,
  BarChart3,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ThemeToggleRobust } from "@/components/theme-toggle-robust"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo width={32} height={32} />
            <span>NeuralLiquid</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/dashboard" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/pools"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/pools" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <Droplets className="h-4 w-4" />
              Liquidity Pools
            </Link>
            <Link
              href="/strategies"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/strategies" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <FlaskConical className="h-4 w-4" />
              Strategies
            </Link>
            <Link
              href="/analytics"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/analytics" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/analytics/reports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/analytics/reports" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics Reports
            </Link>
            <Link
              href="/flash-loans"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/flash-loans" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <Zap className="h-4 w-4" />
              Flash Loans
            </Link>
            <Link
              href="/risk-assessment"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/risk-assessment" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <ShieldAlert className="h-4 w-4" />
              Risk Assessment
            </Link>
            <Link
              href="/ai-features"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/ai-features" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <Sparkles className="h-4 w-4" />
              AI Features
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/how-it-works" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              )}
            >
              <BookOpen className="h-4 w-4" />
              How It Works
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
            <ThemeToggleRobust variant="minimal" />
          </div>
          <Button className="w-full" size="sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  )
}
