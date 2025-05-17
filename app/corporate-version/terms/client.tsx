"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { UnifiedFooter } from "@/components/unified-footer"
import { CORPORATE_PRODUCT_NAME, CORPORATE_PRODUCT_DESCRIPTION } from "@/lib/config/product-info"
import { UnifiedHeader } from "@/components/unified-header"

/**
 * Client component for the Terms page
 */
export function TermsClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <UnifiedHeader />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-6">Last updated: May 15, 2025</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using VeritasVault Enterprise services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
              
              <h2>2. Description of Services</h2>
              <p>
                VeritasVault Enterprise provides institutional liquidity management solutions for digital assets. 
                Our services include treasury management, portfolio optimization, risk management, and compliance tools 
                designed for institutional clients.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                To access certain features of our services, you must register for an account. You agree to provide 
                accurate and complete information when creating your account and to update such information to keep 
                it accurate and current.
              </p>
              
              <h2>4. Privacy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
                personal information. By using our services, you consent to the collection and use of information as 
                described in our Privacy Policy.
              </p>
              
              <h2>5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of our services, including but not limited to text, graphics, 
                logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive 
                property of VeritasVault or its licensors and are protected by copyright, trademark, and other intellectual 
                property laws.
              </p>
              
              <h2>6. Limitations of Liability</h2>
              <p>
                VeritasVault Enterprise shall not be liable for any direct, indirect, incidental, special, consequential, 
                or exemplary damages resulting from your use of or inability to use our services.
              </p>
              
              <h2>7. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify users of any significant 
                changes by posting a notice on our website or sending an email. Your continued use of our services after 
                such modifications constitutes your acceptance of the revised terms.
              </p>
              
              <h2>8. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
                in which VeritasVault Enterprise is registered, without regard to its conflict of law provisions.
              </p>
              
              <h2>9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at legal@veritasvault.com.
              </p>
            </div>
          </div>
        </main>
        
        <UnifiedFooter 
          experience="corporate"
          productName={CORPORATE_PRODUCT_NAME}
          productDescription={CORPORATE_PRODUCT_DESCRIPTION}
        />
      </div>
    </RobustThemeProvider>
  )
}