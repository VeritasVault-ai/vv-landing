"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { Shield, FileText, BarChart4, CheckCircle, AlertCircle, BookOpen } from "lucide-react"

/**
 * Client component for the Compliance page
 */
export function ComplianceClient() {
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
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Regulatory Compliance Solutions</h1>
                <p className="text-xl text-blue-100">
                  Navigate the complex regulatory landscape of digital assets with confidence. 
                  Our comprehensive compliance tools help institutions meet regulatory requirements 
                  while managing digital assets efficiently.
                </p>
              </div>
            </div>
          </section>
          
          {/* Compliance Features */}
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
                    <BarChart4 className="h-10 w-10" />
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
          
          {/* Regulatory Coverage */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Regulatory Coverage</h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  Our compliance solutions are designed to help institutions meet requirements across multiple regulatory frameworks:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Anti-Money Laundering (AML)</h3>
                    <p className="text-gray-600">
                      Compliance with global AML regulations including FinCEN requirements, EU AML Directives, and FATF recommendations.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Know Your Customer (KYC)</h3>
                    <p className="text-gray-600">
                      Comprehensive KYC processes that meet regulatory standards while providing a smooth onboarding experience.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Travel Rule Compliance</h3>
                    <p className="text-gray-600">
                      Solutions for FATF Travel Rule compliance, enabling secure information sharing for virtual asset transfers.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Sanctions Screening</h3>
                    <p className="text-gray-600">
                      Real-time screening against global sanctions lists including OFAC, UN, EU, and other relevant authorities.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Tax Reporting</h3>
                    <p className="text-gray-600">
                      Tools for generating accurate tax reports for digital asset transactions across multiple jurisdictions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to streamline your compliance processes?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact our team to learn how VeritasVault Enterprise can help your institution meet regulatory requirements 
                while efficiently managing digital assets.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/corporate-version/contact" 
                  className="bg-blue-700 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  Schedule a Consultation
                </a>
                <a 
                  href="/corporate-version/compliance/whitepaper" 
                  className="bg-white text-blue-700 border border-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  Download Compliance Guide
                </a>
              </div>
            </div>
          </section>
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}