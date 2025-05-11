import type { Metadata } from "next"
import HistoricalDataChart from "@/components/historical-data-chart"
import ProtocolMetrics from "@/components/protocol-metrics"

export const metadata: Metadata = {
  title: "Historical Data Analysis | LiquidAI",
  description: "Historical TVL and APY data analysis for DeFi protocols",
}

export default function HistoricalDataPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Historical Data Analysis</h1>
        <p className="text-muted-foreground">
          Analyze historical TVL and APY data from DeFi protocols powered by Goldsky
        </p>
      </div>

      <div className="grid gap-6">
        <HistoricalDataChart />
        <ProtocolMetrics />
      </div>
    </div>
  )
}
