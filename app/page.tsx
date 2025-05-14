"use client"

import { ThemeProvider } from "@/src/context/ThemeProvider"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { EnhancedVersionSelectionPage } from "./VersionSelectionPage"

/**
 * React component that applies the "cosmic" theme on mount and renders the version selection page within a theme context.
 *
 * @returns The version selection page wrapped in a theme provider with the "cosmic" theme active.
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