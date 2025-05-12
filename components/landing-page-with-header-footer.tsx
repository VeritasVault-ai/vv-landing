"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronRight, BarChart3, Shield, Zap, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedHeader } from "@/components/layout/enhanced-header"
import { EnhancedFooter } from "@/components/layout/enhanced-footer"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function LandingPageWithHeaderFooter() {
  // Refs for scroll animations
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <EnhancedHeader />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Neural Network Powered
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Optimize Your Tezos{" "}
                  <span className="bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] bg-clip-text text-transparent">
                    Liquidity
                  </span>{" "}
                  with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Maximize returns and minimize risks with our advanced liquidity management platform built specifically
                  for the Tezos ecosystem.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] hover:from-[#2d7fff] hover:to-[#3dbdb5] text-white border-0"
                  >
                    <Link href="/dashboard" className="flex items-center">
                      Launch App <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    <Link href="/how-it-works" className="flex items-center">
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl border border-muted">
                  <Image
                    src="/liquidity-management-dashboard.png"
                    alt="NeuralLiquid Dashboard Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerful Features for Optimal Liquidity Management
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Our platform combines advanced AI with deep DeFi expertise to provide you with the tools you need to
                succeed.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                title="AI-Powered Analytics"
                description="Neural networks analyze market trends and predict optimal liquidity positions in real-time."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-primary" />}
                title="Risk Management"
                description="Advanced risk assessment tools to minimize impermanent loss and optimize capital efficiency."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-primary" />}
                title="Automated Strategies"
                description="Set up custom strategies that automatically rebalance your positions for optimal returns."
              />
              <FeatureCard
                icon={<Layers className="h-6 w-6 text-primary" />}
                title="Multi-Pool Management"
                description="Manage liquidity across multiple pools and protocols from a single dashboard."
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Optimize Your Liquidity?</h2>
              <p className="mt-4 text-xl text-muted-foreground mb-8">
                Join thousands of liquidity providers who are already using NeuralLiquid to maximize their returns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] hover:from-[#2d7fff] hover:to-[#3dbdb5] text-white border-0"
                >
                  <Link href="/dashboard" className="flex items-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/demo" className="flex items-center">
                    Request Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={fadeIn}>
      <Card className="h-full border-muted bg-background/50 hover:bg-background/80 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
