// src/components/layout/VersionAwareHeader.tsx
'use client'

import { useAnalytics } from '@/hooks/use-analytics'
import { useAuth } from '@/hooks/use-auth'
import {
  getHeaderNavigationByExperience,
  HeaderNavigationItem,
} from '@/lib/navigation'
import { useTheme } from '@/src/lib/hooks/context/ThemeProvider'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { CorporateHeader } from './CorporateHeader'
import { StandardHeader } from './StandardHeader'

/**
 * Shared props for both header variants
 */
export interface CommonHeaderProps {
  headerNav: HeaderNavigationItem[]
  pathname: string
  isAuthenticated: boolean
  status: 'loading' | 'authenticated' | 'unauthenticated'
  onClose: () => void
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void   // now returns void
}

/**
 * Renders a header component variant based on the current user experience context.
 */
export function VersionAwareHeader() {
  const { experience } = useTheme()
  const pathname = usePathname()
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const { logout } = useAuth()
  const { trackEvent } = useAnalytics()
  const headerNav = getHeaderNavigationByExperience(
    experience,
    isAuthenticated
  )

  const commonProps: CommonHeaderProps = {
    headerNav,
    pathname: pathname ?? '/',
    isAuthenticated,
    status,
    onClose: () => {},
    onLoginClick: () =>
      trackEvent({
        action: 'login_click',
        category: 'nav',
        label: experience,
      }),
    onRegisterClick: () =>
      trackEvent({
        action: 'register_click',
        category: 'nav',
        label: experience,
      }),
    onLogout: () => {
      logout()
    },
  }

  return experience === 'corporate'
    ? <CorporateHeader {...commonProps} />
    : <StandardHeader {...commonProps} />
}
