"use client"

import { CorporateFooter } from "@/components/layout/corporate-footer"
import { CorporateHeader } from "@/components/layout/corporate-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building2, CheckCircle, ChevronRight, FileText, Shield } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CorporateLandingPageEnhanced() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Corporate Header with VeritasVault branding */}
      <CorporateHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-950">
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="mb-6">
                <Image 
                  src="/veritas-vault-logo.png" 
                  alt="VeritasVault Logo" 
                  width={240} 
                  height={80} 
                  className="h-auto mb-4"
                />
              </div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-blue-900 md:text-5xl lg:text-6xl dark:text-blue-100">
                <span className="block mt-2 text-3xl font-bold text-slate-700 md:text-4xl dark:text-slate-300">
                  Enterprise Liquidity Management
                </span>
              </h1>
              <p className="max-w-lg mb-8 text-lg text-slate-600 dark:text-slate-400">
                Institutional-grade DeFi liquidity management platform with advanced security, compliance, and analytics
                for financial institutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Request Early Access
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-700 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950"
                >
                  View Documentation
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="p-2 bg-white rounded-lg shadow-xl dark:bg-slate-800">
                <Image
                  src="/liquidity-dashboard.png"
                  alt="VeritasVault Dashboard"
                  width={600}
                  height={400}
                  className="rounded-md"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-700 dark:bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Innovative Enterprise Solution</p>
                <p className="text-xs opacity-80">Early Access Program Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features Section - Replacing "Trusted By" */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-xl font-semibold text-center text-slate-600 dark:text-slate-400">
            Designed for enterprise adoption
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            {["Institutional Security", "Regulatory Readiness", "Enterprise Integration"].map((feature) => (
              <div key={feature} className="flex items-center justify-center">
                <div className="px-4 py-2 text-lg font-bold text-slate-600 dark:text-slate-400">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Enterprise-Grade DeFi Management
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              VeritasVault provides institutional investors with secure, compliant, and efficient access to DeFi
              liquidity markets.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-12 md:grid-cols-4">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="compliance"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
              >
                Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    icon: <Building2 className="w-10 h-10 text-blue-700 dark:text-blue-500" />,
                    title: "Institutional Access",
                    description:
                      "Secure, regulated access to DeFi markets designed specifically for financial institutions.",
                  },
                  {
                    icon: <BarChart3 className="w-10 h-10 text-blue-700 dark:text-blue-500" />,
                    title: "Advanced Analytics",
                    description: "Real-time data analysis and reporting for optimal liquidity management decisions.",
                  },
                  {
                    icon: <Shield className="w-10 h-10 text-blue-700 dark:text-blue-500" />,
                    title: "Enterprise Security",
                    description: "Bank-grade security protocols with multi-signature authorization and audit trails.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="overflow-hidden border-0 shadow-lg dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="p-6 mt-8 bg-blue-50 rounded-xl dark:bg-blue-950">
                <h3 className="mb-4 text-xl font-bold text-blue-900 dark:text-blue-300">
                  Complete Liquidity Management Suite
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Multi-chain portfolio management",
                    "Automated yield optimization",
                    "Risk assessment and mitigation",
                    "Regulatory compliance tools",
                    "Custom reporting dashboards",
                    "API integration capabilities",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Bank-Grade Security</h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    VeritasVault implements the highest security standards to protect institutional assets with
                    multiple layers of protection.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Multi-signature transaction approval",
                      "Hardware security module integration",
                      "24/7 security monitoring",
                      "Regular penetration testing",
                      "Cold storage options for critical assets",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-500" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800">
                  <h4 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Security Framework</h4>
                  <div className="space-y-4">
                    {[
                      { name: "End-to-end Encryption", status: "Implemented" },
                      { name: "Secure Key Management", status: "Implemented" },
                      { name: "Role-based Access Control", status: "Implemented" },
                      { name: "Audit Logging", status: "Implemented" },
                      { name: "Penetration Testing", status: "In Progress" },
                    ].map((cert, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700"
                      >
                        <span className="font-medium text-slate-700 dark:text-slate-300">{cert.name}</span>
                        <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-200">
                          {cert.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                    Advanced Analytics Platform
                  </h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Make data-driven decisions with our comprehensive analytics suite designed for institutional
                    investors.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Real-time market data analysis",
                      "Historical performance tracking",
                      "Risk exposure visualization",
                      "Custom reporting capabilities",
                      "Predictive analytics with AI",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-500" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/analytics-preview.png"
                    alt="Analytics Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Regulatory Compliance</h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Stay compliant with global financial regulations while accessing DeFi opportunities.
                  </p>
                  <div className="space-y-4">
                    {[
                      "AML/KYC integration",
                      "Automated compliance reporting",
                      "Transaction monitoring",
                      "Audit trail for all activities",
                      "Regulatory updates and adaptations",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-500" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800">
                  <h4 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Compliance Framework</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="mb-2 font-medium text-slate-800 dark:text-slate-200">
                        Global Regulatory Coverage
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {["SEC", "FCA", "MAS", "FINMA", "ASIC", "BaFin"].map((reg) => (
                          <span
                            key={reg}
                            className="px-2 py-1 text-xs font-medium bg-slate-200 rounded dark:bg-slate-700 dark:text-slate-300"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-2 font-medium text-slate-800 dark:text-slate-200">Compliance Documentation</h5>
                      <ul className="space-y-2">
                        {[
                          "Regulatory filings templates",
                          "Compliance policy generator",
                          "Risk assessment documentation",
                          "Audit-ready reporting",
                        ].map((doc, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-700 dark:text-blue-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Potential Outcomes Section - Replacing Case Studies */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Potential Outcomes</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              See how VeritasVault can transform institutional liquidity management for your organization.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                company: "Treasury Operations",
                title: "Yield Optimization",
                description:
                  "Potential to increase yield by 20-30% while maintaining strong security and compliance controls.",
                result: "+25% Yield",
              },
              {
                company: "Operations",
                title: "Streamlined Workflows",
                description: "Reduce operational overhead through automation and integrated compliance tools.",
                result: "-40% Overhead",
              },
              {
                company: "Liquidity Management",
                title: "Enhanced Capital Efficiency",
                description: "Improve capital efficiency through intelligent liquidity allocation strategies.",
                result: "+20% Efficiency",
              },
            ].map((study, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="mb-4 text-sm font-medium text-blue-700 dark:text-blue-400">{study.company}</div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{study.title}</h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{study.result}</div>
                    <Button variant="ghost" className="text-blue-700 dark:text-blue-400">
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated for POC */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Be among the first to experience VeritasVault
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Join our early access program and help shape the future of institutional liquidity management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-slate-200 dark:text-blue-800"
              >
                Request Early Access
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                Learn About Our Roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer with VeritasVault branding */}
      <CorporateFooter />
    </div>
  )
}