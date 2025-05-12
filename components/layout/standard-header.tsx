"use client"

import { useState } from "react"
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
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { StandardMobileHeader } from "./standard-mobile-header"

export function StandardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const { trackEvent } = useAnalytics()
  const { logout } = useAuth()
  
  // Handle session safely with fallback for server-side rendering
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  
  // Only fetch navigation items when session status is known
  const headerNav = getHeaderNavigationByExperience('standard', isAuthenticated)
  
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
      custom_data: { version: "standard" },
    })
    setLoginDialogOpen(true)
  }

  const handleRegisterClick = () => {
    trackEvent({
      action: "register_button_click", 
      category: "navigation",
      label: "header_button",
      custom_data: { version: "standard" },
    })
    setRegisterDialogOpen(true)
  }
  
  const handleLogout = async () => {
    await logout()
  }
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
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
                    "transition-colors hover:text-foreground relative group font-medium", 
                    pathname === item.href 
                      ? "text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-emerald-600 dark:after:bg-emerald-500" 
                      : "text-foreground/70 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-1/3 hover:after:h-0.5 hover:after:bg-emerald-600/50 dark:hover:after:bg-emerald-500/50"
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
                    "transition-colors hover:text-foreground/80 relative group", 
                    pathname === item.href 
                      ? "text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-emerald-600/70 dark:after:bg-emerald-500/70" 
                      : "text-foreground/60"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Dropdown items */}
              {dropdownItems.map((item: HeaderNavigationItem, index: number) => (
                item.items && (
                  <DropdownMenu key={`dropdown-${index}`}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 hover:text-foreground/80 group">
                      {item.title}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.items.map((subItem: NavigationSubItem, subIndex: number) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link href={subItem.href || '#'}>
                            <div className="flex flex-col">
                              <span>{subItem.title}</span>
                              {subItem.description && (
                                <span className="text-xs text-muted-foreground">
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
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLoginClick}
                  className="text-foreground/70 hover:text-foreground hover:bg-background/80"
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleRegisterClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
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
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <StandardMobileHeader 
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
        version="standard"
        redirectTo="/standard/dashboard"
      />
      
      <RegisterDialog 
        isOpen={registerDialogOpen} 
        onClose={() => setRegisterDialogOpen(false)} 
        version="standard"
        redirectTo="/standard/dashboard"
      />
    </>
  )
}