import { CorporateLandingPage } from "@/components/corporate/corporate-landing-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "VeritasVault | Enterprise Treasury Solutions",
  description: "Institutional-grade liquidity management for digital assets with advanced security and compliance features.",
}

/**
 * Marketing page for the corporate version of the application
 * Renders the corporate landing page
 */
export default function CorporateMarketingPage() {
  return <CorporateLandingPage />
}