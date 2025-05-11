"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, X, HelpCircle, ArrowRight, Building, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"

export default function VersionComparisonPage() {
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
                    { name: "Response time", value: "Within 48 hours" },
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
                    { name: "Response time", value: "Within 4 hours" },
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

function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-border"></th>
            <th className="p-4 border-b border-border">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-lg">Standard</span>
              </div>
            </th>
            <th className="p-4 border-b border-border">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2">
                  <Building className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-bold text-lg">Corporate</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <FeatureCategory title="Core Features" />
          <FeatureRow
            feature="AI-powered liquidity optimization"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Optimize liquidity positions using advanced AI algorithms"
          />
          <FeatureRow
            feature="Real-time market analytics"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Access real-time data and analytics on market conditions"
          />
          <FeatureRow
            feature="Automated risk management"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Automated tools to manage and mitigate risks"
          />
          <FeatureRow
            feature="Multi-chain support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Support for multiple blockchain networks"
          />

          <FeatureCategory title="Analytics & Reporting" />
          <FeatureRow
            feature="Basic analytics dashboard"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Standard analytics dashboard with key metrics"
          />
          <FeatureRow
            feature="Advanced analytics"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="In-depth analytics with custom metrics and visualizations"
          />
          <FeatureRow
            feature="Custom reports"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Generate custom reports for specific needs"
          />
          <FeatureRow
            feature="Export capabilities"
            standardIncluded="Limited"
            corporateIncluded={true}
            tooltip="Export data and reports in various formats"
          />

          <FeatureCategory title="Strategy Management" />
          <FeatureRow
            feature="Strategy creation"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Create custom liquidity strategies"
          />
          <FeatureRow
            feature="AI strategy recommendations"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Get AI-powered strategy recommendations"
          />
          <FeatureRow
            feature="Strategy templates"
            standardIncluded="5 templates"
            corporateIncluded="Unlimited"
            tooltip="Pre-built strategy templates"
          />
          <FeatureRow
            feature="Backtesting"
            standardIncluded="Basic"
            corporateIncluded="Advanced"
            tooltip="Test strategies against historical data"
          />
          <FeatureRow
            feature="Active strategies"
            standardIncluded="Up to 5"
            corporateIncluded="Unlimited"
            tooltip="Number of strategies that can be active simultaneously"
          />

          <FeatureCategory title="Security & Compliance" />
          <FeatureRow
            feature="Two-factor authentication"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Secure your account with 2FA"
          />
          <FeatureRow
            feature="Role-based access control"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Define user roles and permissions"
          />
          <FeatureRow
            feature="Audit logs"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Track all actions and changes"
          />
          <FeatureRow
            feature="Compliance reporting"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Generate reports for regulatory compliance"
          />

          <FeatureCategory title="Support" />
          <FeatureRow
            feature="Community support"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Access to community forums and resources"
          />
          <FeatureRow
            feature="Email support"
            standardIncluded="48 hours"
            corporateIncluded="4 hours"
            tooltip="Response time for email support"
          />
          <FeatureRow
            feature="Live chat support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Real-time chat support"
          />
          <FeatureRow
            feature="Phone support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Direct phone support"
          />
          <FeatureRow
            feature="Dedicated account manager"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Personal account manager for your organization"
          />
        </tbody>
      </table>
    </div>
  )
}

function FeatureCategory({ title }: { title: string }) {
  return (
    <tr>
      <td colSpan={3} className="p-4 bg-slate-50 dark:bg-slate-800/50 font-medium">
        {title}
      </td>
    </tr>
  )
}

function FeatureRow({
  feature,
  standardIncluded,
  corporateIncluded,
  tooltip,
}: {
  feature: string
  standardIncluded: boolean | string
  corporateIncluded: boolean | string
  tooltip: string
}) {
  return (
    <tr className="border-b border-border/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
      <td className="p-4 text-left">
        <div className="flex items-center">
          <span>{feature}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
      <td className="p-4 text-center">
        {typeof standardIncluded === "boolean" ? (
          standardIncluded ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-500 mx-auto" />
          )
        ) : (
          <span className="text-sm">{standardIncluded}</span>
        )}
      </td>
      <td className="p-4 text-center">
        {typeof corporateIncluded === "boolean" ? (
          corporateIncluded ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-500 mx-auto" />
          )
        ) : (
          <span className="text-sm">{corporateIncluded}</span>
        )}
      </td>
    </tr>
  )
}

function PricingCard({
  title,
  icon,
  description,
  price,
  period,
  features,
  buttonText,
  buttonLink,
  color,
}: {
  title: string
  icon: React.ReactNode
  description: string
  price: string
  period: string
  features: string[]
  buttonText: string
  buttonLink: string
  color: "blue" | "indigo"
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-2 transition-all duration-300",
        color === "blue" ? "border-blue-200 dark:border-blue-900" : "border-indigo-200 dark:border-indigo-900",
      )}
    >
      <div
        className={cn(
          "p-6",
          color === "blue" ? "bg-blue-50 dark:bg-blue-950/30" : "bg-indigo-50 dark:bg-indigo-950/30",
        )}
      >
        <div className="flex items-center mb-4">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center mr-3",
              color === "blue" ? "bg-blue-100 dark:bg-blue-900/50" : "bg-indigo-100 dark:bg-indigo-900/50",
            )}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="ml-2 text-muted-foreground">{period}</span>
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={cn("h-5 w-5 mr-3 flex-shrink-0", color === "blue" ? "text-blue-500" : "text-indigo-500")}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={cn(
            "w-full",
            color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700",
          )}
        >
          <Link href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function SupportCard({
  title,
  icon,
  features,
  color,
}: {
  title: string
  icon: React.ReactNode
  features: { name: string; included: boolean; value?: string }[]
  color: "blue" | "indigo"
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-2 transition-all duration-300",
        color === "blue" ? "border-blue-200 dark:border-blue-900" : "border-indigo-200 dark:border-indigo-900",
      )}
    >
      <div
        className={cn(
          "p-6",
          color === "blue" ? "bg-blue-50 dark:bg-blue-950/30" : "bg-indigo-50 dark:bg-indigo-950/30",
        )}
      >
        <div className="flex items-center">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center mr-3",
              color === "blue" ? "bg-blue-100 dark:bg-blue-900/50" : "bg-indigo-100 dark:bg-indigo-900/50",
            )}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{feature.name}</span>
              <div>
                {feature.included ? (
                  feature.value ? (
                    <span className={cn("text-sm font-medium", color === "blue" ? "text-blue-600" : "text-indigo-600")}>
                      {feature.value}
                    </span>
                  ) : (
                    <Check className={cn("h-5 w-5", color === "blue" ? "text-blue-500" : "text-indigo-500")} />
                  )
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
