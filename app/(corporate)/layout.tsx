"use client"

import { ReactNode, useEffect, Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CorporateHeader } from "@/components/layout/corporate-header"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { CorporateFooter } from "@/components/layout/corporate-footer"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { getCookie, setCookie } from "@/lib/cookies"
import { ThemeScript } from "@/components/theme-script"

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
    setCookie("preferred-experience", "corporate", 30)
  }, [searchParams, setTheme])
  
  return null
}

export default function CorporateLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider version="corporate">
      <Suspense fallback={null}>
        <ThemeScript version="corporate" />
      </Suspense>
      
      <Suspense fallback={null}>
        <ThemeHandler />
      </Suspense>
      
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        <main className="flex-grow">{children}</main>
        <SimpleFooter version="corporate" />
        <CorporateFooter />
      </div>
    </ThemeProvider>
  )
}