"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChart2, Shield, Briefcase, CheckCircle, ChevronRight } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

/**
 * Renders a tabbed interface showcasing enterprise liquidity management solutions for institutions.
 *
 * Displays three tabs—Treasury Management, Portfolio Optimization, and Risk Management—each with descriptive content, feature lists, and illustrative images. Tracks tab selection events for analytics.
 */
export function SolutionsTabs() {
  const [activeTab, setActiveTab] = useState("treasury")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    trackNavigationEvent({
      feature_name: "corporate_landing_tabs",
      tab_destination: tab,
    })
  }

  return (
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
  )
}