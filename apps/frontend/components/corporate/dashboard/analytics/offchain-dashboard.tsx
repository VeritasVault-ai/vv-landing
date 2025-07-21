'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics'
import { DashboardActivity } from '@/components/dashboard/dashboard-activity'
import { MarketComparisonChart } from "./charts/market-comparison-chart"
import { CorrelationAnalysisChart } from "./charts/correlation-analysis-chart"
import { MacroeconomicIndicatorsChart } from "./charts/macroeconomic-indicators-chart"
import { CrossChainComparisonTable } from "./tables/cross-chain-comparison-table"

interface OffChainDashboardProps {
  fullView?: boolean
}

/**
 * Off-Chain Analytics Dashboard component
 * Displays market data, traditional finance metrics, and cross-chain comparisons
 */
export function OffChainDashboard({ fullView = true }: OffChainDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
            <CardDescription>Traditional vs Crypto Markets Performance</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <MarketComparisonChart />
          </CardContent>
        </Card>
        
        {/* Correlation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Correlation Analysis</CardTitle>
            <CardDescription>Relationship between crypto and traditional assets</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <CorrelationAnalysisChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Macroeconomic Indicators */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Macroeconomic Indicators</CardTitle>
            <CardDescription>Key economic metrics affecting markets</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <MacroeconomicIndicatorsChart />
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Market Events</CardTitle>
            <CardDescription>Recent significant market events</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActivity limit={5} />
          </CardContent>
        </Card>
      </div>
      
      {fullView && (
        <Card>
          <CardHeader>
            <CardTitle>Cross-Chain Comparison</CardTitle>
            <CardDescription>Performance metrics across different blockchains</CardDescription>
          </CardHeader>
          <CardContent>
            <CrossChainComparisonTable />
          </CardContent>
        </Card>
      )}
    </div>
  )
}