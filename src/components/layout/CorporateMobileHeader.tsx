// src/components/layout/CorporateMobileHeader.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { HeaderNavigationItem, NavigationSubItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useAnalytics } from '@/hooks/use-analytics'
import Link from 'next/link'

interface CorporateMobileHeaderProps {
  headerNav: HeaderNavigationItem[]
  pathname: string
  isAuthenticated: boolean
  status: 'loading' | 'authenticated' | 'unauthenticated'
  onClose: () => void
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
}

/**
 * Renders a mobile-friendly corporate header navigation menu with support for featured links, grouped navigation, and authentication actions.
 *
 * Displays featured navigation items at the top, followed by regular navigation links and dropdown groups. Shows login and registration buttons for unauthenticated users, or an account menu with dashboard, profile, settings, and sign-out options for authenticated users. Active links are highlighted based on the current pathname, and menu actions trigger provided callbacks.
 *
 * @param headerNav - Navigation items to display, including featured and grouped links.
 * @param pathname - The current URL path used to highlight active navigation links.
 * @param isAuthenticated - Indicates if the user is currently authenticated.
 * @param status - The authentication status, used to control loading and button visibility.
 * @param onClose - Callback invoked when a navigation link is clicked to close the menu.
 * @param onLoginClick - Callback for the login button.
 * @param onRegisterClick - Callback for the registration button.
 * @param onLogout - Callback for the sign-out action.
 */
export function CorporateMobileHeader({
  headerNav,
  pathname,
  isAuthenticated,
  status,
  onClose,
  onLoginClick,
  onRegisterClick,
  onLogout,
}: CorporateMobileHeaderProps) {
  const { trackEvent } = useAnalytics()

  // Separate featured items from regular items
  const featuredItems = headerNav.filter((item) => item.featured)
  const regularItems = headerNav.filter((item) => !item.featured)

  return (
    <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container py-4 space-y-4">
        {/* Featured items at the top of mobile menu */}
        {featuredItems.length > 0 && (
          <div className="space-y-1 mb-2">
            {featuredItems.map((item) => (
              <Link
                key={item.href || item.title}
                href={item.href || '#'}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors',
                  pathname === item.href
                    ? 'text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-l-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-800 dark:text-slate-200 border-l-2 border-transparent'
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}

        {/* Regular mobile navigation links */}
        {regularItems.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href || item.title}
                href={item.href || '#'}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors',
                  pathname === item.href
                    ? 'text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-l-2 border-blue-600/70 dark:border-blue-400/70'
                    : 'text-slate-700 dark:text-slate-300 border-l-2 border-transparent'
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            )
          } else if (item.type === 'dropdown' && item.items) {
            return (
              <div key={item.title} className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href || subItem.title}
                      href={subItem.href || '#'}
                      className={cn(
                        'block px-6 py-2 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors',
                        pathname === subItem.href
                          ? 'text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900'
                          : 'text-slate-700 dark:text-slate-300'
                      )}
                      onClick={onClose}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })}

        {/* Mobile auth buttons */}
        {!isAuthenticated && status !== 'loading' && (
          <div className="mt-6 px-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              onClick={onLoginClick}
            >
              Log In
            </Button>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
              onClick={onRegisterClick}
            >
              Sign Up
            </Button>
          </div>
        )}

        {/* Mobile user menu when logged in */}
        {isAuthenticated && (
          <div className="mt-6 px-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Account
            </h3>
            <div className="space-y-1">
              <Link
                key="dashboard"
                href="/dashboard"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <Link
                key="profile"
                href="/profile"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300"
                onClick={onClose}
              >
                Profile
              </Link>
              <Link
                key="settings"
                href="/settings"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300"
                onClick={onClose}
              >
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                onClick={() => {
                  trackEvent({
                    action: 'logout',
                    category: 'authentication',
                    label: 'mobile_menu',
                    custom_data: { version: 'corporate' },
                  })
                  onLogout()
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
