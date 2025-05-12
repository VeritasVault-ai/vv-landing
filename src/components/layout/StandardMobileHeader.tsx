// src/components/layout/StandardMobileHeader.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { HeaderNavigationItem, NavigationSubItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useAnalytics } from '@/hooks/use-analytics'
import Link from 'next/link'

export interface StandardMobileHeaderProps {
  headerNav: HeaderNavigationItem[]
  pathname: string
  isAuthenticated: boolean
  status: 'loading' | 'authenticated' | 'unauthenticated'
  onClose: () => void
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
}

export function StandardMobileHeader({
  headerNav,
  pathname,
  isAuthenticated,
  status,
  onClose,
  onLoginClick,
  onRegisterClick,
  onLogout,
}: StandardMobileHeaderProps) {
  const { trackEvent } = useAnalytics()

  // Separate featured items from regular items
  const featuredItems = headerNav.filter(item => item.featured)
  const regularItems = headerNav.filter(item => !item.featured)

  return (
    <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container py-4 space-y-4">
        {/* Featured items */}
        {featuredItems.length > 0 && (
          <div className="space-y-1 mb-2">
            {featuredItems.map(item => (
              <Link
                key={item.href || item.title}
                href={item.href || '#'}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-md hover:bg-background/80 transition-colors',
                  pathname === item.href
                    ? 'text-foreground bg-background/80 border-l-2 border-emerald-600'
                    : 'text-foreground/70 border-l-2 border-transparent'
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}

        {/* Regular links and dropdowns */}
        {regularItems.map(item => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href || item.title}
                href={item.href || '#'}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-md hover:bg-background/80 transition-colors',
                  pathname === item.href
                    ? 'text-foreground bg-background/80 border-l-2 border-emerald-600'
                    : 'text-foreground/70 border-l-2 border-transparent'
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            )
          }
          if (item.type === 'dropdown' && item.items) {
            return (
              <div key={item.title} className="space-y-2">
                <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.items.map(sub => (
                    <Link
                      key={sub.href || sub.title}
                      href={sub.href || '#'}
                      className={cn(
                        'block px-6 py-2 text-sm font-medium rounded-md hover:bg-background/80 transition-colors',
                        pathname === sub.href
                          ? 'text-foreground bg-background/80'
                          : 'text-foreground/70'
                      )}
                      onClick={onClose}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })}

        {/* Auth buttons */}
        {status === 'loading' ? null : !isAuthenticated ? (
          <div className="mt-6 px-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => { trackEvent({ action: 'login_click', category: 'navigation', label: 'standard' }); onLoginClick() }}
            >
              Log In
            </Button>
            <Button
              className="w-full bg-emerald-600 text-white"
              onClick={() => { trackEvent({ action: 'register_click', category: 'navigation', label: 'standard' }); onRegisterClick() }}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <div className="mt-6 px-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-background/80 transition-colors"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-background/80 transition-colors"
                onClick={onClose}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-background/80 transition-colors"
                onClick={onClose}
              >
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full text-red-600"
                onClick={() => { trackEvent({ action: 'logout', category: 'authentication', label: 'standard' }); onLogout() }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
