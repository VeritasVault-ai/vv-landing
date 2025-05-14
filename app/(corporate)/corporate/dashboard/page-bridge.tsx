'use client'

import { useState, useEffect } from "react"
import { DashboardContent } from "./dashboard-content"

/**
 * Defers rendering of the dashboard content until the component is mounted on the client.
 *
 * Displays a loading UI until client-side rendering is confirmed, then renders the dashboard to avoid server-side rendering issues with context providers.
 */
export function DashboardPageBridge() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a loading state while client-side code is initializing
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading Dashboard...</h2>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // Once mounted on the client, render the actual dashboard content
  return <DashboardContent />
}