import { Suspense } from "react"
import { DashboardContent } from "./dashboard-content"
import { Skeleton } from "@/components/ui/skeleton"

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

/**
 * Loading skeleton for the dashboard
 */
function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32 mt-4 md:mt-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}