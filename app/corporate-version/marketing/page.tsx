import { Metadata } from "next"
import { CorporateMarketingClient } from "./client"

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "VeritasVault | Enterprise Treasury Solutions",
  description: "Institutional-grade liquidity management for digital assets with advanced security and compliance features.",
}

/**
 * Marketing page for the corporate version of the application
 * Uses a client-only approach to prevent SSR issues with theme hooks
 */
export default function CorporateMarketingPage() {
  return <CorporateMarketingClient />
}