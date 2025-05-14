"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrentVersion } from "@/hooks/use-current-version"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import {
  CORPORATE_PRODUCT_NAME,
  CORPORATE_PRODUCT_TAGLINE
} from "@/lib/config/product-info"
import { ArrowRight, BarChart3, CheckCircle, Lock, Shield, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function EnhancedCorporateLanding() {
  const { version } = useCurrentVersion()
  const [activeTab, setActiveTab] = useState("overview")

  const handleDemoClick = () => {
    trackNavigationEvent({
      destination: `/${version}/demo`,
      source: "corporate-landing",
      element: "demo-button",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  <span className="text-blue-300">{CORPORATE_PRODUCT_NAME}</span>
                  <span className="text-blue-200">.ai</span>
                </h1>
                <p className="max-w-[600px] text-slate-200 md:text-xl">
                  {CORPORATE_PRODUCT_TAGLINE}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" onClick={handleDemoClick} asChild>
                  <Link href={`/${version}/demo`}>
                    Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-2xl border border-blue-700/30">
                <Image
                  src="/advanced-analytics-predictive-dashboard.png"
                  alt={`${CORPORATE_PRODUCT_NAME} Dashboard`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-xl font-medium text-slate-600">Trusted by leading financial institutions</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
              <div className="flex items-center justify-center">
                <div className="h-8 w-32 bg-slate-300 rounded-md flex items-center justify-center text-slate-600 font-semibold">
                  BANK ONE
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 w-32 bg-slate-300 rounded-md flex items-center justify-center text-slate-600 font-semibold">
                  CAPITAL FIN
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 w-32 bg-slate-300 rounded-md flex items-center justify-center text-slate-600 font-semibold">
                  INVEST CO
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 w-32 bg-slate-300 rounded-md flex items-center justify-center text-slate-600 font-semibold">
                  GLOBAL ASSET
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
              Enterprise Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
              Institutional-Grade Solutions
            </h2>
            <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed">
              {CORPORATE_PRODUCT_NAME} provides comprehensive tools designed specifically for institutional investors and
              financial organizations.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="overview" className={activeTab === "overview" ? "bg-blue-600 text-white" : ""}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="security" className={activeTab === "security" ? "bg-blue-600 text-white" : ""}>
                  Security
                </TabsTrigger>
                <TabsTrigger value="analytics" className={activeTab === "analytics" ? "bg-blue-600 text-white" : ""}>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="compliance" className={activeTab === "compliance" ? "bg-blue-600 text-white" : ""}>
                  Compliance
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Advanced Portfolio Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Sophisticated tools for managing complex institutional portfolios across multiple liquidity pools
                      and DeFi protocols.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Risk Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Comprehensive risk assessment tools with real-time monitoring and predictive analytics for
                      institutional risk management.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Multi-User Access Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Role-based access control with customizable permissions for different team members and
                      departments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <Lock className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Enterprise-Grade Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Bank-level encryption, multi-factor authentication, and secure key management systems to protect
                      institutional assets.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <Shield className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Audit Trails</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Comprehensive logging and audit trails for all transactions and user actions to ensure
                      accountability and compliance.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CheckCircle className="h-6 w-6 text-blue-600 mb-2" />
                    <CardTitle>Regulatory Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Built-in compliance tools to help meet regulatory requirements for institutional investors in the
                      DeFi space.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle>Institutional Analytics Dashboard</CardTitle>
                    <CardDescription>Comprehensive analytics tailored for institutional investors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Real-time market data and liquidity pool analytics</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Custom reporting and data export capabilities</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Historical performance analysis and benchmarking</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>AI-powered market insights and recommendations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video">
                  <Image src="/analytics-preview.png" alt="Analytics Dashboard" fill className="object-cover" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video">
                  <Image src="/strategy-preview.png" alt="Compliance Dashboard" fill className="object-cover" />
                </div>
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle>Compliance & Reporting</CardTitle>
                    <CardDescription>Comprehensive compliance tools for institutional requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Automated regulatory reporting</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Transaction monitoring and risk flagging</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>KYC/AML integration capabilities</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Customizable compliance rule engine</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">Success Stories</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
              Trusted by Leading Financial Institutions
            </h2>
            <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed">
              See how top financial organizations are leveraging {CORPORATE_PRODUCT_NAME} to optimize their liquidity management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-8 w-24 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-semibold mb-2">
                  BANK ONE
                </div>
                <CardTitle>30% Increase in Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  "{CORPORATE_PRODUCT_NAME} has transformed our approach to liquidity management, resulting in a 30% increase in
                  yield while maintaining our risk parameters."
                </p>
                <p className="text-sm text-slate-500">- Chief Investment Officer, Major Commercial Bank</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-8 w-24 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-semibold mb-2">
                  INVEST CO
                </div>
                <CardTitle>Streamlined Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  "The platform's automation capabilities have reduced our operational overhead by 40% while improving
                  our compliance reporting accuracy."
                </p>
                <p className="text-sm text-slate-500">- Head of Operations, Investment Management Firm</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardHeader>
                <div className="h-8 w-24 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-semibold mb-2">
                  GLOBAL ASSET
                </div>
                <CardTitle>Enhanced Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  "{CORPORATE_PRODUCT_NAME}'s predictive analytics have helped us identify and mitigate potential risks before
                  they impact our portfolio performance."
                </p>
                <p className="text-sm text-slate-500">- Risk Director, Global Asset Management</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to optimize your institutional liquidity?
              </h2>
              <p className="max-w-[700px] text-slate-200 md:text-xl/relaxed mx-auto">
                Schedule a personalized demo with our enterprise solutions team today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" onClick={handleDemoClick} asChild>
                <Link href={`/${version}/demo`}>
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}