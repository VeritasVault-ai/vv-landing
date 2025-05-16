"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle } from "lucide-react"

/**
 * Component that displays key metrics in cards at the top of the dashboard
 */
export function DashboardMetrics() {
  // In a real implementation, this data would come from an API
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$2,456,789",
      change: "+5.2%",
      isPositive: true,
      description: "From previous period"
    },
    {
      title: "Active Strategies",
      value: "12",
      change: "+2",
      isPositive: true,
      description: "New strategies"
    },
    {
      title: "Risk Score",
      value: "Low",
      change: "-12%",
      isPositive: true,
      description: "Risk exposure"
    },
    {
      title: "Liquidity Ratio",
      value: "87.3%",
      change: "-2.1%",
      isPositive: false,
      description: "Available liquidity"
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardDescription>{metric.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{metric.value}</CardTitle>
              <div className={`flex items-center text-sm ${
                metric.isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
              }`}>
                {metric.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}