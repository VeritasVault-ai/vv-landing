"use client"

import { ThemeProvider } from "@/src/context/ThemeProvider"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { VersionSelectionPageBridge } from "./VersionSelectionPageBridge"

/**
 * React component that sets the theme to "cosmic" on mount and renders the version selection page.
 *
 * Uses a bridge component to handle cases where theme providers might not be fully initialized.
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
      <VersionSelectionPageBridge />
    </ThemeProvider>
    ) 
}