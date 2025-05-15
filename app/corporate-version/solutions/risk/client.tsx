"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { AlertTriangle, BarChart3, LineChart, Eye, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComingSoonBanner } from "@/components/corporate/coming-soon-banner"

/**
 * Client component for the Risk Management solution page
 */
export function RiskSolutionClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <ComingSoonBanner />
        <CorporateHeader />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Institutional Risk Management
                  </h1>
                  <p className="text-xl mb-8 text-blue-100">
                    Comprehensive risk management solutions for institutions dealing with digital assets.
                    Monitor, analyze, and mitigate risks in real-time.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                      <a href="/corporate-version/demo">Request Demo</a>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <a href="/corporate-version/solutions/risk/whitepaper">Download Whitepaper</a>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block relative h-96">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="p-6 h-full flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Risk Dashboard</span>
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="text-2xl font-bold">Risk Score: 42</div>
                          <div className="text-yellow-300 text-sm">Moderate Risk Level</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Market Risk</span>
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">Low</div>
                            <div className="text-xs">VaR: 2.4%</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Counterparty Risk</span>
                              <LineChart className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">Medium</div>
                            <div className="text-xs">3 alerts active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Risk Management Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <AlertTriangle className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Risk Analytics</h3>
                  <p className="text-gray-600">
                    Comprehensive risk metrics including VaR, stress testing, and scenario analysis for digital assets.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Eye className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Real-time Monitoring</h3>
                  <p className="text-gray-600">
                    24/7 monitoring of market conditions, liquidity, and counterparty risks with customizable thresholds.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Bell className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Alert System</h3>
                  <p className="text-gray-600">
                    Configurable alert system with multi-channel notifications for risk threshold breaches.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <BarChart3 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Exposure Analysis</h3>
                  <p className="text-gray-600">
                    Detailed exposure analysis across assets, counterparties, and geographic regions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <LineChart className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Volatility Modeling</h3>
                  <p className="text-gray-600">
                    Advanced volatility modeling and correlation analysis specific to digital asset markets.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Risk Controls</h3>
                  <p className="text-gray-600">
                    Automated risk controls with approval workflows and audit trails for regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-blue-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to enhance your risk management?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Schedule a demo to see how VeritasVault Enterprise can transform your risk management for digital assets.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <a href="/corporate-version/demo">Request Demo</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <a href="/corporate-version/contact">Contact Sales</a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}