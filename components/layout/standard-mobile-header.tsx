"use client"

import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/use-analytics"
import {
    HeaderNavigationItem,
    NavigationSubItem,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface StandardMobileHeaderProps {
  headerNav: HeaderNavigationItem[]
  pathname: string
  isAuthenticated: boolean
  status: "loading" | "authenticated" | "unauthenticated"
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
  onLogout
}: StandardMobileHeaderProps) {
  const { trackEvent } = useAnalytics()
  
  // Separate featured items from regular items
  const featuredItems = headerNav.filter(item => item.featured)
  const regularItems = headerNav.filter(item => !item.featured)
  
  return (
    <div className="md:hidden border-t border-border/40 bg-background">
      <div className="container py-4 space-y-4">
        {/* Featured items at the top of mobile menu */}
        {featuredItems.length > 0 && (
          <div className="space-y-1 mb-2">
            {featuredItems.map((item: HeaderNavigationItem, index: number) => (
              <Link
                key={`mobile-featured-${index}`}
                href={item.href || '#'}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-md hover:bg-muted transition-colors",
                  pathname === item.href
                    ? "text-foreground bg-muted/80 border-l-2 border-emerald-600 dark:border-emerald-500"
                    : "text-foreground/80 border-l-2 border-transparent"
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
        
        {/* Regular mobile navigation links */}
        {regularItems.map((item: HeaderNavigationItem, index: number) => {
          if (item.type === 'link') {
            return (
              <Link
                key={`mobile-link-${index}`}
                href={item.href || '#'}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-md hover:bg-muted transition-colors",
                  pathname === item.href
                    ? "text-foreground bg-muted border-l-2 border-emerald-600/70 dark:border-emerald-500/70"
                    : "text-foreground/70 border-l-2 border-transparent"
                )}
                onClick={onClose}
              >
                {item.title}
              </Link>
            )
          } else if (item.type === 'dropdown' && item.items) {
            return (
              <div key={`mobile-dropdown-${index}`} className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.items.map((subItem: NavigationSubItem, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.href || '#'}
                      className={cn(
                        "block px-6 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors",
                        pathname === subItem.href
                          ? "text-foreground bg-muted"
                          : "text-foreground/70"
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
              className="w-full"
              onClick={onLoginClick}
            >
              Log In
            </Button>
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={onRegisterClick}
            >
              Sign Up
            </Button>
          </div>
        )}
        
        {/* Mobile user menu when logged in */}
        {isAuthenticated && (
          <div className="mt-6 px-4 space-y-2">
            <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
              Account
            </h3>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={onClose}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={onClose}
              >
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors text-red-500 hover:text-red-600"
                onClick={() => {
                  trackEvent({
                    action: "logout",
                    category: "authentication",
                    label: "mobile_menu",
                    custom_data: { version: "standard" },
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