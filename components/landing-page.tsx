"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  STANDARD_PRODUCT_DESCRIPTION,
  STANDARD_PRODUCT_NAME,
  STANDARD_PRODUCT_TAGLINE
} from "@/lib/config/product-info"
import { ArrowRight, HelpCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function LandingPage() {
  const [email, setEmail] = useState("")
  const [liquidity, setLiquidity] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isGraphLoaded, setIsGraphLoaded] = useState(false)

  // Check if device is mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  // Lazy load graph when user scrolls to it
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGraphLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const graphSection = document.getElementById("graph-section")
    if (graphSection) {
      observer.observe(graphSection)
    }

    return () => {
      if (graphSection) {
        observer.unobserve(graphSection)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate a submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        {/* Theme toggle in the top right */}

        {/* Hero Section - Simplified with ONE primary CTA */}
        <section
          id="hero-section"
          className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0a1025] to-[#0d1631]"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
                >
                  {STANDARD_PRODUCT_TAGLINE}
                </h1>
                <p className="text-xl text-white mb-8 max-w-2xl mx-auto lg:mx-0">
                  {STANDARD_PRODUCT_DESCRIPTION}
                </p>

                {/* SINGLE PRIMARY CTA */}
                <div className="flex justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    asChild
                  >
                    <Link href="/demo-mode">
                      Try Interactive Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/dashboard-preview.png"
                    alt={`${STANDARD_PRODUCT_NAME} Dashboard showing liquidity pool analytics and optimization recommendations`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - VISUALLY DISTINCT with lighter background */}
        <section id="features-section" className="py-16 md:py-24 bg-[#101a40]" aria-labelledby="features-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Powered by Advanced AI
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Our platform leverages cutting-edge neural networks to analyze market trends and optimize your liquidity
                positions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#0a1025]/80 p-6 rounded-lg border border-blue-500/20 shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Predictive Analytics</h3>
                <div className="flex items-start mb-2">
                  <p className="text-white/90">
                    Our LSTM
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center ml-1 text-blue-400 cursor-help">
                          neural networks
                          <HelpCircle className="h-4 w-4 ml-0.5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Long Short-Term Memory networks are advanced AI models that excel at learning patterns in
                          sequential data like market prices.
                        </p>
                      </TooltipContent>
                    </Tooltip>{" "}
                    analyze historical data to predict market movements with high accuracy.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#0a1025]/80 p-6 rounded-lg border border-purple-500/20 shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Strategy Optimization</h3>
                <div className="flex items-start mb-2">
                  <p className="text-white/90">
                    Automatically optimize your positions to minimize
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center ml-1 text-blue-400 cursor-help">
                          impermanent loss
                          <HelpCircle className="h-4 w-4 ml-0.5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          The temporary loss of funds liquidity providers experience due to price volatility in a
                          trading pair.
                        </p>
                      </TooltipContent>
                    </Tooltip>{" "}
                    based on real-time market conditions.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#0a1025]/80 p-6 rounded-lg border border-teal-500/20 shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Risk Management</h3>
                <p className="text-white/90">
                  Identify and mitigate risks before they impact your portfolio with our advanced risk assessment tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section - VISUALLY DISTINCT with gradient background */}
        <section
          id="results-section"
          className="py-16 md:py-24 bg-gradient-to-b from-[#0d1631] to-[#0a1025]"
          aria-labelledby="results-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="results-heading" className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Real Results
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Our users have seen significant improvements in their liquidity management strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stat 1 */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 shadow-lg">
                <p className="text-5xl font-bold text-blue-400 mb-2">+27%</p>
                <p className="text-lg font-medium text-white">Average ROI Increase</p>
                <p className="text-white/70 mt-2 text-sm">Compared to traditional liquidity management strategies</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-8 rounded-lg border border-purple-500/20 shadow-lg">
                <p className="text-5xl font-bold text-purple-400 mb-2">-35%</p>
                <p className="text-lg font-medium text-white">Risk Reduction</p>
                <p className="text-white/70 mt-2 text-sm">Lower volatility and improved risk-adjusted returns</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/10 p-8 rounded-lg border border-teal-500/20 shadow-lg">
                <p className="text-5xl font-bold text-teal-400 mb-2">92%</p>
                <p className="text-lg font-medium text-white">User Satisfaction</p>
                <p className="text-white/70 mt-2 text-sm">Based on feedback from our early access users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Graph Section - Lazy loaded for performance */}
        <section id="graph-section" className="py-16 md:py-24 bg-[#101a40]" aria-labelledby="graph-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="graph-heading" className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Advanced Analytics
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Visualize your liquidity performance and identify optimization opportunities.
              </p>
            </div>

            <div className="bg-[#0a1025]/80 p-4 md:p-6 rounded-lg border border-blue-500/20 shadow-lg">
              {isGraphLoaded ? (
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/analytics-preview.png"
                    alt="Interactive analytics dashboard showing liquidity pool performance metrics, yield comparisons, and optimization recommendations"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-[#0a1025] rounded-lg flex items-center justify-center">
                  <p className="text-white/50">Loading analytics visualization...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section - SIMPLIFIED FORM */}
        <section
          id="cta-section"
          className="py-16 md:py-24 bg-gradient-to-b from-[#0a1025] to-[#0d1631]"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Get Early Access
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Join our alpha program and be among the first to optimize your liquidity with AI.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 shadow-lg text-center">
                  <svg
                    className="h-16 w-16 text-green-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl font-semibold mb-2 text-white">You're In!</h3>
                  <p className="text-white/90 mb-4">
                    You've secured your spot in the Alpha. We'll be in touch within 48 hours with your exclusive
                    access details.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 shadow-lg"
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a1025]/80 border border-blue-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label htmlFor="liquidity" className="block text-white font-medium mb-2 flex items-center">
                        How much liquidity do you manage?
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-1 text-blue-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This helps us personalize your onboarding experience</p>
                          </TooltipContent>
                        </Tooltip>
                      </label>
                      <select
                        id="liquidity"
                        value={liquidity}
                        onChange={(e) => setLiquidity(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a1025]/80 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        aria-describedby="liquidity-description"
                      >
                        <option value="" disabled selected>
                          Select a range
                        </option>
                        <option value="<10k">Less than $10,000</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-250k">$50,000 - $250,000</option>
                        <option value="250k-1m">$250,000 - $1,000,000</option>
                        <option value=">1m">More than $1,000,000</option>
                        <option value="prefer-not-say">Prefer not to say</option>
                      </select>
                      <p id="liquidity-description" className="text-white/50 text-sm mt-1">
                        Select a range that best describes your liquidity
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Get Early Access"}
                    </Button>
                  </div>

                  <p className="text-white/50 text-xs text-center mt-4">
                    We respect your privacy. Your information will only be used to notify you about {STANDARD_PRODUCT_NAME}'s
                    launch and early access opportunities.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer with minimal secondary CTAs */}
        <footer className="py-12 bg-[#0a1025] border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <p className="text-white/90 font-semibold text-lg">{STANDARD_PRODUCT_NAME}</p>
                <p className="text-white/50 text-sm">{STANDARD_PRODUCT_TAGLINE}</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="/demo-mode" className="text-white/70 hover:text-white transition-colors">
                  Demo
                </Link>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">© {new Date().getFullYear()} {STANDARD_PRODUCT_NAME}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}