"use client"

import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAnalytics } from "@/hooks/use-analytics"
import { useAuth } from "@/hooks/use-auth"
import {
  HeaderNavigationItem,
  NavigationSubItem,
  getHeaderNavigationByExperience
} from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, User, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CorporateMobileHeader } from "./corporate-mobile-header"

/**
 * Renders a responsive corporate website header with dynamic navigation, authentication controls, and theme toggling.
 *
 * The header adapts its navigation and authentication UI based on the user's authentication status, supports both desktop and mobile layouts, and provides dialogs for login and registration. Navigation items are dynamically fetched and categorized for display. Includes analytics tracking for authentication actions.
 *
 * @returns The corporate header React element.
 */
export function CorporateHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const { trackEvent } = useAnalytics()
  const { logout } = useAuth()
  
  // Client-side only rendering for session
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Handle session safely with fallback for server-side rendering
  const { data: session, status } = useSession()
  const isAuthenticated = mounted && status === 'authenticated'
  
  // Only fetch navigation items when component is mounted
  const headerNav = mounted ? getHeaderNavigationByExperience('corporate', isAuthenticated) : []
  
  // Separate featured items from regular items
  const featuredItems = headerNav.filter(item => item.featured)
  const regularItems = headerNav.filter(item => !item.featured)
  
  // Group non-featured navigation items by type for better organization
  const linkItems = regularItems.filter(item => item.type === 'link')
  const dropdownItems = regularItems.filter(item => item.type === 'dropdown')

  // Handle login/register button clicks with analytics tracking
  const handleLoginClick = () => {
    trackEvent({
      action: "login_button_click",
      category: "navigation",
      label: "header_button",
      custom_data: { version: "corporate" },
    })
    setLoginDialogOpen(true)
  }

  const handleRegisterClick = () => {
    trackEvent({
      action: "register_button_click", 
      category: "navigation",
      label: "header_button",
      custom_data: { version: "corporate" },
    })
    setRegisterDialogOpen(true)
  }
  
  const handleLogout = async () => {
    await logout()
  }
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo-corporate.svg" 
                alt="VeritasVault Logo" 
                width={32} 
                height={32} 
                className="dark:invert" 
              />
              <span className="hidden font-bold sm:inline-block">VeritasVault</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm ml-6">
              {/* Featured navigation items - given special treatment */}
              {featuredItems.map((item: HeaderNavigationItem, index: number) => (
                <Link 
                  key={`featured-${index}`}
                  href={item.href || '#'} 
                  className={cn(
                    "transition-colors hover:text-slate-900 dark:hover:text-white relative group font-medium", 
                    pathname === item.href 
                      ? "text-slate-900 dark:text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400" 
                      : "text-slate-800 dark:text-slate-200 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-1/3 hover:after:h-0.5 hover:after:bg-blue-600/50 dark:hover:after:bg-blue-400/50"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Regular link items */}
              {linkItems.map((item: HeaderNavigationItem, index: number) => (
                <Link 
                  key={`link-${index}`}
                  href={item.href || '#'} 
                  className={cn(
                    "transition-colors hover:text-slate-900/80 dark:hover:text-slate-100/80 relative group", 
                    pathname === item.href 
                      ? "text-slate-900 dark:text-slate-100 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600/70 dark:after:bg-blue-400/70" 
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Dropdown items */}
              {dropdownItems.map((item: HeaderNavigationItem, index: number) => (
                item.items && (
                  <DropdownMenu key={`dropdown-${index}`}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 group">
                      {item.title}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="border-slate-200 dark:border-slate-700">
                      {item.items.map((subItem: NavigationSubItem, subIndex: number) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link href={subItem.href || '#'}>
                            <div className="flex flex-col">
                              <span>{subItem.title}</span>
                              {subItem.description && (
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {subItem.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {status === 'loading' ? (
              // Show a placeholder or loading state while session is loading
              <div className="w-[120px] h-9"></div>
            ) : !isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLoginClick}
                  className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleRegisterClick}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-slate-200 dark:border-slate-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="text-slate-700 dark:text-slate-300">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="text-slate-700 dark:text-slate-300">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="text-slate-700 dark:text-slate-300">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600 dark:text-red-400"
                    onClick={handleLogout}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <CorporateMobileHeader 
            headerNav={headerNav}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            status={status}
            onClose={() => setMobileMenuOpen(false)}
            onLoginClick={() => {
              handleLoginClick()
              setMobileMenuOpen(false)
            }}
            onRegisterClick={() => {
              handleRegisterClick()
              setMobileMenuOpen(false)
            }}
            onLogout={() => {
              handleLogout()
              setMobileMenuOpen(false)
            }}
          />
        )}
      </header>
      
      {/* Auth dialogs */}
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