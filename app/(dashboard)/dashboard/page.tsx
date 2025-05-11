import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ErrorBoundary } from "@/components/ui/error-boundary"

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardOverview />
    </ErrorBoundary>
  )
}
