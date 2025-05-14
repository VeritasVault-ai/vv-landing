'use client'

/**
 * This is a bridge component that wraps VersionAwareFooter with error handling
 * for theme provider issues. It provides a fallback when the theme provider
 * is not available.
 */

import { useState, useEffect } from "react"
import { VersionAwareFooter as OriginalVersionAwareFooter } from "./VersionAwareFooter"

export function VersionAwareFooter() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a minimal footer while client-side code is loading
    return (
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }

  if (hasError) {
    // Return a minimal footer if there was an error with the theme provider
    return (
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }

  // Try to render the original footer, but catch any errors
  try {
    return <OriginalVersionAwareFooter />
  } catch (error) {
    // If we encounter an error (like missing theme provider), update state and render fallback
    if (!hasError) {
      setHasError(true)
    }
    
    // Return fallback footer
    return (
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
}