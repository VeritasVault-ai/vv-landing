'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { PerformanceOverview } from "./performance/performance-overview"
import { PerformanceComparison } from "./performance/performance-comparison"
import { PerformanceMetrics } from "./performance/performance-metrics"
import { HistoricalPerformance } from "./performance/historical-performance"
import { RiskAnalysis } from "./performance/risk-analysis"

/**
 * Strategy Performance Component
 * Displays detailed performance metrics and analytics for strategies
 */
export function StrategyPerformance() {
  // State for strategy selection
  const [selectedStrategy, setSelectedStrategy] = useState("all")
  
  // Mock data for strategies
  const strategies = [
    { id: "strat-1", name: "Balanced Yield Optimizer" },
    { id: "strat-2", name: "Stablecoin Liquidity Provider" },
    { id: "strat-3", name: "DeFi Blue Chip Portfolio" },
    { id: "strat-4", name: "Tezos Staking Optimizer" },
    { id: "strat-5", name: "Cross-Chain Arbitrage" }
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Strategy Performance Analysis</h3>
        <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strategies</SelectItem>
            {strategies.map(strategy => (
              <SelectItem key={strategy.id} value={strategy.id}>
                {strategy.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Performance tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5 h-10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <PerformanceOverview strategyId={selectedStrategy} />
        </TabsContent>
        
        <TabsContent value="historical">
          <HistoricalPerformance strategyId={selectedStrategy} />
        </TabsContent>
        
        <TabsContent value="comparison">
          <PerformanceComparison strategyId={selectedStrategy} />
        </TabsContent>
        
        <TabsContent value="metrics">
          <PerformanceMetrics strategyId={selectedStrategy} />
        </TabsContent>
        
        <TabsContent value="risk">
          <RiskAnalysis strategyId={selectedStrategy} />
        </TabsContent>
      </Tabs>
    </div>
  )
}