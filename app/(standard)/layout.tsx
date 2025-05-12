"use client"

import { StandardFooter } from "@/components/layout/standard-footer"
import { StandardHeader } from "@/components/layout/standard-header"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeScript } from "@/components/theme-script"
import { getCookie, setCookie } from "@/lib/cookies"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { ReactNode, Suspense, useEffect } from "react"

// Create a client component that uses the searchParams hook
function ThemeHandler() {
  const { setTheme } = useTheme()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check for theme in URL parameters
    const themeParam = searchParams?.get("theme")
    const preferredTheme = getCookie("preferred-theme")
    
    if (themeParam) {
      // If theme is in URL, use it and save to cookie
      setTheme(themeParam)
      setCookie("preferred-theme", themeParam, 30)
    } else if (preferredTheme) {
      // Otherwise use the preferred theme from cookie
      setTheme(preferredTheme)
    }
    
    // Save experience preference
    setCookie("preferred-experience", "standard", 30)
  }, [searchParams, setTheme])
  
  return null
}

export default function StandardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider version="standard">
      <Suspense fallback={null}>
        <ThemeScript version="standard" />
      </Suspense>
      <Suspense fallback={null}>
        <ThemeHandler />
      </Suspense>
      
      <div className="min-h-screen flex flex-col">
        <div className="header-group sticky top-0 z-50 w-full">
          {/* Optional announcement banner could go here */}
          <StandardHeader />
        </div>
        <main className="flex-grow">{children}</main>
        <div className="footer-group">
          <StandardFooter />
        </div>
      </div>
    </ThemeProvider>
  )
}