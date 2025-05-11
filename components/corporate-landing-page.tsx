"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart2,
  Shield,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Building2,
  Globe,
  TrendingUp,
  Lock,
} from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

export function CorporateLandingPage() {
  const [activeTab, setActiveTab] = useState("treasury")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    trackNavigationEvent({
      feature_name: "corporate_landing_tabs",
      tab_destination: tab,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium text-sm mb-4">
                Institutional-Grade Liquidity Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                <span className="text-blue-700 dark:text-blue-400">VeritasVault</span>.ai
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-xl">
                Enterprise Treasury Solutions for Digital Assets
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">
                Optimize your institution's digital asset strategy with advanced portfolio theory and formal
                verification. Built for enterprise treasuries and financial institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                  onClick={() =>
                    trackNavigationEvent({ feature_name: "corporate_cta", button_text: "Schedule Consultation" })
                  }
                >
                  Schedule Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() =>
                    trackNavigationEvent({ feature_name: "corporate_cta", button_text: "View Case Studies" })
                  }
                >
                  View Case Studies
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">ISO 27001 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">GDPR Compliant</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg blur-xl"></div>
                <Image
                  src="/advanced-analytics-predictive-dashboard.png"
                  alt="Institutional dashboard"
                  width={600}
                  height={400}
                  className="relative rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-700 dark:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="font-semibold">Trusted by leading institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Badges Section */}
      <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">European Investment Bank</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">French Treasury</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Swiss National Bank</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Institutional-Grade Digital Asset Management
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              VeritasVault.ai combines traditional finance principles with blockchain technology to deliver secure,
              compliant, and optimized treasury management solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Security & Compliance</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Enterprise-grade security with formal verification, multi-signature controls, and comprehensive audit
                  trails.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Optimized Returns</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced portfolio theory and Black-Litterman model to maximize risk-adjusted returns across digital
                  assets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Global Compliance</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Built to meet regulatory requirements across jurisdictions with comprehensive reporting and controls.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Enterprise Solutions</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive liquidity management solutions designed for institutional requirements
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={activeTab === "treasury" ? "default" : "outline"}
              onClick={() => handleTabClick("treasury")}
              className={
                activeTab === "treasury"
                  ? "bg-blue-700 dark:bg-blue-600 text-white"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Treasury Management
            </Button>
            <Button
              variant={activeTab === "portfolio" ? "default" : "outline"}
              onClick={() => handleTabClick("portfolio")}
              className={
                activeTab === "portfolio"
                  ? "bg-blue-700 dark:bg-blue-600 text-white"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Portfolio Optimization
            </Button>
            <Button
              variant={activeTab === "risk" ? "default" : "outline"}
              onClick={() => handleTabClick("risk")}
              className={
                activeTab === "risk"
                  ? "bg-blue-700 dark:bg-blue-600 text-white"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }
            >
              <Shield className="h-4 w-4 mr-2" />
              Risk Management
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {activeTab === "treasury" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Institutional Treasury Management
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Optimize your institution's digital asset treasury with advanced portfolio theory and formal
                    verification. Our solutions provide comprehensive oversight, risk management, and yield
                    optimization.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Black-Litterman model for optimal asset allocation",
                      "Formal verification of smart contract interactions",
                      "Automated rebalancing with institutional controls",
                      "Comprehensive audit trails and compliance reporting",
                      "Multi-signature governance and approval workflows",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {activeTab === "portfolio" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Portfolio Optimization</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Leverage sophisticated mathematical models to optimize your digital asset portfolio across multiple
                    protocols and chains, maximizing risk-adjusted returns.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Multi-factor optimization models",
                      "Cross-chain yield comparison and allocation",
                      "Scenario analysis and stress testing",
                      "Custom constraints and institutional mandates",
                      "Automated rebalancing with threshold controls",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {activeTab === "risk" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enterprise Risk Management</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Comprehensive risk assessment and management tools designed specifically for institutional digital
                    asset exposure, with formal verification and compliance features.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Protocol risk scoring and monitoring",
                      "Counterparty risk assessment",
                      "Value-at-Risk (VaR) calculations",
                      "Regulatory compliance frameworks",
                      "Real-time risk alerts and notifications",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-lg blur-xl"></div>
              {activeTab === "treasury" && (
                <Image
                  src="/liquidity-management-dashboard.png"
                  alt="Treasury Management Dashboard"
                  width={600}
                  height={400}
                  className="relative rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                />
              )}
              {activeTab === "portfolio" && (
                <Image
                  src="/strategy-builder-flowchart.png"
                  alt="Portfolio Optimization Interface"
                  width={600}
                  height={400}
                  className="relative rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                />
              )}
              {activeTab === "risk" && (
                <Image
                  src="/abstract-neural-network.png"
                  alt="Risk Management System"
                  width={600}
                  height={400}
                  className="relative rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Institutional-Grade Benefits</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our platform combines the rigor of traditional finance with the innovation of decentralized technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Regulatory Compliance</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Built from the ground up to meet the stringent regulatory requirements of financial institutions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Comprehensive audit trails</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Compliance reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">KYC/AML integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Enterprise Security</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Bank-grade security protocols with multi-layered protection for institutional assets.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Multi-signature authorization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Formal verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Hardware security modules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Advanced Analytics</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Sophisticated analytics and reporting tools designed for institutional decision-making.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Real-time market data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">Custom reporting dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-500 mr-2 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">AI-powered insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to optimize your institutional liquidity?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with our team to learn how VeritasVault.ai can transform your treasury management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-700"
                onClick={() =>
                  trackNavigationEvent({ feature_name: "corporate_footer_cta", button_text: "Schedule Demo" })
                }
              >
                Schedule Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
                onClick={() =>
                  trackNavigationEvent({ feature_name: "corporate_footer_cta", button_text: "Contact Sales" })
                }
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
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
    </div>
  )
}
