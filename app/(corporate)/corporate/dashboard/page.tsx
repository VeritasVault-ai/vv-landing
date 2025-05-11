import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardContent } from "./dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard | VeritasVault.ai",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}