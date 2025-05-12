// src/components/layout/VersionAwareFooter.tsx
'use client'

import React from 'react'
import { Footer } from './Footer'
import { useTheme } from '@/lib/context/ThemeProvider'
import { getFooterNavigationByExperience } from '@/lib/navigation'

export function VersionAwareFooter() {
  const { experience } = useTheme()
  const nav = getFooterNavigationByExperience(experience)
  const brand = experience === 'corporate'
    ? { name: 'VeritasVault', description: 'Enterprise-grade security and compliance solutions for institutional liquidity management.' }
    : { name: 'NeuralLiquid', description: 'AI-powered liquidity management platform for Tezos.' }
  const subscribeApi = '/api/newsletter/subscribe'

  return <Footer brand={brand} nav={nav} subscribeApi={subscribeApi} />
}
