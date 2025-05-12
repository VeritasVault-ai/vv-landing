"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DemoModeExitModal } from "@/components/demo-mode/exit-modal"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

export function CorporateDemoHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  const handleNavClick = (itemName: string) => {
    trackNavigationEvent({
      feature_name: "corporate_demo_header_navigation",
      tab_destination: itemName.toLowerCase().replace(/\s+/g, "_"),
    })
  }

  const handleExitDemo = () => {
    trackNavigationEvent({
      feature_name: "corporate_demo_exit",
      tab_destination: "corporate_main",
    })
    window.location.href = "/corporate"
  }

  return (
    <>
      <header className="border-b bg-slate-900 text-white sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/corporate/demo/landing"
              className="flex items-center"
              onClick={() => handleNavClick("Demo Home")}
            >
              <div className="ml-3">
                <span className="text-xl font-bold text-white">
                  Veritas<span className="text-blue-400">Vault</span>
                </span>
                <span className="text-blue-400 text-sm ml-1">.ai</span>
                <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full">DEMO</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/corporate/demo/dashboard"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                onClick={() => handleNavClick("Dashboard")}
              >
                Dashboard
              </Link>
              <Link
                href="/corporate/demo/strategies"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                onClick={() => handleNavClick("Strategies")}
              >
                Strategies
              </Link>
              <Link
                href="/corporate/demo/analytics"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                onClick={() => handleNavClick("Analytics")}
              >
                Analytics
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  Tools
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full z-10 mt-2 w-56 rounded-md bg-slate-800 p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/corporate/demo/risk-assessment"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    onClick={() => handleNavClick("Risk Assessment")}
                  >
                    Risk Assessment
                  </Link>
                  <Link
                    href="/corporate/demo/portfolio-optimization"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    onClick={() => handleNavClick("Portfolio Optimization")}
                  >
                    Portfolio Optimization
                  </Link>
                  <Link
                    href="/corporate/demo/liquidity-forecasting"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    onClick={() => handleNavClick("Liquidity Forecasting")}
                  >
                    Liquidity Forecasting
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex items-center gap-2 border-red-400 text-red-400 hover:bg-red-400/10"
              onClick={() => setIsExitModalOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              <span>Exit Demo</span>
            </Button>

            <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900">
            <div className="container py-4 space-y-4">
              <Link
                href="/corporate/demo/dashboard"
                className="block py-2 text-white hover:text-blue-400 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleNavClick("Dashboard")
                }}
              >
                Dashboard
              </Link>
              <Link
                href="/corporate/demo/strategies"
                className="block py-2 text-white hover:text-blue-400 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleNavClick("Strategies")
                }}
              >
                Strategies
              </Link>
              <Link
                href="/corporate/demo/analytics"
                className="block py-2 text-white hover:text-blue-400 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleNavClick("Analytics")
                }}
              >
                Analytics
              </Link>

              <div className="py-2">
                <p className="font-medium text-white mb-2">Tools</p>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/corporate/demo/risk-assessment"
                    className="block text-sm text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleNavClick("Risk Assessment")
                    }}
                  >
                    Risk Assessment
                  </Link>
                  <Link
                    href="/corporate/demo/portfolio-optimization"
                    className="block text-sm text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleNavClick("Portfolio Optimization")
                    }}
                  >
                    Portfolio Optimization
                  </Link>
                  <Link
                    href="/corporate/demo/liquidity-forecasting"
                    className="block text-sm text-slate-300 hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleNavClick("Liquidity Forecasting")
                    }}
                  >
                    Liquidity Forecasting
                  </Link>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full items-center justify-center gap-2 border-red-400 text-red-400 hover:bg-red-400/10"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsExitModalOpen(true)
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Exit Demo</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      <DemoModeExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={handleExitDemo}
      />
    </>
  )
}
