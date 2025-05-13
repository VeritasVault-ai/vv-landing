"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from '@/src/components/ThemeToggle'
import { ArrowRight, Building, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ComparisonTable } from "./ComparisonTable"
import { PricingCard } from "./PricingCard"
import { SupportCard } from "./SupportCard"

export function ComparisonPage() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NeuralLiquid
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Compare Versions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the version that best fits your needs and requirements
            </p>
          </div>

          <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-8">
              <ComparisonTable />
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PricingCard
                  title="Standard"
                  icon={<User className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                  description="For individual investors and traders"
                  price="$49"
                  period="per month"
                  features={[
                    "AI-powered liquidity optimization",
                    "Real-time market analytics",
                    "Automated risk management",
                    "Community support",
                    "Up to 5 active strategies",
                  ]}
                  buttonText="Get Started"
                  buttonLink="/standard"
                  color="blue"
                />

                <PricingCard
                  title="Corporate"
                  icon={<Building className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                  description="For institutions and corporate treasuries"
                  price="Custom"
                  period="contact for pricing"
                  features={[
                    "Enterprise-grade liquidity optimization",
                    "Advanced analytics & reporting",
                    "Institutional risk framework",
                    "Dedicated account management",
                    "Multi-chain support",
                    "Custom integrations",
                    "Compliance reporting",
                    "Unlimited strategies",
                  ]}
                  buttonText="Contact Sales"
                  buttonLink="/corporate"
                  color="indigo"
                />
              </div>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SupportCard
                  title="Standard Support"
                  icon={<User className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                  features={[
                    { name: "Community forum access", included: true },
                    { name: "Email support", included: true },
                    { name: "Response time", value: "Within 48 hours", included: false  },
                    { name: "Live chat support", included: false },
                    { name: "Phone support", included: false },
                    { name: "Dedicated account manager", included: false },
                  ]}
                  color="blue"
                />

                <SupportCard
                  title="Corporate Support"
                  icon={<Building className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                  features={[
                    { name: "Community forum access", included: true },
                    { name: "Email support", included: true },
                    { name: "Response time", value: "Within 4 hours", included: true  },
                    { name: "Live chat support", included: true },
                    { name: "Phone support", included: true },
                    { name: "Dedicated account manager", included: true },
                  ]}
                  color="indigo"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/standard">
                  Explore Standard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/corporate">
                  Explore Corporate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NeuralLiquid. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}