"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Zap, Shield, TrendingUp, Layers, Code } from "lucide-react"
import { FeatureClickableCard } from "./ui/feature-clickable-card"
import { StandaloneThemeToggle } from "./ui/standalone-theme-toggle"
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

export function StandardLandingPageEnhanced() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.classList.add("standard-version")

    return () => {
      document.body.classList.remove("standard-version")
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="standard-version min-h-screen">
      {/* Header */}
      <header className="border-b border-standard-surface/10 backdrop-blur-md bg-standard-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-standard-primary flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-bold text-lg">TezosLiquidity</span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/standard/features"
                className="text-standard-text hover:text-standard-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/standard/pricing"
                className="text-standard-text hover:text-standard-primary transition-colors"
              >
                Pricing
              </Link>
              <Link href="/standard/docs" className="text-standard-text hover:text-standard-primary transition-colors">
                Documentation
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <StandaloneThemeToggle />
              <Link href="/standard/login" className="text-standard-text hover:text-standard-primary transition-colors">
                Login
              </Link>
              <Link href="/standard/demo" className="btn-primary inline-flex items-center">
                Try Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="gradient-text">Optimize</span> Your Tezos Liquidity Management
              </h1>
              <p className="text-lg text-standard-muted">
                AI-powered tools to maximize returns and minimize impermanent loss across DeFi protocols.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/standard/demo" className="btn-primary inline-flex items-center justify-center">
                  Try Interactive Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/standard/docs" className="btn-secondary inline-flex items-center justify-center">
                  View Documentation
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-standard-muted text-sm">
                <Shield className="h-4 w-4" />
                <span>Enterprise-grade security with real-time monitoring</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-standard-primary/20 to-standard-secondary/20 rounded-lg blur-xl"></div>
              <div className="relative bg-standard-surface rounded-lg overflow-hidden border border-standard-surface/20 shadow-lg">
                <Image
                  src="/dashboard-preview.png"
                  alt="Tezos Liquidity Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-standard-muted max-w-2xl mx-auto">
              Our platform provides everything you need to optimize your liquidity management strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureClickableCard
              title="AI-Powered Analytics"
              description="Neural networks analyze market conditions to predict optimal liquidity allocation strategies."
              icon={<BarChart3 className="h-5 w-5" />}
              href="/standard/features/analytics"
            />

            <FeatureClickableCard
              title="Flash Loan Integration"
              description="Seamlessly execute complex strategies using flash loans across multiple protocols."
              icon={<Zap className="h-5 w-5" />}
              href="/standard/features/flash-loans"
            />

            <FeatureClickableCard
              title="Risk Assessment"
              description="Real-time risk evaluation and impermanent loss protection strategies."
              icon={<Shield className="h-5 w-5" />}
              href="/standard/features/risk"
            />

            <FeatureClickableCard
              title="Performance Tracking"
              description="Track your strategy performance with detailed metrics and visualizations."
              icon={<TrendingUp className="h-5 w-5" />}
              href="/standard/features/performance"
            />

            <FeatureClickableCard
              title="Multi-Chain Support"
              description="Manage liquidity across Tezos, Ethereum, and other compatible blockchains."
              icon={<Layers className="h-5 w-5" />}
              href="/standard/features/multi-chain"
            />

            <FeatureClickableCard
              title="Developer API"
              description="Integrate our tools directly into your applications with our comprehensive API."
              icon={<Code className="h-5 w-5" />}
              href="/standard/features/api"
            />
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-standard-surface rounded-lg overflow-hidden border border-standard-surface/20 shadow-lg">
                <Image
                  src="/analytics-preview.png"
                  alt="Advanced Analytics Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold">Advanced Analytics</h2>
              <p className="text-standard-muted">
                Our platform provides deep insights into market trends, protocol performance, and optimization
                opportunities.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time data from multiple DeFi protocols",
                  "AI-powered trend analysis and predictions",
                  "Custom alerts and notifications",
                  "Historical performance comparisons",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-standard-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/standard/features/analytics" className="btn-primary inline-flex items-center">
                Explore Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Builder Section */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Strategy Builder</h2>
              <p className="text-standard-muted">
                Create, test, and deploy custom liquidity management strategies with our intuitive builder.
              </p>
              <ul className="space-y-3">
                {[
                  "Drag-and-drop strategy components",
                  "Backtest against historical data",
                  "Simulate market conditions",
                  "One-click deployment to production",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-standard-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/standard/features/strategy-builder" className="btn-primary inline-flex items-center">
                Build Your Strategy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div>
              <div className="bg-standard-surface rounded-lg overflow-hidden border border-standard-surface/20 shadow-lg">
                <Image
                  src="/strategy-preview.png"
                  alt="Strategy Builder Interface"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Leading Institutions Section (Example - Adjust Placement as Needed) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Institutions</h2>
            <p className="text-standard-muted max-w-2xl mx-auto mb-8">
              We partner with top financial institutions to provide secure and reliable liquidity management solutions.
            </p>
            <ThemeAwareImage
              lightSrc="/trusted-institutions-light.png"
              darkSrc="/trusted-institutions-dark.png"
              alt="Trusted by leading financial institutions"
              width={900}
              height={100}
              className="max-w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-standard-primary to-standard-secondary rounded-lg p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to optimize your liquidity?</h2>
              <p className="text-white/80 mb-8">
                Join thousands of DeFi users who are maximizing their returns with our platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/standard/demo"
                  className="bg-white text-standard-primary font-medium py-3 px-6 rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
                >
                  Try Interactive Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/standard/register"
                  className="bg-white/20 text-white font-medium py-3 px-6 rounded-md hover:bg-white/30 transition-colors inline-flex items-center justify-center"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-standard-surface py-12 border-t border-standard-surface/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Documentation", "API"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/standard/${item.toLowerCase()}`}
                      className="text-standard-muted hover:text-standard-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/standard/${item.toLowerCase()}`}
                      className="text-standard-muted hover:text-standard-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Guides", "Tutorials", "Webinars", "Support"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/standard/${item.toLowerCase()}`}
                      className="text-standard-muted hover:text-standard-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Security", "Compliance"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/standard/${item.toLowerCase()}`}
                      className="text-standard-muted hover:text-standard-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-standard-surface/10 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-standard-primary flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="font-bold">TezosLiquidity</span>
            </div>

            <div className="text-standard-muted text-sm">
              © {new Date().getFullYear()} TezosLiquidity. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
