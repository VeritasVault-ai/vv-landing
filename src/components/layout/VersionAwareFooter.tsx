// src/components/layout/VersionAwareFooter.tsx
'use client'

import React from 'react'
import { Footer } from './Footer'
import { getFooterNavigationByExperience } from '@/lib/navigation'
import { useUnifiedTheme } from '@/src/hooks/use-unified-theme'
import { 
  CORPORATE_PRODUCT_NAME, 
  CORPORATE_PRODUCT_DESCRIPTION, 
  STANDARD_PRODUCT_NAME, 
  STANDARD_PRODUCT_DESCRIPTION 
} from '@/lib/config/product-info'

/**
 * Displays a footer with navigation and branding customized for the current user experience.
 *
 * Selects navigation links and brand details based on the active experience context, and supplies a fixed newsletter subscription API endpoint to the footer component.
 */
export function VersionAwareFooter() {
  const { experience } = useUnifiedTheme()
  const nav = getFooterNavigationByExperience(experience)
  const brand = experience === 'corporate'
    ? { name: CORPORATE_PRODUCT_NAME, description: CORPORATE_PRODUCT_DESCRIPTION }
    : { name: STANDARD_PRODUCT_NAME, description: STANDARD_PRODUCT_DESCRIPTION }
  const subscribeApi = '/api/newsletter/subscribe'

  return <Footer brand={brand} nav={nav} subscribeApi={subscribeApi} />
}