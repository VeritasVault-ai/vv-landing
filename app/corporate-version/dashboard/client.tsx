"use client"

import Link from "next/link"

/**
 * Client component for the corporate dashboard page
 */
export function CorporateDashboardClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Corporate Dashboard</h1>
      <p className="text-lg mb-8 text-slate-700 dark:text-slate-300 max-w-md text-center">
        This page is currently being updated. Please check back later.
      </p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Return to Home
      </Link>
    </div>
  )
}