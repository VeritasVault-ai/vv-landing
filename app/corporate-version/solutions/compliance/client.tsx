"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { Shield, FileText, CheckCircle, AlertCircle, BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Client component for the Compliance solution page
 */
export function ComplianceSolutionClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Digital Asset Compliance Solutions
                  </h1>
                  <p className="text-xl mb-8 text-blue-100">
                    Comprehensive compliance tools for institutions managing digital assets.
                    Meet regulatory requirements while maintaining operational efficiency.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                      <a href="/corporate-version/demo">Request Demo</a>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <a href="/corporate-version/solutions/compliance/whitepaper">Download Whitepaper</a>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block relative h-96">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="p-6 h-full flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Compliance Status</span>
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div className="text-2xl font-bold">97% Compliant</div>
                          <div className="text-green-300 text-sm">3 action items pending</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">AML Screening</span>
                              <Shield className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">Complete</div>
                            <div className="text-xs">Last updated: Today</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Reports Due</span>
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="text-lg font-bold">2</div>
                            <div className="text-xs">Next due: May 30</div>
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
              <h2 className="text-3xl font-bold text-center mb-12">Compliance Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AML/KYC Integration</h3>
                  <p className="text-gray-600">
                    Seamless integration with leading AML/KYC providers to ensure compliance with anti-money laundering regulations.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <FileText className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Regulatory Reporting</h3>
                  <p className="text-gray-600">
                    Automated generation of regulatory reports for various jurisdictions, saving time and reducing compliance costs.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Search className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Transaction Monitoring</h3>
                  <p className="text-gray-600">
                    Real-time monitoring of transactions for suspicious activities with configurable alert thresholds.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Audit Trails</h3>
                  <p className="text-gray-600">
                    Comprehensive audit logs for all system activities, providing transparency and accountability.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <AlertCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Risk Assessment</h3>
                  <p className="text-gray-600">
                    Advanced risk scoring for counterparties and transactions to identify potential compliance risks.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Policy Management</h3>
                  <p className="text-gray-600">
                    Centralized management of compliance policies with version control and approval workflows.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-blue-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to streamline your compliance processes?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Schedule a demo to see how VeritasVault Enterprise can help your institution meet regulatory requirements 
                while efficiently managing digital assets.
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
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}