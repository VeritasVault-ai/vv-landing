import { Suspense } from "react"
import DashboardLoading from "./loading"
import { DashboardContent } from "./dashboard-content"

export const metadata = {
  title: "Dashboard | VeritasVault.net",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

/**
 * Dashboard page component that renders the dashboard content with a loading fallback
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
