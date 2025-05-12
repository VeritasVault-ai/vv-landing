import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardContent } from "./dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard | VeritasVault.ai",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

/**
 * Displays the corporate dashboard page, rendering its content asynchronously with a loading fallback.
 *
 * Wraps the main dashboard content in a React Suspense boundary to handle asynchronous loading states.
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}