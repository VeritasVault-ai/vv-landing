"use client"

import { useAnalytics } from "@/hooks/use-analytics"
import { useCurrentVersion } from "@/hooks/use-current-version"
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_GITHUB,
  COMPANY_LINKEDIN,
  COMPANY_TWITTER,
  STANDARD_PRODUCT_DESCRIPTION,
  STANDARD_PRODUCT_NAME
} from "@/lib/config/product-info"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  BottomLinks,
  ContactSection,
  DemoBadge,
  LinkGroups,
  LogoSection,
  NewsletterSection
} from "./components"
import { FooterLinkGroup, FooterProps } from "./types"
import styles from "./unified-footer.module.css"

// Re-export types for external use
export * from "./types"

export function UnifiedFooter({
  variant = 'dashboard',
  experience = 'standard',
  showNewsletter = true,
  customLogo,
  productName = STANDARD_PRODUCT_NAME,
  productDescription = STANDARD_PRODUCT_DESCRIPTION,
  linkGroups,
  socialLinks = {
    twitter: COMPANY_TWITTER,
    github: COMPANY_GITHUB,
    linkedin: COMPANY_LINKEDIN
  },
  contactInfo = {
    email: COMPANY_EMAIL,
    address: COMPANY_ADDRESS
  },
  showDemoBadge = false,
  onNewsletterSubmit,
  className,
  isAuthenticated = true
}: FooterProps) {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()
  const { version } = useCurrentVersion()
  const { trackEvent } = useAnalytics()
  
  // Default link groups if none provided
  const defaultLinkGroups: FooterLinkGroup[] = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: `/${version}` },
        { label: "Dashboard", href: `/${version}/dashboard` },
        { label: "Analytics", href: `/${version}/analytics` },
        { label: "How It Works", href: `/${version}/how-it-works` },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: `/${version}/docs` },
        { label: "API Reference", href: `/${version}/api` },
        { label: "Support", href: `/${version}/support` },
        { label: "Contact Us", href: `/${version}/contact` },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: `/${version}/privacy` },
        { label: "Terms of Service", href: `/${version}/terms` },
        { label: "Cookies", href: `/${version}/cookies` },
        { label: "Security", href: `/${version}/security` },
      ]
    }
  ]

  // Corporate variant has different default link groups
  const corporateDefaultLinkGroups: FooterLinkGroup[] = [
    {
      title: "Solutions",
      links: [
        { label: "Treasury Management", href: `/${version}/solutions/treasury` },
        { label: "Portfolio Optimization", href: `/${version}/solutions/portfolio` },
        { label: "Risk Management", href: `/${version}/solutions/risk` },
        { label: "Compliance", href: `/${version}/solutions/compliance` },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: `/${version}/about` },
        { label: "Careers", href: `/${version}/careers` },
        { label: "Blog", href: `/${version}/blog` },
        { label: "Contact", href: `/${version}/contact` },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: `/${version}/terms` },
        { label: "Privacy Policy", href: `/${version}/privacy` },
        { label: "Security", href: `/${version}/security` },
        { label: "Compliance", href: `/${version}/compliance` },
      ]
    }
  ]

  // Choose link groups based on experience and provided linkGroups
  const finalLinkGroups = linkGroups || (experience === 'corporate' ? corporateDefaultLinkGroups : defaultLinkGroups)
  
  // Handle newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email && onNewsletterSubmit) {
      onNewsletterSubmit(email)
      setEmail("")
      
      // Track newsletter signup event
      trackEvent({
        action: "newsletter_signup",
        category: "engagement",
        label: "footer_newsletter"
      })
    }
    
    // Track newsletter signup event
    trackEvent({
      action: "newsletter_signup",
      category: "engagement",
      label: "footer_newsletter"
    })
  }
  
  // Handle social link clicks
  const handleSocialLinkClick = (platform: string) => {
    trackEvent({
      action: "social_click",
      category: "engagement",
      label: platform
    })
  }
  
  // Determine footer class based on variant and experience
  const footerClass = cn(
    styles.footer,
    variant === 'landing' && styles.footerLanding,
    variant === 'dashboard' && styles.footerDashboard,
    variant === 'demo' && styles.footerDemo,
    experience === 'corporate' && styles.footerCorporate,
    className
  )
  
  return (
    <footer className={footerClass}>
      {/* Demo mode badge */}
      {(variant === 'demo' || showDemoBadge) && <DemoBadge />}
      
      <div className={styles.footerContainer}>
        {/* Top section with logo, description, and newsletter */}
        <div className={styles.footerTop}>
          {/* Logo and description */}
          <LogoSection 
            customLogo={customLogo}
            productName={productName}
            productDescription={productDescription}
            socialLinks={socialLinks}
            version={version}
            handleSocialLinkClick={handleSocialLinkClick}
          />

          {/* Newsletter signup */}
          {showNewsletter && variant !== 'dashboard' && onNewsletterSubmit && (
            <NewsletterSection 
              email={email} 
              setEmail={setEmail} 
              handleNewsletterSubmit={handleNewsletterSubmit} 
            />
          )}
        </div>

        {/* Main footer links section */}
        {variant !== 'dashboard' && (
          <div className={styles.linkGroups}>
            <LinkGroups linkGroups={finalLinkGroups} trackEvent={trackEvent} />
            
            {/* Contact information */}
            {(experience === 'corporate' || variant === 'landing') && (
              <ContactSection contactInfo={contactInfo} trackEvent={trackEvent} />
            )}
          </div>
        )}

        {/* Bottom section with copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>&copy; {currentYear} {productName}. All rights reserved.</p>
          
          {/* Bottom links for dashboard variant */}
          {variant === 'dashboard' && (
            <BottomLinks version={version} trackEvent={trackEvent} />
          )}
        </div>
      </div>
    </footer>
  )
}