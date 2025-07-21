'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChainActivityChart } from "./charts/chain-activity-chart"
import { ProtocolMetricsChart } from "./charts/protocol-metrics-chart"
import { TokenTransfersList } from "./lists/token-transfers-list"
import { LiquidityPoolsTable } from "./tables/liquidity-pools-table"
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics'

interface OnChainDashboardProps {
  fullView?: boolean
}

/**
 * On-Chain Analytics Dashboard component
 * Displays blockchain data, protocol metrics, token transfers, and liquidity pools
 */
export function OnChainDashboard({ fullView = true }: OnChainDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chain Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Chain Activity</CardTitle>
            <CardDescription>Transaction volume and gas usage</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChainActivityChart />
          </CardContent>
        </Card>
        
        {/* Protocol Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Protocol Metrics</CardTitle>
            <CardDescription>Key protocol performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ProtocolMetricsChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>Token Transfers</CardTitle>
            <CardDescription>Recent significant token movements</CardDescription>
          </CardHeader>
          <CardContent>
            <TokenTransfersList limit={fullView ? 10 : 5} />
          </CardContent>
        </Card>
        
        {/* Liquidity Pools */}
        <Card>
          <CardHeader>
            <CardTitle>Liquidity Pools</CardTitle>
            <CardDescription>Top liquidity pools by volume</CardDescription>
          </CardHeader>
          <CardContent>
            <LiquidityPoolsTable limit={fullView ? 10 : 5} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}