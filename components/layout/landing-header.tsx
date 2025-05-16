"use client"

import { StandaloneThemeToggle } from "@/components/ui/standalone-theme-toggle"
import Link from "next/link"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
              <span>Neural</span>
              <span className="text-blue-700 dark:text-blue-400">Liquid</span>
              <span className="text-blue-500 dark:text-blue-500">.net</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <StandaloneThemeToggle />
        </div>
      </div>
    </header>
  )
}
