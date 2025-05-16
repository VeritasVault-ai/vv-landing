import { Suspense } from "react"
import DashboardLoading from "./loading"
import { DashboardContent } from "./dashboard-content"

export const metadata = {
  title: "Dashboard | VeritasVault.net",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

/**
 * Displays the corporate dashboard page with a loading indicator while content is loading.
 *
 * Renders the dashboard content inside a React Suspense boundary, showing a loading fallback until the content is ready.
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
