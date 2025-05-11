import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { ErrorBoundary } from "@/components/ui/error-boundary"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <ErrorBoundary>
        <PredictiveAnalytics />
      </ErrorBoundary>
    </div>
  )
}
