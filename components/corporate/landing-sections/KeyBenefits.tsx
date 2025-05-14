"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

/**
 * Renders a section highlighting three institutional-grade benefits of the platform: regulatory compliance, enterprise security, and advanced analytics.
 *
 * Displays each benefit in a styled card with a heading, description, and a list of key features, supporting responsive layout and dark mode.
 */
export function KeyBenefits() {
  return (
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
  )
}