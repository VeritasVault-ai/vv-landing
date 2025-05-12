"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, LineChart, TrendingDown, TrendingUp } from "lucide-react"
import { useState } from "react"

export function AIInsights() {
  const [loading, setLoading] = useState(false)
  const [insightIndex, setInsightIndex] = useState(0)

  const insights = [
    {
      title: "Yield Optimization",
      description: "Our AI detected an opportunity to increase your yield by 2.3% through rebalancing.",
      icon: <TrendingUp className="h-10 w-10 text-emerald-500" />,
      action: "Optimize Now",
      type: "opportunity",
    },
    {
      title: "Risk Alert",
      description: "Increased volatility detected in the Tezos/ETH pair. Consider reducing exposure.",
      icon: <TrendingDown className="h-10 w-10 text-amber-500" />,
      action: "Review Risk",
      type: "warning",
    },
    {
      title: "Market Analysis",
      description: "Recent protocol upgrade has increased TVL by 15% across similar pools.",
      icon: <LineChart className="h-10 w-10 text-blue-500" />,
      action: "View Analysis",
      type: "info",
    },
  ]

  const currentInsight = insights[insightIndex]

  const handleNextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % insights.length)
  }

  const handleAction = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription>Neural analysis of your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className={
              currentInsight.type === "opportunity"
                ? "text-emerald-500 border-emerald-200"
                : currentInsight.type === "warning"
                  ? "text-amber-500 border-amber-200"
                  : "text-blue-500 border-blue-200"
            }
          >
            {currentInsight.type.charAt(0).toUpperCase() + currentInsight.type.slice(1)}
          </Badge>
          <Button variant="ghost" size="sm" onClick={handleNextInsight}>
            Next <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="flex flex-col items-center text-center space-y-3 py-2">
          {currentInsight.icon}
          <h3 className="font-medium">{currentInsight.title}</h3>
          <p className="text-sm text-muted-foreground">{currentInsight.description}</p>
        </div>

        <Button onClick={handleAction} disabled={loading} className="w-full">
          {loading ? "Processing..." : currentInsight.action}
        </Button>
      </CardContent>
    </Card>
  )
}
