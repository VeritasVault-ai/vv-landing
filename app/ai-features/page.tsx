import type { Metadata } from "next"
import { AIAnalyticsDashboard } from "@/components/ai-analytics-dashboard"
import { StrategyVisualization } from "@/components/strategy-visualization"
import { AIStrategyRecommendation } from "@/components/ai-strategy-recommendation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "AI Features | NeuralLiquid",
  description: "AI-powered features for Tezos liquidity management",
}

export default function AIFeaturesPage() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Features</h1>
        <p className="text-muted-foreground">Leverage AI to optimize your liquidity management strategies</p>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6">
          <AIAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <StrategyVisualization />
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <AIStrategyRecommendation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
