"use client"

import { useState } from "react"
import Link from "next/link"
import { LogoFull } from "@/components/ui/logo-full"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggleRobust } from "@/components/theme-toggle-robust"

export function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <LogoFull className="h-8" width={180} height={40} primaryColor="#3A86FF" secondaryColor="#4ECDC4" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/documentation"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Documentation
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Log In
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>

          {/* Theme toggle - positioned after the buttons */}
          <div className="flex items-center justify-center">
            <ThemeToggleRobust variant="minimal" />
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
              href="/features"
              className="block py-2 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/documentation"
              className="block py-2 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/login"
              className="block py-2 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>

            {/* Mobile theme toggle */}
            <div className="flex items-center py-2">
              <span className="text-base font-medium text-slate-700 dark:text-slate-300 mr-2">Theme:</span>
              <ThemeToggleRobust variant="minimal" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
