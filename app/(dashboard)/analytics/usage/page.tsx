import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export const metadata = {
  title: "Usage Analytics - NeuralLiquid",
  description: "View insights about your platform usage",
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Usage Analytics</h1>
      <AnalyticsDashboard />
    </div>
  )
}
