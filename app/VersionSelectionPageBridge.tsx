'use client'

/**
 * This is a bridge component that wraps EnhancedVersionSelectionPage with error handling
 * for theme provider issues. It provides a fallback when the theme provider
 * is not available.
 */

import { useState, useEffect } from "react"
import { EnhancedVersionSelectionPage } from "./VersionSelectionPage"
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"

export function VersionSelectionPageBridge() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Once mounted, try to use the unified theme hook
  useEffect(() => {
    if (mounted) {
      try {
        // This will safely check if theme providers are available
        const { isDark } = useUnifiedTheme()
        console.log("Theme detected:", isDark ? "dark" : "light")
      } catch (error) {
        console.warn("Theme provider not available on initial load:", error)
        setHasError(true)
      }
    }
  }, [mounted])

  if (!mounted) {
    // Return a minimal loading state while client-side code is initializing
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading VeritasVault.ai</h1>
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // If there was an error with the theme provider, render a fallback version
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Welcome to VeritasVault.ai</h1>
            <p className="text-xl">Choose your experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
              href="/standard"
              className="block p-8 bg-blue-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all"
            >
              <h2 className="text-2xl font-bold mb-4">Standard Version</h2>
              <p>For individual investors and DeFi enthusiasts</p>
            </a>
            
            <a 
              href="/corporate"
              className="block p-8 bg-indigo-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all"
            >
              <h2 className="text-2xl font-bold mb-4">Corporate Version</h2>
              <p>For institutional investors and enterprise users</p>
            </a>
          </div>
        </div>
      </div>
    )
  }

  // If everything is fine, render the original component
  try {
    return <EnhancedVersionSelectionPage />
  } catch (error) {
    // If we encounter an error, update state and render fallback on next render
    if (!hasError) {
      setHasError(true)
    }
    
    // Return minimal fallback for this render
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to VeritasVault.ai</h1>
          <div className="flex gap-4 justify-center mt-8">
            <a href="/standard" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
              Standard Version
            </a>
            <a href="/corporate" className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Corporate Version
            </a>
          </div>
        </div>
      </div>
    )
  }
}