"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  BarChart2,
  ChevronRight,
  Download,
  FileText,
  RefreshCw,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

export function RiskAssessmentDashboard() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Risk Assessment Dashboard</h2>
          <p className="text-muted-foreground">AI-powered analysis of your liquidity positions and market conditions</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Analysis"}
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Risk Score</CardTitle>
            <CardDescription>Aggregated risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-amber-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 42 / 100)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">42</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <Badge variant="outline" className="text-amber-500 border-amber-200">
                Moderate Risk
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Factors</CardTitle>
            <CardDescription>Key contributors to risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Volatility</span>
                  <Badge variant="outline" className="text-amber-500">
                    Medium
                  </Badge>
                </div>
                <Progress value={50} className="h-2 bg-amber-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Impermanent Loss</span>
                  <Badge variant="outline" className="text-green-500">
                    Low
                  </Badge>
                </div>
                <Progress value={25} className="h-2 bg-green-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Liquidity Depth</span>
                  <Badge variant="outline" className="text-amber-500">
                    Medium
                  </Badge>
                </div>
                <Progress value={45} className="h-2 bg-amber-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Smart Contract Risk</span>
                  <Badge variant="outline" className="text-green-500">
                    Low
                  </Badge>
                </div>
                <Progress value={20} className="h-2 bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Market Conditions</CardTitle>
            <CardDescription>Current market environment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-medium">Bullish Trend</h4>
                  <p className="text-xs text-muted-foreground">Market showing positive momentum over the last 7 days</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <AlertTriangle className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-medium">Increased Volatility</h4>
                  <p className="text-xs text-muted-foreground">Higher than average price fluctuations in Tezos pairs</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Shield className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">Protocol Stability</h4>
                  <p className="text-xs text-muted-foreground">
                    No significant protocol issues or vulnerabilities detected
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Mitigation Strategies</CardTitle>
          <CardDescription>AI-recommended actions to optimize your risk profile</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="simulation">Risk Simulation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-medium mb-2">Executive Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Your portfolio has a moderate risk profile (42/100) with potential for optimization. The main risk
                    factors are market volatility and moderate liquidity depth in some Tezos pairs. We recommend
                    rebalancing your portfolio to reduce exposure to volatile pairs and implementing a more diversified
                    strategy across stable assets.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Current Strengths</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Low smart contract risk</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Good diversification across assets</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Minimal impermanent loss exposure</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Areas of Concern</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>Exposure to volatile Tezos pairs</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>Moderate liquidity depth in some pools</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>Concentration risk in specific protocols</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium">Optimization Potential</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Potential to reduce risk by 15%</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Maintain similar yield with lower risk</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Opportunity to leverage new stable pools</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="pt-4">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Rebalance Portfolio</h4>
                      <Badge>High Priority</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Reduce exposure to volatile Tezos pairs and increase allocation to stable assets.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm">Apply Recommendation</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Diversify Protocol Exposure</h4>
                      <Badge variant="secondary">Medium Priority</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Spread liquidity across multiple protocols to reduce concentration risk.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        View Options
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Implement Stop-Loss Strategy</h4>
                      <Badge variant="secondary">Medium Priority</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Set up automated exit positions for high-volatility pairs to limit downside risk.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Increase Stable Pair Allocation</h4>
                      <Badge variant="outline">Low Priority</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Allocate additional liquidity to stable pairs to reduce overall portfolio volatility.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Explore Pairs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5" />
                    <h4 className="font-medium">AI-Generated Risk Report</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our AI has generated a comprehensive risk report with detailed recommendations.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulation" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-medium mb-2">Risk Simulation</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    See how different market scenarios would impact your portfolio risk and returns.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <h4 className="font-medium">Market Downturn</h4>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Portfolio Impact</span>
                        <span className="text-red-500">-12.4%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Risk Score Change</span>
                        <span className="text-red-500">+18 pts</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart2 className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Increased Volatility</h4>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Portfolio Impact</span>
                        <span className="text-amber-500">-5.2%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Risk Score Change</span>
                        <span className="text-amber-500">+10 pts</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Bull Market</h4>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Portfolio Impact</span>
                        <span className="text-green-500">+18.7%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Risk Score Change</span>
                        <span className="text-green-500">-5 pts</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Run Custom Simulation</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
