"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the client component with no SSR
const CorporateLandingPageClient = dynamic(
  () => import("@/components/corporate/corporate-landing-page-client"),
  { ssr: false }
)

/**
 * Client component wrapper for dynamically loading the corporate landing page
 * This component handles the dynamic import with ssr: false
 */
export function CorporatePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CorporateLandingPageClient />
    </Suspense>
  )
}