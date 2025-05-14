// src/components/layout/CorporateHeader.tsx
'use client'

import { LoginDialog } from '@/components/auth/login-dialog'
import { RegisterDialog } from '@/components/auth/register-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HeaderNavigationItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/src/components/ThemeToggle'
import { ChevronDown, Menu, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CorporateMobileHeader } from './CorporateMobileHeader'
import { CORPORATE_PRODUCT_NAME } from '@/lib/config/product-info'

/**
 * Props shared by both header variants
 */
export interface CommonHeaderProps {
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
 * Renders the corporate site header with navigation, authentication controls, theme toggle, and responsive mobile support.
 *
 * Displays navigation links, dropdown menus, and authentication actions based on the provided props. Includes a sticky layout, logo, and adapts to mobile screens with a collapsible menu. Login and registration dialogs are managed locally and shown as needed.
 *
 * @param headerNav - Array of navigation items to display in the header.
 * @param pathname - The current URL path, used to highlight the active navigation item.
 * @param isAuthenticated - Indicates whether the user is currently authenticated.
 * @param status - The current authentication status: 'loading', 'authenticated', or 'unauthenticated'.
 * @param onClose - Callback invoked to close menus or dialogs.
 * @param onLoginClick - Callback triggered when the login button is clicked.
 * @param onRegisterClick - Callback triggered when the register button is clicked.
 * @param onLogout - Callback triggered when the user selects "Sign out".
 */
export function CorporateHeader({
  headerNav,
  pathname,
  isAuthenticated,
  status,
  onClose,
  onLoginClick,
  onRegisterClick,
  onLogout,
}: CommonHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)

  // Ensure client-only session logic runs
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Split nav items
  const featuredItems = headerNav.filter(i => i.featured)
  const linkItems     = headerNav.filter(i => i.type === 'link' && !i.featured)
  const dropdownItems = headerNav.filter(i => i.type === 'dropdown' && i.items)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 dark:border-slate-800">
        <div className="container flex h-16 items-center justify-between">
          {/* logo + desktop nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-corporate.svg"
                alt={CORPORATE_PRODUCT_NAME}
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="hidden font-bold sm:inline">{CORPORATE_PRODUCT_NAME}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {featuredItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    'font-medium group relative',
                    pathname === item.href
                      ? 'text-slate-900 dark:text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600'
                      : 'text-slate-800 dark:text-slate-200 hover:text-slate-900'
                  )}
                >
                  {item.title}
                </Link>
              ))}

              {linkItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    'transition-colors',
                    pathname === item.href
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  )}
                >
                  {item.title}
                </Link>
              ))}

              {dropdownItems.map(item => (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-900">
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items!.map(sub => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <Link href={sub.href!}>
                          <div className="flex flex-col">
                            <span>{sub.title}</span>
                            {sub.description && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {sub.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </nav>
          </div>

          {/* right controls + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {status === 'loading' ? (
              <div className="w-12 h-9" />
            ) : !isAuthenticated ? (
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { onLoginClick(); setLoginDialogOpen(true) }}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  onClick={() => { onRegisterClick(); setRegisterDialogOpen(true) }}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(o => !o)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <CorporateMobileHeader
            headerNav={headerNav}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            status={status}
            onClose={() => setMobileMenuOpen(false)}
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
            onLogout={() => { onLogout(); setMobileMenuOpen(false) }}
          />
        )}
      </header>

      <LoginDialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        version="corporate"
        redirectTo="/corporate/dashboard"
      />
      <RegisterDialog
        isOpen={registerDialogOpen}
        onClose={() => setRegisterDialogOpen(false)}
        version="corporate"
        redirectTo="/corporate/dashboard"
      />
    </>
  )
}