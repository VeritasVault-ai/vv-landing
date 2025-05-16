// src/components/layout/StandardHeader.tsx
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
import { STANDARD_PRODUCT_NAME } from '@/lib/config/product-info'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/src/components/ThemeToggle'
import { ChevronDown, Menu, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StandardMobileHeader } from './StandardMobileHeader'
import { CommonHeaderProps } from './VersionAwareHeader'

/**
 * Renders a responsive website header with navigation, authentication controls, and theme toggling.
 *
 * Displays navigation links, dropdown menus, and featured items based on the provided navigation data. Shows authentication buttons or a user menu depending on authentication state, and adapts layout for mobile devices with a collapsible menu. Includes login and registration dialogs that redirect to the dashboard on success.
 *
 * @param headerNav - Array of navigation items to display in the header.
 * @param pathname - Current URL path for active link highlighting.
 * @param isAuthenticated - Indicates if the user is authenticated.
 * @param status - Current authentication or loading status.
 * @param onClose - Callback invoked when the mobile menu is closed.
 * @param onLoginClick - Callback invoked when the login button is clicked.
 * @param onRegisterClick - Callback invoked when the register button is clicked.
 * @param onLogout - Callback invoked when the user logs out.
 */
export function StandardHeader({
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
  const [isScrolled, setIsScrolled] = useState(false)

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // split nav items
  const featuredItems  = headerNav.filter(i => i.featured)
  const linkItems      = headerNav.filter(i => i.type === 'link' && !i.featured)
  const dropdownItems  = headerNav.filter(i => i.type === 'dropdown' && i.items)

  // open/close dialogs
  const handleLoginOpen    = () => setLoginDialogOpen(true)
  const handleRegisterOpen = () => setRegisterDialogOpen(true)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b shadow-sm'
            : 'bg-background/70 backdrop-blur-sm border-b'
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo & Nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt={STANDARD_PRODUCT_NAME}
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                {STANDARD_PRODUCT_NAME}
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {featuredItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    'font-medium group',
                    pathname === item.href
                      ? 'text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-emerald-600'
                      : 'text-foreground/70 hover:text-foreground'
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
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {item.title}
                </Link>
              ))}

              {dropdownItems.map(item => (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 hover:text-foreground">
                    {item.title} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items!.map(sub => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <Link href={sub.href!}>
                          <div className="flex flex-col">
                            <span>{sub.title}</span>
                            {sub.description && (
                              <span className="text-xs text-muted-foreground">
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

          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {status === 'loading' ? (
              <div className="w-12 h-9" />
            ) : !isAuthenticated ? (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { onLoginClick(); handleLoginOpen() }}>
                  Log In
                </Button>
                <Button size="sm" onClick={() => { onRegisterClick(); handleRegisterOpen() }}>
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
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <StandardMobileHeader
            headerNav={headerNav}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            status={status}
            onClose={() => setMobileMenuOpen(false)}
            onLoginClick={() => { onLoginClick(); handleLoginOpen() }}
            onRegisterClick={() => { onRegisterClick(); handleRegisterOpen() }}
            onLogout={() => { onLogout(); setMobileMenuOpen(false) }}
          />
        )}
      </header>

      <LoginDialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        version="standard"
        redirectTo="/dashboard"
      />
      <RegisterDialog
        isOpen={registerDialogOpen}
        onClose={() => setRegisterDialogOpen(false)}
        version="standard"
        redirectTo="/dashboard"
      />
    </>
  )
}