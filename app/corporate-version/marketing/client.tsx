"use client"

import dynamic from "next/dynamic"

// Dynamically import with no SSR
const CorporateLandingClientOnly = dynamic(
  () => import("@/components/corporate/corporate-landing-client-only"),
  { ssr: false }
)

/**
 * Client component that renders the corporate landing page for marketing
 * This ensures the landing page is only rendered on the client side
 */
export function CorporateMarketingClient() {
  return <CorporateLandingClientOnly />
}