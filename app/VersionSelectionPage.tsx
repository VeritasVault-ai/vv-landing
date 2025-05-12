"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, User, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggleClient } from "@/components/theme-toggle-client"
import { cn } from "@/lib/utils"

export function VersionSelectionPage() {
  const router = useRouter()
  const [selectedVersion, setSelectedVersion] = useState<"standard" | "corporate" | null>(null)

  const handleVersionSelect = (version: "standard" | "corporate") => {
    setSelectedVersion(version)
  }

  const navigateToVersion = (version: "standard" | "corporate") => {
    router.push(`/${version}`)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a1025] text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0a1025]"></div>
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/10 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="NeuralLiquid Logo" width={36} height={36} className="rounded-full" />
            <span className="text-blue-400 font-semibold text-xl">NeuralLiquid</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleClient />
            <Link href="/auth/login">
              <Button variant="outline" className="border-blue-500/30 text-white hover:bg-blue-500/20">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Choose Your Experience
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Select the interface that best suits your needs for managing Tezos liquidity with our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Version - Blue Card */}
            <Card
              className={cn(
                "p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/10 border",
                selectedVersion === "standard"
                  ? "border-blue-500 ring-2 ring-blue-500/50"
                  : "border-blue-500/20 hover:border-blue-500/50",
                "rounded-lg transition-all duration-300 cursor-pointer h-full",
              )}
              onClick={() => handleVersionSelect("standard")}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-6">
                <User className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-center text-white mb-4">Standard Experience</h2>
              <p className="text-white/70 text-center mb-6">
                Perfect for individual traders and DeFi enthusiasts looking for a streamlined interface with powerful AI
                insights
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Personalized dashboard
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  AI-powered strategy recommendations
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Real-time analytics
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Multi-chain support
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigateToVersion("standard")}>
                Select Standard Version
              </Button>
            </Card>

            {/* Corporate Version - Purple Card */}
            <Card
              className={cn(
                "p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/10 border",
                selectedVersion === "corporate"
                  ? "border-purple-500 ring-2 ring-purple-500/50"
                  : "border-purple-500/20 hover:border-purple-500/50",
                "rounded-lg transition-all duration-300 cursor-pointer h-full",
              )}
              onClick={() => handleVersionSelect("corporate")}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-500/20 mx-auto mb-6">
                <Building2 className="h-8 w-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-center text-white mb-4">Corporate Experience</h2>
              <p className="text-white/70 text-center mb-6">
                Designed for institutional investors and teams with advanced features and comprehensive reporting tools
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Institutional-grade security
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Advanced portfolio optimization
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Compliance and audit features
                </li>
                <li className="flex items-center text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Enterprise API access
                </li>
              </ul>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => navigateToVersion("corporate")}
              >
                Select Corporate Version
              </Button>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            {selectedVersion && (
              <Button
                size="lg"
                onClick={() => navigateToVersion(selectedVersion)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Continue to {selectedVersion === "standard" ? "Standard" : "Corporate"} Experience
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} NeuralLiquid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
