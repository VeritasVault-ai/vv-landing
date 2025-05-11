"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RiskAssessment from "@/components/risk-assessment"

export function PortfolioOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
        <CardDescription>Simulated portfolio performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Liquidity</span>
            <span className="text-xl font-bold">$100,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Predicted Yield</span>
            <span className="text-lg font-semibold text-emerald-500">+14.2% annually</span>
          </div>
        </div>

        <div className="space-y-2">
          <RiskAssessment compact />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Asset Allocation</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Stable Pools</div>
              <div className="text-sm font-medium">40%</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Medium Risk</div>
              <div className="text-sm font-medium">35%</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">High Yield</div>
              <div className="text-sm font-medium">20%</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Flash Loans</div>
              <div className="text-sm font-medium">5%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
