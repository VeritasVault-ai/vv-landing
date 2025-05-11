import { AnalyticsGuide } from "@/components/analytics/analytics-guide"

export const metadata = {
  title: "Analytics Reports - NeuralLiquid",
  description: "Set up custom reports for your Tezos Liquidity Management platform",
}

export default function AnalyticsReportsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Reports</h1>
      <AnalyticsGuide />
    </div>
  )
}
