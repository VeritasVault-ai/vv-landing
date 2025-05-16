'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ReturnsChart } from "./returns-chart"
import { ValueGrowthChart } from "./value-growth-chart"
import { DrawdownChart } from "./drawdown-chart"
import { PerformanceTable } from "./performance-table"
import { PerformanceHeatmap } from "./performance-heatmap"

interface HistoricalPerformanceProps {
  strategyId: string
}

/**
 * Historical Performance Component
 * Displays detailed historical performance data with multiple views and timeframes
 */
export function HistoricalPerformance({ strategyId }: HistoricalPerformanceProps) {
  // State for timeframe selection
  const [timeframe, setTimeframe] = useState("1y")
  
  // Available timeframes
  const timeframes = [
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
    { value: "all", label: "All Time" }
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Historical Performance Analysis</h3>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            {timeframes.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="returns" className="space-y-4">
        <TabsList className="grid grid-cols-5 h-10">
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="growth">Value Growth</TabsTrigger>
          <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="returns">
          <Card>
            <CardContent className="pt-6">
              <ReturnsChart strategyId={strategyId} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth">
          <Card>
            <CardContent className="pt-6">
              <ValueGrowthChart strategyId={strategyId} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drawdown">
          <Card>
            <CardContent className="pt-6">
              <DrawdownChart strategyId={strategyId} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="table">
          <Card>
            <CardContent className="pt-6">
              <PerformanceTable strategyId={strategyId} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="heatmap">
          <Card>
            <CardContent className="pt-6">
              <PerformanceHeatmap strategyId={strategyId} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}