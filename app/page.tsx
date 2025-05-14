"use client"

import { ThemeProvider } from "@/src/context/ThemeProvider"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { EnhancedVersionSelectionPage } from "./VersionSelectionPage"

/**
 * React component that sets the theme to "cosmic" on mount and renders the version selection page.
 *
 * @returns The version selection page component with the "cosmic" theme applied.
 */
export default function Home() {
  const { setTheme } = useTheme()
  
  // Set cosmic theme for the landing page
  useEffect(() => {
    setTheme("cosmic")
  }, [setTheme])

  return ( 
    <ThemeProvider>
      <EnhancedVersionSelectionPage />
    </ThemeProvider>
    ) 
}