"use client"

import {
  CtaSection,
  HeroSection,
  InstitutionalBadges,
  KeyBenefits,
  SolutionsTabs,
  ValueProposition
} from "@/components/corporate/landing-sections"
import { ComingSoonBanner } from "./coming-soon-banner"

/**
 * Corporate landing page component that assembles all section components
 * This component is structured to be maintainable and modular
 */
export function CorporateLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Institutional Badges Section */}
      <InstitutionalBadges />

      {/* Value Proposition Section */}
      <ValueProposition />

      {/* Solutions Tabs */}
      <SolutionsTabs />
      {/* Key Benefits Section */}
      <KeyBenefits />

      {/* CTA Section */}
      <CtaSection />
      {/* Trusted Institutions Section
      <TrustedInstitutions /> */}
    </div>
  )
}