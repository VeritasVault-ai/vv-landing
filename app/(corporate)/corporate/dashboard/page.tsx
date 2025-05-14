import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardPageBridge } from "./page-bridge"

export const metadata: Metadata = {
  title: "Dashboard | VeritasVault.ai",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

/**
 * Displays the corporate dashboard page, rendering its content asynchronously with a loading fallback.
 *
 * Uses a client-side bridge component to avoid server-side rendering errors related to context providers.
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
      <DashboardPageBridge />
    </Suspense>
  );
}