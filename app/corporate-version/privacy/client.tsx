"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"

/**
 * Client component for the Privacy Policy page
 */
export function PrivacyClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-6">Last updated: May 15, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                At VeritasVault Enterprise, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our services. Please read this policy carefully.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, company name, job title, 
                  and other information you provide when creating an account or requesting our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our services, including log data, device 
                  information, and analytics data.
                </li>
                <li>
                  <strong>Financial Information:</strong> For enterprise clients, we may collect information necessary 
                  for billing and compliance purposes.
                </li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Information Sharing and Disclosure</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information in the 
                following circumstances:
              </p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a business transaction such as a merger or acquisition</li>
              </ul>
              
              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the 
                right to access, correct, delete, or restrict processing of your data. To exercise these rights, please 
                contact us using the information provided below.
              </p>
              
              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@veritasvault.com.
              </p>
            </div>
          </div>
        </main>
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}