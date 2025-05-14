// src/components/layout/VersionAwareFooter.tsx
'use client'

import React from 'react'
import { Footer } from './Footer'
import { getFooterNavigationByExperience } from '@/lib/navigation'
import { useUnifiedTheme } from '@/src/hooks/use-unified-theme'

/**
 * Displays a footer with navigation and branding customized for the current user experience.
 *
 * Selects navigation links and brand details based on the active experience context, and supplies a fixed newsletter subscription API endpoint to the footer component.
 */
export function VersionAwareFooter() {
  const { experience } = useUnifiedTheme()
  const nav = getFooterNavigationByExperience(experience)
  const brand = experience === 'corporate'
    ? { name: 'VeritasVault', description: 'Enterprise-grade security and compliance solutions for institutional liquidity management.' }
    : { name: 'NeuralLiquid', description: 'AI-powered liquidity management platform for Tezos.' }
  const subscribeApi = '/api/newsletter/subscribe'

  return <Footer brand={brand} nav={nav} subscribeApi={subscribeApi} />
}
