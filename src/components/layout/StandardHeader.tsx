'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { getHeaderNavigationByExperience, HeaderNavigationItem, NavigationSubItem } from '@/lib/navigation'
import { useAnalytics } from '@/hooks/use-analytics'
import { useAuth } from '@/hooks/use-auth'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, User } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { LoginDialog } from '@/components/auth/login-dialog'
import { RegisterDialog } from '@/components/auth/register-dialog'
import { StandardMobileHeader } from './StandardMobileHeader'
import { cn } from '@/lib/utils'

export function StandardHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const { trackEvent } = useAnalytics()
  const { logout } = useAuth()

  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const headerNav = getHeaderNavigationByExperience('standard', isAuthenticated)
  const featuredItems = headerNav.filter(i => i.featured)
  const linkItems     = headerNav.filter(i => i.type === 'link' && !i.featured)
  const dropdownItems = headerNav.filter(i => i.type === 'dropdown' && i.items)

  const handleLoginClick = () => {
    trackEvent({ action:'login_click', category:'nav', label:'standard' })
    setLoginDialogOpen(true)
  }
  const handleRegisterClick = () => {
    trackEvent({ action:'register_click', category:'nav', label:'standard' })
    setRegisterDialogOpen(true)
  }
  const handleLogout = async () => { await logout() }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/90">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo & Nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="NeuralLiquid" width={32} height={32} className="dark:invert" />
              <span className="hidden font-bold sm:inline-block">NeuralLiquid</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {featuredItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
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
                <Link key={item.href} href={item.href} className={cn(
                  'transition-colors',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}>
                  {item.title}
                </Link>
              ))}
              {dropdownItems.map(item => item.items && (
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
                              <span className="text-xs text-muted-foreground">{sub.description}</span>
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
            {status === 'loading'
              ? <div className="w-12 h-9" />
              : !isAuthenticated
                ? (
                  <div className="hidden md:flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleLoginClick}>Log In</Button>
                    <Button size="sm" onClick={handleRegisterClick}>Sign Up</Button>
                  </div>
                )
                : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(o => !o)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <StandardMobileHeader
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

      <LoginDialog isOpen={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} version="standard" redirectTo="/dashboard"/>
      <RegisterDialog isOpen={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} version="standard" redirectTo="/dashboard"/>
    </>
  )
}
