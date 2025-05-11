"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DemoModeEntryModal } from "@/components/demo-mode/entry-modal"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { BarChart3, Shield, TrendingUp, Building2 } from "lucide-react"

export function CorporateDemoLanding() {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false)
  const router = useRouter()

  const handleStartDemo = () => {
    trackNavigationEvent({
      feature_name: "corporate_demo_start",
      tab_destination: "dashboard",
    })
    router.push("/corporate/demo/dashboard")
  }

  return (
    <>
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience Institutional-Grade Liquidity Management</h1>
            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Explore our enterprise platform with $100M in simulated assets. See how VeritasVault.ai optimizes treasury
              operations for institutional clients.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto"
              onClick={() => setIsEntryModalOpen(true)}
            >
              Start Corporate Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Corporate Demo Features</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our institutional demo showcases the advanced features designed specifically for corporate treasury
              departments and financial institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Treasury Management</h3>
              <p className="text-slate-600">
                Optimize your institutional treasury with AI-powered allocation recommendations and risk management
                tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Analytics</h3>
              <p className="text-slate-600">
                Gain insights with institutional-grade analytics, including Black-Litterman model integration and
                scenario analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Risk Assessment</h3>
              <p className="text-slate-600">
                Comprehensive risk evaluation tools designed for institutional compliance and governance requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Optimization</h3>
              <p className="text-slate-600">
                Optimize large-scale portfolios with institutional-grade algorithms and formal verification.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-blue-800 hover:bg-blue-900 text-white"
              onClick={() => setIsEntryModalOpen(true)}
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Enterprise-Grade Security</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Our platform is built with the security needs of financial institutions in mind. While this is a demo
                  environment, our production system includes:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-800" />
                    </div>
                    <span className="text-slate-700">SOC 2 Type II compliance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-800" />
                    </div>
                    <span className="text-slate-700">ISO 27001 certification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-800" />
                    </div>
                    <span className="text-slate-700">Formal verification of critical algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-800" />
                    </div>
                    <span className="text-slate-700">Enterprise-grade encryption and key management</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 md:h-full">
                <Image
                  src="/placeholder.svg?key=1gfzm"
                  alt="Enterprise Security"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoModeEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onConfirm={handleStartDemo}
      />
    </>
  )
}
