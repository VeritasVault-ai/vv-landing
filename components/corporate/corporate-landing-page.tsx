"use client"

/**
 * Corporate Landing Page Component
 * 
 * This component assembles all the section components for the corporate landing page.
 * Each section is implemented as a separate component for better maintainability.
 */

import {
  HeroSection,
  InstitutionalBadges,
  ValueProposition,
  SolutionsTabs,
  KeyBenefits,
  CtaSection,
  TrustedInstitutions
} from "./landing-sections"

export function CorporateLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <HeroSection />
      <InstitutionalBadges />
      <ValueProposition />
      <SolutionsTabs />
      <KeyBenefits />
      <CtaSection />
      <TrustedInstitutions />
    </div>
  )
}