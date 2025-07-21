"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"

/**
 * Features section for the Solutions page
 */
export function SolutionsFeatures() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Built for the complex needs of institutional investors and treasury operations.
          </p>
        </div>
        
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Advanced Analytics & Reporting
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Gain deep insights into your liquidity position with customizable dashboards, real-time analytics, and comprehensive reporting tools.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Real-time portfolio performance metrics with customizable KPIs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Automated reporting with export capabilities for board meetings and regulatory filings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Historical performance analysis with drill-down capabilities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Custom report builder with scheduling and distribution options
                </span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-xl border border-slate-200 dark:border-slate-700">
              <Image 
                src="/advanced-analytics-dashboard.png" 
                alt="Advanced Analytics Dashboard" 
                width={600} 
                height={400}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-xl border border-slate-200 dark:border-slate-700">
              <Image 
                src="/multi-chain-integration.png" 
                alt="Multi-Chain Integration" 
                width={600} 
                height={400}
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Multi-Chain Integration
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Seamlessly manage assets across multiple blockchains with our unified interface and cross-chain visibility.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Support for 30+ blockchains including Ethereum, Solana, Avalanche, and more
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Unified dashboard for cross-chain asset visibility and management
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Optimized cross-chain transfers with fee estimation and route optimization
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Chain-specific risk assessment and compliance monitoring
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Feature 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              AI-Powered Optimization
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Leverage advanced AI algorithms to optimize your treasury operations, maximize yields, and minimize risks.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Predictive analytics for market trends and liquidity forecasting
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Automated yield optimization strategies based on risk parameters
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Anomaly detection for early identification of potential risks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Scenario analysis with AI-generated recommendations
                </span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-xl border border-slate-200 dark:border-slate-700">
              <Image 
                src="/ai-optimization.png" 
                alt="AI-Powered Optimization" 
                width={600} 
                height={400}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}