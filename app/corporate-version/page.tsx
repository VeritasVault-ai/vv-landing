import { CorporateLandingPageWithTheme } from "@/components/corporate/corporate-landing-page-with-theme"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "VeritasVault.ai | Enterprise Treasury Solutions",
  description: "Institutional-grade liquidity management for digital assets with advanced security and compliance features.",
}

/**
 * Main page for the corporate version of the application
 * Renders the corporate landing page with theme provider
 */
export default function CorporateVersionPage() {
  return <CorporateLandingPageWithTheme />
}