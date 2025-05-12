'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { HeaderNavigationItem, NavigationSubItem, getHeaderNavigationByExperience } from '@/lib/navigation'
import { useAnalytics } from '@/hooks/use-analytics'
import { useAuth } from '@/hooks/use-auth'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, User, X } from 'lucide-react'
import { ThemeToggle } from '@/src/components/ThemeToggle'
import { LoginDialog } from '@/components/auth/login-dialog'
import { RegisterDialog } from '@/components/auth/register-dialog'
import { CorporateMobileHeader } from './CorporateMobileHeader'
import { cn } from '@/lib/utils'
import { EventCategory } from '@/lib/analytics/event-taxonomy'

/**
 * Renders the responsive corporate website header with navigation, authentication controls, and theme toggling.
 *
 * Displays navigation items based on authentication status and user experience, including featured links, regular links, and dropdown menus. Provides login, registration, and logout functionality, as well as a theme toggle and mobile menu support. Authentication dialogs and analytics tracking are integrated.
 */
export function CorporateHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const { trackEvent } = useAnalytics()
  const { logout } = useAuth()

  // session + auth
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const { data: session, status } = useSession()
  const isAuthenticated = mounted && status === 'authenticated'

  // nav items
  const headerNav = mounted
    ? getHeaderNavigationByExperience('corporate', isAuthenticated)
    : []

  const featuredItems = headerNav.filter(i => i.featured)
  const linkItems     = headerNav.filter(i => i.type === 'link' && !i.featured)
  const dropdownItems = headerNav.filter(i => i.type === 'dropdown' && i.items)

  const handleLoginClick = () => {
    trackEvent('login_click', EventCategory.NAVIGATION, { label: 'corporate' })
    setLoginDialogOpen(true)
  }

  const handleRegisterClick = () => {
    trackEvent('register_click', EventCategory.NAVIGATION, { label: 'corporate' })
    setRegisterDialogOpen(true)
  }
  
  const handleLogout = async () => { await logout() }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 dark:border-slate-800">
        <div className="container flex h-16 items-center justify-between">
          {/* logo + desktop nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-corporate.svg" alt="VV.ai" width={32} height={32} className="dark:invert" />
              <span className="hidden font-bold sm:inline">VeritasVault</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {featuredItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
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
                  href={item.href}
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
                    {item.title} <ChevronDown className="h-4 w-4" />
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

            {status === 'loading'
              ? <div className="w-12 h-9" />
              : !isAuthenticated
                ? (
                  <div className="hidden md:flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleLoginClick}>Log In</Button>
                    <Button size="sm" onClick={handleRegisterClick}>Sign Up</Button>
                  </div>
                )
                : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
            }

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
            status={status as any}
            onClose={() => setMobileMenuOpen(false)}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            onLogout={() => { handleLogout(); setMobileMenuOpen(false) }}
          />
        )}
      </header>

      <LoginDialog isOpen={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} version="corporate" redirectTo="/corporate/dashboard"/>
      <RegisterDialog isOpen={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} version="corporate" redirectTo="/corporate/dashboard"/>
    </>
  )
}
