"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, BarChart2, Percent, TrendingUp } from "lucide-react"

export function MarketMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-500/20 to-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="mr-1 h-4 w-4" />
                Total Addressable Market
              </p>
              <h2 className="text-3xl font-bold">$3060.8B</h2>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                Growing at 27.3% CAGR
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center">
                <BarChart2 className="mr-1 h-4 w-4" />
                Projected Annual Revenue
              </p>
              <h2 className="text-3xl font-bold">$4.2M</h2>
              <p className="text-xs text-blue-500">By Year 3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-500/20 to-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center">
                <Percent className="mr-1 h-4 w-4" />
                Target Raise
              </p>
              <h2 className="text-3xl font-bold">$2.5M</h2>
              <p className="text-xs text-purple-500">Seed Round</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">
            Tezos vs Ethereum TVL{" "}
            <Badge variant="outline" className="ml-1 text-xs">
              Live
            </Badge>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tezos</span>
                <span className="text-sm font-medium">$29.5B</span>
              </div>
              <Progress value={6.84} className="h-3 bg-green-500" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ethereum</span>
                <span className="text-sm font-medium">$431.9B</span>
              </div>
              <Progress value={100} className="h-3 bg-blue-500" />
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Tezos currently represents 6.84% of Ethereum's TVL, showing significant growth potential.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
