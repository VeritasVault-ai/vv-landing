"use client"

import { useEffect, useState } from "react"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Client-only component that dynamically loads the CorporateLandingPage
 * This ensures the component is only rendered in the browser, never during SSR
 */
export default function CorporateLandingClientOnly() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Only import the component on the client side
    import("./corporate-landing-page").then((mod) => {
      setComponent(() => mod.CorporateLandingPage)
    })
  }, [])

  // Show loading state until component is loaded
  if (!Component) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Render the component with theme provider
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <Component />
    </ThemeProvider>
  )
}