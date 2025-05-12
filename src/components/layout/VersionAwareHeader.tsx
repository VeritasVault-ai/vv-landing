// src/components/layout/VersionAwareHeader.tsx
'use client'

import React from 'react'
import { useTheme } from '@/lib/context/ThemeProvider'
import { getHeaderNavigationByExperience } from '@/lib/navigation'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useAnalytics } from '@/hooks/use-analytics'
import CorporateHeader from './CorporateHeader'
import StandardHeader from './StandardHeader'

/**
 * Version-aware header that picks the correct variant based on 'experience' from context
 */
export function VersionAwareHeader() {
  const { experience } = useTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const { logout } = useAuth()
  const { trackEvent } = useAnalytics()
  const headerNav = getHeaderNavigationByExperience(experience, isAuthenticated)

  const commonProps = {
    headerNav,
    pathname,
    isAuthenticated,
    status: status as 'loading' | 'authenticated' | 'unauthenticated',
    onClose: () => {},       // pass meaningful handlers if needed
    onLoginClick: () => trackEvent({ action: 'login_click', category: 'navigation', label: experience }),
    onRegisterClick: () => trackEvent({ action: 'register_click', category: 'navigation', label: experience }),
    onLogout: () => logout(),
  }

  if (experience === 'corporate') {
    return <CorporateHeader {...commonProps} />
  }
  return <StandardHeader {...commonProps} />
}
