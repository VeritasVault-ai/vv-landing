'use client'

/**
 * This is a bridge component that wraps VersionAwareHeader with error handling
 * for theme provider issues. It provides a fallback when the theme provider
 * is not available.
 */

import { useEffect, useState } from "react"
import { VersionAwareHeader as OriginalVersionAwareHeader } from "./VersionAwareHeader"

/**
 * Renders a version-aware header with graceful fallback for theme provider errors.
 *
 * Displays a minimal "Loading..." header until client-side hydration completes. If an error occurs during rendering of the original header (such as a missing theme provider), a fallback header with branding and authentication links is shown instead.
 *
 * @remark
 * This component catches runtime errors from the original header and provides a branded fallback UI to ensure the header remains functional even if the theme provider is unavailable.
 */
export function VersionAwareHeader() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a minimal header while client-side code is loading
    return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold">Loading...</span>
            </a>
          </div>
        </div>
      </header>
    )
  }

  if (hasError) {
    // Return a minimal header if there was an error with the theme provider
    return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.net</span>
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm font-medium">
              Sign In
            </a>
            <a
              href="/auth/register"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
    )
  }

  // Try to render the original header, but catch any errors
  try {
    return <OriginalVersionAwareHeader />
  } catch (error) {
    // If we encounter an error (like missing theme provider), update state and render fallback
    if (!hasError) {
      setHasError(true)
    }
    
    // Return fallback header
    return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.net</span>
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm font-medium">
              Sign In
            </a>
            <a
              href="/auth/register"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
    )
  }
}