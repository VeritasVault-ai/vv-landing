import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardPageBridge } from "./page-bridge"

export const metadata: Metadata = {
  title: "Dashboard | VeritasVault.net",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

/**
 * Renders the corporate dashboard page with asynchronous loading and a fallback UI.
 *
 * Wraps the dashboard content in a client-side bridge to prevent server-side rendering errors caused by context providers.
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
      <DashboardPageBridge />
    </Suspense>
  );
}