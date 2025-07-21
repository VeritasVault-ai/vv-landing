"use client"

import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { CorporateSidebar } from "@/components/corporate/corporate-sidebar"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

/**
 * Client component layout for all corporate version pages
 * Provides theme context for all child pages and includes header, sidebar, and footer
 * Uses the RobustThemeProvider to ensure theme context is always available
 */
export function CorporateLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check if current path is a dashboard or related page
  const isDashboardPage = pathname?.includes('/corporate/dashboard') || 
                          pathname?.includes('/corporate/portfolio') ||
                          pathname?.includes('/corporate/analytics') ||
                          pathname?.includes('/corporate/compliance') ||
                          pathname?.includes('/corporate/reports') ||
                          pathname?.includes('/corporate/team') ||
                          pathname?.includes('/corporate/settings')
  
  // For demo purposes, automatically set logged in state when on dashboard pages
  useEffect(() => {
    if (isDashboardPage) {
      setIsLoggedIn(true)
    }
  }, [isDashboardPage])
  
  // Determine if sidebar should be shown (only when logged in and on dashboard pages)
  const showSidebar = isLoggedIn && isDashboardPage
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="flex flex-col min-h-screen">
        <UnifiedHeader 
          variant="dashboard"
          showSearch={isDashboardPage}
          showNotifications={isDashboardPage}
          showUserMenu={isLoggedIn}
          isAuthenticated={isLoggedIn}
          userMenuProps={{
            onLogout: handleLogout
          }}
        />
        <div className="flex flex-1">
          {showSidebar && <CorporateSidebar />}
          <main 
            className={`flex-grow transition-all duration-300 ${
              showSidebar ? 'md:ml-64 ml-16' : ''
            }`}
          >
            {children}
          </main>
        </div>
        <UnifiedFooter 
          variant="corporate"
          showNewsletter={!isDashboardPage}
        />
      </div>
    </RobustThemeProvider>
  )
}