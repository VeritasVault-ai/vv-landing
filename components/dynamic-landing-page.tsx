"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"
import { LogoFull } from "@/components/ui/logo-full"
import { ThemeToggle } from "@/components/theme-toggle"

export function DynamicLandingPage() {
  const [activeVersion, setActiveVersion] = useState<"standard" | "corporate">("standard")

  // Handle version change
  const handleVersionChange = (version: "standard" | "corporate") => {
    setActiveVersion(version)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Simple Header with Logo and Theme Toggle */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-[#0D1B2A] to-[#1A1A2E] shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <LogoFull className="h-8" width={180} height={40} primaryColor="#3A86FF" secondaryColor="#4ECDC4" />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href="/demo">Launch App</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Version Toggle */}
      <div className="bg-gradient-to-r from-[#0D1B2A]/90 to-[#1A1A2E]/90 backdrop-blur-sm py-2 border-b border-slate-700/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center">
            <div className="bg-slate-800/50 rounded-full p-1 flex shadow-lg">
              <button
                onClick={() => handleVersionChange("standard")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeVersion === "standard"
                    ? "bg-blue-600 text-white shadow-inner"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => handleVersionChange("corporate")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeVersion === "corporate"
                    ? "bg-blue-600 text-white shadow-inner"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Corporate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {activeVersion === "standard"
                ? "AI-Powered Tezos Liquidity Management"
                : "Enterprise Tezos Liquidity Solutions"}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              {activeVersion === "standard"
                ? "Optimize your Tezos liquidity with advanced AI insights and real-time data"
                : "Comprehensive liquidity management solutions for institutional investors and enterprises"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={activeVersion === "standard" ? "/standard/dashboard" : "/corporate/dashboard"}>
                <Button size="lg">
                  {activeVersion === "standard" ? "Go to Dashboard" : "Enterprise Portal"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={activeVersion === "standard" ? "/standard/how-it-works" : "/corporate/solutions"}>
                <Button size="lg" variant="outline">
                  {activeVersion === "standard" ? "Learn More" : "Our Solutions"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {activeVersion === "standard" ? "Powered by Advanced AI" : "Enterprise-Grade Solutions"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              {activeVersion === "standard"
                ? "Our platform leverages cutting-edge neural networks to analyze market trends and optimize your liquidity positions."
                : "Our enterprise solutions provide institutional-grade security, compliance, and performance for your organization."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {activeVersion === "standard" ? "Predictive Analytics" : "Institutional Analytics"}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {activeVersion === "standard"
                    ? "Our neural networks analyze historical data to predict market movements with high accuracy."
                    : "Enterprise-grade analytics with custom reporting and integration with your existing systems."}
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {activeVersion === "standard" ? "Strategy Optimization" : "Corporate Strategy Suite"}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {activeVersion === "standard"
                    ? "Automatically optimize your liquidity positions based on real-time market conditions."
                    : "Custom strategy development and implementation for corporate treasuries and institutional investors."}
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {activeVersion === "standard" ? "Risk Management" : "Enterprise Risk Framework"}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {activeVersion === "standard"
                    ? "Identify and mitigate risks before they impact your portfolio with our advanced risk assessment tools."
                    : "Comprehensive risk management framework with compliance reporting and audit trails for enterprise needs."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              {activeVersion === "standard"
                ? "Ready to Optimize Your Liquidity?"
                : "Ready for Enterprise-Grade Liquidity Management?"}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              {activeVersion === "standard"
                ? "Join our platform today and start maximizing your returns with AI-powered insights."
                : "Contact our enterprise team to discuss your organization's specific needs and requirements."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {activeVersion === "standard" ? (
                <>
                  <Link href="/standard/dashboard">
                    <Button size="lg">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo-mode">
                    <Button size="lg" variant="outline">
                      Try Demo
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/corporate/contact">
                    <Button size="lg">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/corporate/solutions">
                    <Button size="lg" variant="outline">
                      Our Solutions
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
