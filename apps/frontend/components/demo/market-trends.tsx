"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart2,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  LineChart,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

export function MarketTrends() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Market Analysis</h2>
          <p className="text-muted-foreground">AI-powered market trends and insights</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Data"}
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
            <CardTitle className="text-lg">Tezos Market Trend</CardTitle>
            <CardDescription>30-day price movement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                <LineChart className="h-12 w-12 text-primary/40" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Price</span>
                  <span className="text-lg font-bold">$1.24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">30d Change</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +8.7%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Market Cap</span>
                  <span className="text-sm font-medium">$1.12B</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Liquidity Trends</CardTitle>
            <CardDescription>TVL changes across protocols</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart2 className="h-12 w-12 text-primary/40" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total TVL</span>
                  <span className="text-lg font-bold">$127.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">30d Change</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +12.3%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Pools</span>
                  <span className="text-sm font-medium">142</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Market Sentiment</CardTitle>
            <CardDescription>AI-analyzed market sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6">
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
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 68 / 100)}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">68</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge className="mt-2 bg-green-500">Bullish</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Social Volume</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    High
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Developer Activity</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    Increasing
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>AI-generated market analysis and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="predictions">Price Predictions</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
                  </div>
                  <h3 className="font-medium mb-2">Market Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    The Tezos ecosystem is showing strong growth with increasing TVL and developer activity. Recent
                    protocol upgrades have improved scalability and attracted new projects to the ecosystem. Market
                    sentiment remains bullish with increasing social volume and institutional interest.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Bullish Factors</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Increasing institutional adoption</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Growing developer ecosystem</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        <span>Recent protocol upgrades</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Bearish Factors</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>Competition from other L1 chains</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>General market uncertainty</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-amber-500" />
                        <span>Regulatory concerns</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium">Upcoming Events</h4>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Protocol upgrade in 14 days</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Major DEX launch next month</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-blue-500" />
                        <span>Tezos developer conference</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-medium mb-2">AI Price Predictions</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes market data, on-chain metrics, and sentiment to generate price predictions. These
                    predictions are for informational purposes only and should not be considered financial advice.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">30-Day Forecast</h4>
                      <Badge variant="outline" className="text-green-500 border-green-200">
                        +12-18%
                      </Badge>
                    </div>
                    <div className="h-[150px] flex items-center justify-center bg-muted/20 rounded-md mb-3">
                      <LineChart className="h-10 w-10 text-green-500/40" />
                    </div>
                    <p className="text-xs text-muted-foreground">Predicted price range: $1.39 - $1.46</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Analysis
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">90-Day Forecast</h4>
                      <Badge variant="outline" className="text-green-500 border-green-200">
                        +25-40%
                      </Badge>
                    </div>
                    <div className="h-[150px] flex items-center justify-center bg-muted/20 rounded-md mb-3">
                      <LineChart className="h-10 w-10 text-green-500/40" />
                    </div>
                    <p className="text-xs text-muted-foreground">Predicted price range: $1.55 - $1.74</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Analysis
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">1-Year Forecast</h4>
                      <Badge variant="outline" className="text-green-500 border-green-200">
                        +80-120%
                      </Badge>
                    </div>
                    <div className="h-[150px] flex items-center justify-center bg-muted/20 rounded-md mb-3">
                      <LineChart className="h-10 w-10 text-green-500/40" />
                    </div>
                    <p className="text-xs text-muted-foreground">Predicted price range: $2.23 - $2.73</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-medium mb-2">Market Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI has identified the following opportunities based on current market conditions. These are for
                    informational purposes only and should not be considered financial advice.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Tezos/ETH Pool Opportunity</h4>
                      <Badge>High Potential</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Recent price divergence between Tezos and ETH has created an opportunity for higher than average
                      returns. Current APY is 15.7% with potential to increase to 18-20% in the next 30 days.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm">
                        Explore Opportunity
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Etherlink/USDC Stability</h4>
                      <Badge variant="secondary">Medium Potential</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Etherlink/USDC pool offers a stable 9.8% APY with very low risk. Ideal for conservative strategies
                      looking for stable returns with minimal impermanent loss risk.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">New Protocol Launch</h4>
                      <Badge variant="secondary">Medium Potential</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      A new DEX is launching on Tezos next month with attractive initial liquidity incentives. Early
                      liquidity providers could benefit from higher than average returns during the launch phase.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Set Reminder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Flash Loan Arbitrage</h4>
                      <Badge>High Potential</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Price discrepancies between DEXs on Tezos have created arbitrage opportunities. Our AI has
                      identified potential for 0.5-1.2% returns per transaction using flash loans.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm">
                        Explore Opportunity
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
