"use client"

import { ComingSoonBanner } from "@/components/corporate/coming-soon-banner"
import { Button } from "@/components/ui/button"
import { COLOR_MODES, CORPORATE_VARIANTS, EXPERIENCE_TYPES } from "@/src/constants/theme"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { ArrowUpDown, BarChart3, BarChart4, Layers, LineChart, PieChart } from "lucide-react"

/**
 * Client component for the Portfolio Management solution page
 */
export function PortfolioSolutionClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Institutional Portfolio Management
                  </h1>
                  <p className="text-xl mb-8 text-blue-100">
                    Advanced portfolio management tools designed for institutions investing in digital assets.
                    Optimize performance, manage risk, and streamline operations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                      <a href="/corporate-version/demo">Request Demo</a>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <a href="/corporate-version/solutions/portfolio/whitepaper">Download Whitepaper</a>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block relative h-96">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="p-6 h-full flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Portfolio Performance</span>
                            <LineChart className="h-4 w-4" />
                          </div>
                          <div className="text-2xl font-bold">+18.7% YTD</div>
                          <div className="text-green-300 text-sm">Outperforming benchmark by 4.2%</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Allocation</span>
                              <PieChart className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">7 Asset Classes</div>
                            <div className="text-xs">Optimized allocation</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Risk Score</span>
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">Medium</div>
                            <div className="text-xs">Volatility: 12.4%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Portfolio Management Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <PieChart className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Asset Allocation</h3>
                  <p className="text-gray-600">
                    Sophisticated asset allocation models with optimization algorithms tailored for digital asset portfolios.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <LineChart className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
                  <p className="text-gray-600">
                    Comprehensive performance measurement and attribution analysis across multiple dimensions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Layers className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Multi-Strategy Support</h3>
                  <p className="text-gray-600">
                    Support for multiple investment strategies with customizable parameters and constraints.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <ArrowUpDown className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Rebalancing Tools</h3>
                  <p className="text-gray-600">
                    Automated and manual rebalancing tools with tax-aware optimization and drift monitoring.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <BarChart3 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Risk Management</h3>
                  <p className="text-gray-600">
                    Advanced risk metrics and scenario analysis tools to identify and mitigate portfolio risks.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <BarChart4 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Reporting Suite</h3>
                  <p className="text-gray-600">
                    Customizable reporting with institutional-grade documentation for clients and regulators.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-blue-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to optimize your investment portfolio?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Schedule a demo to see how VeritasVault.net can transform your portfolio management for digital assets.
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