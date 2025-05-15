"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { trackPageView, trackError } from "@/lib/analytics/enhanced-client-analytics"
import { useTheme } from "next-themes"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"

// Dynamically import with no SSR
const CorporateLandingPageClient = dynamic(
  () => import("@/components/corporate/corporate-landing-page-client").catch(err => {
    // Log any errors loading the component
    trackError('component_load_error', err.message, 'CorporateLandingPageClient')
    throw err
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Loading Enterprise Experience</h2>
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }
)

/**
 * Client component that renders the corporate landing page
 * This ensures the landing page is only rendered on the client side
 * Also handles analytics tracking with IP logging and applies theme from URL
 */
export function CorporateVersionClient() {
  const searchParams = useSearchParams()
  const themeParam = searchParams.get('theme')
  const { setTheme } = useTheme()
  const robustTheme = useRobustTheme()
  
  useEffect(() => {
    // Track page view with enhanced analytics
    trackPageView()
    
    // Apply theme from URL parameter if present
    if (themeParam) {
      console.log('Applying theme from URL parameter:', themeParam)
      
      // Extract color mode and variant from theme parameter (e.g., "corporate-dark")
      const [variant, colorMode] = themeParam.split('-')
      
      // Apply color mode using next-themes
      if (colorMode) {
        setTheme(colorMode)
      }
      
      // Apply variant using robust theme provider
      if (variant && robustTheme.setThemeVariant) {
        robustTheme.setThemeVariant(variant as any)
      }
      
      // If using the robust theme provider directly
      if (colorMode && robustTheme.setColorMode) {
        robustTheme.setColorMode(colorMode as any)
      }
      
      // Store the preference in localStorage for persistence
      try {
        localStorage.setItem('theme-preference', themeParam)
      } catch (error) {
        console.error('Failed to store theme preference:', error)
      }
    }
    
    // Log any authentication errors
    const checkAuth = async () => {
      try {
        // Check if we have a session or token
        const hasSession = localStorage.getItem('auth_session') || sessionStorage.getItem('auth_session')
        
        if (!hasSession) {
          console.log('No authentication session found - this is normal for public pages')
        }
      } catch (error) {
        // Track any errors related to authentication
        trackError('auth_check_error', error instanceof Error ? error.message : 'Unknown error', 'CorporateVersionClient')
      }
    }
    
    checkAuth()
  }, [themeParam, setTheme, robustTheme])
  
  return (
    <div className="corporate-version-container">
      <CorporateLandingPageClient />
    </div>
  )
}