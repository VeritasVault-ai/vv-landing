import PoolsTable from "@/components/pools-table"
import RiskAssessment from "@/components/risk-assessment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Cog, LineChart, PieChart, RefreshCw } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Strategy Details | NeuralLiquid",
  description: "View and manage your liquidity strategy",
}

// This would normally be fetched from the database
const strategyData = {
  id: "1",
  name: "Balanced Yield",
  description: "Optimized for steady returns with moderate risk",
  status: "Active",
  risk_level: "Medium",
  target_apy: 15.8,
  stable_pairs_percentage: 40,
  medium_volatility_percentage: 40,
  high_volatility_percentage: 20,
  created_at: "2025-05-15T10:30:00Z",
  last_rebalanced: "2025-05-28T14:45:00Z",
  total_value: 25000,
  current_apy: 16.2,
  pools: [
    { name: "Tezos AMM 1", protocol: "QuipuSwap", allocation: 35, apy: 12.4 },
    { name: "Etherlink DEX", protocol: "EtherSwap", allocation: 25, apy: 18.7 },
    { name: "Tezos Stable", protocol: "Plenty", allocation: 30, apy: 8.2 },
    { name: "Etherlink Farm", protocol: "EtherYield", allocation: 10, apy: 24.5 },
  ],
  performance: [
    { date: "2025-05-01", value: 23500 },
    { date: "2025-05-08", value: 24100 },
    { date: "2025-05-15", value: 24300 },
    { date: "2025-05-22", value: 24800 },
    { date: "2025-05-29", value: 25000 },
  ],
}

export default function StrategyDetailsPage({ params }: { params: { id: string } }) {
  const strategy = strategyData // Replace with actual data fetching

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/strategies">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{strategyData.name}</h1>
          <p className="text-muted-foreground">{strategyData.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Strategy Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="default">Active</Badge>
              <Button variant="outline" size="sm">
                <Cog className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{strategyData.current_apy}%</p>
                <p className="text-xs text-muted-foreground">Target: {strategyData.target_apy}%</p>
              </div>
              <LineChart className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Rebalanced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium">{new Date(strategyData.last_rebalanced).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(strategyData.last_rebalanced).toLocaleTimeString()}
                </p>
              </div>
              <Button size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Rebalance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pools">Pools</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Allocation Strategy</CardTitle>
                <CardDescription>Current distribution across risk categories</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-[300px] h-[300px] flex items-center justify-center">
                  <PieChart className="h-full w-full text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategy Details</CardTitle>
                <CardDescription>Key parameters and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="font-medium">{strategyData.risk_level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-medium">${strategyData.total_value.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Allocation</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stable Pairs</span>
                        <span className="font-medium">{strategyData.stable_pairs_percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${strategyData.stable_pairs_percentage}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Medium Volatility</span>
                        <span className="font-medium">{strategyData.medium_volatility_percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${strategyData.medium_volatility_percentage}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>High Volatility</span>
                        <span className="font-medium">{strategyData.high_volatility_percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${strategyData.high_volatility_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Created</p>
                    <p className="font-medium">{new Date(strategyData.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance</CardTitle>
              <CardDescription>Value over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <BarChart3 className="h-full w-full text-muted-foreground" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools">
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Pools</CardTitle>
              <CardDescription>Pools included in this strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <PoolsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Historical performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <LineChart className="h-full w-full text-muted-foreground" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Settings</CardTitle>
              <CardDescription>Configure your strategy parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings form would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <RiskAssessment
              strategyId={params.id}
              title={`${strategy.name} Risk Assessment`}
              description={`Comprehensive risk analysis for your ${strategy.name} strategy`}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
