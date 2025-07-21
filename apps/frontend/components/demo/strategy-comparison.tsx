"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LineChart, PieChart, Plus, RefreshCw, Zap } from "lucide-react"

export function StrategyComparison() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Strategy Comparison</h2>
          <p className="text-muted-foreground">Compare and optimize your liquidity strategies</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Strategy
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conservative</CardTitle>
              <Badge variant="outline" className="text-green-500 border-green-200">
                Low Risk
              </Badge>
            </div>
            <CardDescription>Stable pairs with lower volatility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Yield</span>
                <span className="text-xl font-bold text-green-500">8.2%</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Risk Score</span>
                  <span>25/100</span>
                </div>
                <Progress value={25} className="h-2 bg-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Allocation</div>
                  <div className="text-sm font-medium">40%</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">IL Risk</div>
                  <div className="text-sm font-medium">Very Low</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Balanced</CardTitle>
              <Badge variant="secondary">Medium Risk</Badge>
            </div>
            <CardDescription>Mix of stable and higher yield pairs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Yield</span>
                <span className="text-xl font-bold text-blue-500">14.5%</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Risk Score</span>
                  <span>52/100</span>
                </div>
                <Progress value={52} className="h-2 bg-amber-500" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Allocation</div>
                  <div className="text-sm font-medium">35%</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">IL Risk</div>
                  <div className="text-sm font-medium">Moderate</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Aggressive</CardTitle>
              <Badge>High Risk</Badge>
            </div>
            <CardDescription>Focus on maximum yield opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Yield</span>
                <span className="text-xl font-bold text-purple-500">22.3%</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Risk Score</span>
                  <span>78/100</span>
                </div>
                <Progress value={78} className="h-2 bg-red-500" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Allocation</div>
                  <div className="text-sm font-medium">25%</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">IL Risk</div>
                  <div className="text-sm font-medium">High</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Performance Comparison</CardTitle>
          <CardDescription>Historical and projected performance of your strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="pt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-primary/40" />
                  <p className="text-muted-foreground mt-2">Performance comparison chart</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-4">
                <div className="p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Conservative</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">1M Return</span>
                      <span className="text-green-500">+2.1%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">3M Return</span>
                      <span className="text-green-500">+5.8%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Balanced</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">1M Return</span>
                      <span className="text-blue-500">+3.4%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">3M Return</span>
                      <span className="text-blue-500">+9.2%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium">Aggressive</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">1M Return</span>
                      <span className="text-purple-500">+5.7%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">3M Return</span>
                      <span className="text-purple-500">+14.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="allocation" className="pt-4">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-medium mb-3">Conservative Allocation</h3>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <PieChart className="h-12 w-12 text-green-500/40" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Tezos/USDT (60%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-300"></div>
                      <span className="text-sm">Tezos/USDC (30%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-200"></div>
                      <span className="text-sm">Tezos/DAI (10%)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Balanced Allocation</h3>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <PieChart className="h-12 w-12 text-blue-500/40" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Tezos/USDT (40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-300"></div>
                      <span className="text-sm">Tezos/ETH (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-200"></div>
                      <span className="text-sm">Tezos/BTC (25%)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Aggressive Allocation</h3>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <PieChart className="h-12 w-12 text-purple-500/40" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Tezos/ETH (45%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-300"></div>
                      <span className="text-sm">Tezos/BTC (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-200"></div>
                      <span className="text-sm">Etherlink/USDT (20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-medium mb-2">Risk Comparison</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare the risk profiles of your different strategies across key risk factors.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Market Volatility Exposure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Conservative</span>
                        <Progress value={20} className="h-2 bg-green-500" />
                        <span className="text-sm">Low</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Balanced</span>
                        <Progress value={50} className="h-2 bg-amber-500" />
                        <span className="text-sm">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Aggressive</span>
                        <Progress value={80} className="h-2 bg-red-500" />
                        <span className="text-sm">High</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Impermanent Loss Risk</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Conservative</span>
                        <Progress value={15} className="h-2 bg-green-500" />
                        <span className="text-sm">Very Low</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Balanced</span>
                        <Progress value={45} className="h-2 bg-amber-500" />
                        <span className="text-sm">Moderate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Aggressive</span>
                        <Progress value={75} className="h-2 bg-red-500" />
                        <span className="text-sm">High</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Liquidity Depth Risk</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Conservative</span>
                        <Progress value={25} className="h-2 bg-green-500" />
                        <span className="text-sm">Low</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Balanced</span>
                        <Progress value={40} className="h-2 bg-amber-500" />
                        <span className="text-sm">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-24">Aggressive</span>
                        <Progress value={65} className="h-2 bg-red-500" />
                        <span className="text-sm">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Optimize Portfolio
        </Button>
      </div>
    </div>
  )
}
