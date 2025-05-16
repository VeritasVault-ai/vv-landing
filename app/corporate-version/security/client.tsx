"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { Shield, Lock, Server, FileCheck, AlertTriangle, Users } from "lucide-react"

/**
 * Client component for the Security page
 */
export function SecurityClient() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Security</h1>
                <p className="text-xl text-blue-100">
                  At VeritasVault, we implement industry-leading security measures to protect your digital assets 
                  and sensitive data. Security is at the core of everything we do.
                </p>
              </div>
            </div>
          </section>
          
          {/* Security Features */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Security Approach</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Advanced Encryption</h3>
                  <p className="text-gray-600">
                    All data is encrypted both in transit and at rest using industry-standard AES-256 encryption and TLS protocols.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Lock className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Multi-Factor Authentication</h3>
                  <p className="text-gray-600">
                    Mandatory multi-factor authentication for all account access, with support for hardware security keys.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Server className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Secure Infrastructure</h3>
                  <p className="text-gray-600">
                    Our infrastructure is hosted in SOC 2 Type II certified data centers with 24/7 monitoring and redundancy.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <FileCheck className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Regular Audits</h3>
                  <p className="text-gray-600">
                    We conduct regular security audits and penetration testing by independent third-party security firms.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <AlertTriangle className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Incident Response</h3>
                  <p className="text-gray-600">
                    Comprehensive incident response plan with 24/7 security team ready to address any potential threats.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <div className="text-blue-700 mb-4">
                    <Users className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Role-Based Access</h3>
                  <p className="text-gray-600">
                    Granular role-based access controls ensure users only access data necessary for their role.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Compliance Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Compliance & Certifications</h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">SOC 2 Type II Compliance</h3>
                    <p className="text-gray-600">
                      Our platform has successfully completed SOC 2 Type II audits, demonstrating our commitment to security, 
                      availability, processing integrity, confidentiality, and privacy.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">ISO 27001 Certification</h3>
                    <p className="text-gray-600">
                      We maintain ISO 27001 certification, the international standard for information security management systems.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">GDPR Compliance</h3>
                    <p className="text-gray-600">
                      Our platform is designed with privacy by design principles and complies with GDPR requirements for 
                      processing and protecting personal data.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">CCPA Compliance</h3>
                    <p className="text-gray-600">
                      We adhere to the California Consumer Privacy Act (CCPA) requirements for handling personal information 
                      of California residents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to secure your digital assets?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact our security team to learn more about our enterprise-grade security features and how we can 
                help protect your institutional assets.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/corporate-version/contact" 
                  className="bg-blue-700 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  Contact Security Team
                </a>
                <a 
                  href="/corporate-version/security/whitepaper" 
                  className="bg-white text-blue-700 border border-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  Download Security Whitepaper
                </a>
              </div>
            </div>
          </section>
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}