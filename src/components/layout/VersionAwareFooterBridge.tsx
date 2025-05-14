'use client'

/**
 * This is a bridge component that wraps VersionAwareFooter with error handling
 * for theme provider issues. It provides a fallback when the theme provider
 * is not available.
 */

import { useState, useEffect } from "react"
import { VersionAwareFooter as OriginalVersionAwareFooter } from "./VersionAwareFooter"

/**
 * Renders a version-aware footer with graceful fallback if the original footer fails to render.
 *
 * Displays the original themed footer when possible. If the component is not yet mounted on the client or an error occurs (such as a missing theme provider), a minimal static footer is shown instead.
 *
 * @returns The themed footer or a static fallback footer if rendering fails.
 *
 * @remark If an error occurs during rendering (e.g., due to a missing theme provider), the component automatically falls back to a static footer to prevent UI breakage.
 */
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