import { Metadata } from "next"
import { CorporateDashboardClient } from "./client"

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "VeritasVault | Corporate Dashboard",
  description: "Enterprise dashboard for digital asset management and treasury operations.",
}

/**
 * Dashboard page for the corporate version of the application
 * Uses a client-only approach to prevent SSR issues with theme hooks
 */
export default function CorporateDashboardPage() {
  return <CorporateDashboardClient />
}