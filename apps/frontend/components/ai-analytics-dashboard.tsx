"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Sparkles, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"

interface PoolData {
  id: string
  name: string
  protocol: string
  pair: string
  apy: number
  tvl: number
  risk_level: string
}

export function AIAnalyticsDashboard() {
  const [pools, setPools] = useState<PoolData[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const supabase = getBrowserClient()

  useEffect(() => {
    async function fetchPools() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("liquidity_pools").select("*").order("apy", { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          setPools(data)
        } else {
          // If no data in database, use mock data
          setPools([
            {
              id: "1",
              name: "Tezos AMM 1",
              protocol: "QuipuSwap",
              pair: "XTZ/USDT",
              apy: 12.4,
              tvl: 2400000,
              risk_level: "Low",
            },
            {
              id: "2",
              name: "Etherlink DEX",
              protocol: "EtherSwap",
              pair: "ETL/USDC",
              apy: 18.7,
              tvl: 1800000,
              risk_level: "Medium",
            },
            {
              id: "3",
              name: "Tezos Stable",
              protocol: "Plenty",
              pair: "USDT/USDC",
              apy: 8.2,
              tvl: 3600000,
              risk_level: "Low",
            },
            {
              id: "4",
              name: "Etherlink Farm",
              protocol: "EtherYield",
              pair: "ETL/wBTC",
              apy: 24.5,
              tvl: 1200000,
              risk_level: "High",
            },
          ])
        }
      } catch (err) {
        console.error("Error fetching pools:", err)
        setError("Failed to load pool data")
        // Use mock data as fallback
        setPools([
          {
            id: "1",
            name: "Tezos AMM 1",
            protocol: "QuipuSwap",
            pair: "XTZ/USDT",
            apy: 12.4,
            tvl: 2400000,
            risk_level: "Low",
          },
          {
            id: "2",
            name: "Etherlink DEX",
            protocol: "EtherSwap",
            pair: "ETL/USDC",
            apy: 18.7,
            tvl: 1800000,
            risk_level: "Medium",
          },
          {
            id: "3",
            name: "Tezos Stable",
            protocol: "Plenty",
            pair: "USDT/USDC",
            apy: 8.2,
            tvl: 3600000,
            risk_level: "Low",
          },
          {
            id: "4",
            name: "Etherlink Farm",
            protocol: "EtherYield",
            pair: "ETL/wBTC",
            apy: 24.5,
            tvl: 1200000,
            risk_level: "High",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  const runAIAnalysis = async () => {
    try {
      setAnalyzing(true)

      // Call our API endpoint that uses Groq
      const response = await fetch("/api/ai/analyze-pools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pools }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze pools")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      console.error("Error analyzing pools:", err)
      setError("Failed to analyze pools")

      // Fallback mock analysis
      setAnalysis({
        overview: {
          totalTVL: pools.reduce((sum, pool) => sum + pool.tvl, 0),
          averageAPY: pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length,
          riskDistribution: {
            low: pools.filter((p) => p.risk_level === "Low").length,
            medium: pools.filter((p) => p.risk_level === "Medium").length,
            high: pools.filter((p) => p.risk_level === "High").length,
          },
        },
        recommendations: [
          {
            type: "opportunity",
            pool: pools.sort((a, b) => b.apy - a.apy)[0]?.name || "High APY Pool",
            message: "Consider increasing allocation to this high-performing pool",
            impact: "Potential 2.3% increase in portfolio yield",
          },
          {
            type: "risk",
            pool: pools.filter((p) => p.risk_level === "High")[0]?.name || "High Risk Pool",
            message: "Monitor this high-risk pool closely for volatility",
            impact: "Reduce potential impermanent loss",
          },
        ],
        forecast: Array(7)
          .fill(0)
          .map((_, i) => ({
            day: i + 1,
            apy: (pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length) * (1 + (Math.random() * 0.2 - 0.1)),
          })),
      })
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Liquidity Analytics</CardTitle>
          <CardDescription>
            Analyze your liquidity pools with advanced AI to identify opportunities and risks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[100px] w-full" />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Button
                  onClick={runAIAnalysis}
                  disabled={analyzing || pools.length === 0}
                  className="flex items-center gap-2"
                >
                  {analyzing ? (
                    <>Analyzing Pools...</>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Run AI Analysis
                    </>
                  )}
                </Button>
              </div>

              {analysis ? (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    <TabsTrigger value="forecast">APY Forecast</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-sm text-muted-foreground mb-2">Total TVL</div>
                          <div className="text-2xl font-bold">
                            ${(analysis.overview.totalTVL / 1000000).toFixed(2)}M
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-sm text-muted-foreground mb-2">Average APY</div>
                          <div className="text-2xl font-bold">{analysis.overview.averageAPY.toFixed(2)}%</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-sm text-muted-foreground mb-2">Risk Distribution</div>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 bg-green-500"
                              style={{ width: `${analysis.overview.riskDistribution.low * 30}px` }}
                            ></div>
                            <div
                              className="h-4 bg-yellow-500"
                              style={{ width: `${analysis.overview.riskDistribution.medium * 30}px` }}
                            ></div>
                            <div
                              className="h-4 bg-red-500"
                              style={{ width: `${analysis.overview.riskDistribution.high * 30}px` }}
                            ></div>
                          </div>
                          <div className="flex text-xs mt-1 justify-between">
                            <span>Low: {analysis.overview.riskDistribution.low}</span>
                            <span>Medium: {analysis.overview.riskDistribution.medium}</span>
                            <span>High: {analysis.overview.riskDistribution.high}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium mb-4">Pool Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-4">Pool</th>
                              <th className="text-left py-2 px-4">Protocol</th>
                              <th className="text-left py-2 px-4">Pair</th>
                              <th className="text-right py-2 px-4">APY</th>
                              <th className="text-right py-2 px-4">TVL</th>
                              <th className="text-left py-2 px-4">Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pools.map((pool) => (
                              <tr key={pool.id} className="border-b">
                                <td className="py-2 px-4">{pool.name}</td>
                                <td className="py-2 px-4">{pool.protocol}</td>
                                <td className="py-2 px-4">{pool.pair}</td>
                                <td className="py-2 px-4 text-right text-emerald-600 font-medium">{pool.apy}%</td>
                                <td className="py-2 px-4 text-right">${(pool.tvl / 1000000).toFixed(2)}M</td>
                                <td className="py-2 px-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      pool.risk_level === "Low"
                                        ? "bg-green-100 text-green-800"
                                        : pool.risk_level === "Medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {pool.risk_level}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations">
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-2 rounded-full ${
                                  rec.type === "opportunity"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {rec.type === "opportunity" ? (
                                  <TrendingUp className="h-5 w-5" />
                                ) : (
                                  <AlertTriangle className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-lg font-medium">{rec.pool}</h4>
                                <p className="text-muted-foreground">{rec.message}</p>
                                <div className="mt-2 text-sm font-medium">
                                  {rec.type === "opportunity" ? (
                                    <span className="text-emerald-600">{rec.impact}</span>
                                  ) : (
                                    <span className="text-amber-600">{rec.impact}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <div className="flex justify-end">
                        <Button variant="outline" className="flex items-center gap-2">
                          View All Recommendations
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="forecast">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-4">7-Day APY Forecast</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analysis.forecast}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                              <YAxis label={{ value: "APY (%)", angle: -90, position: "insideLeft" }} />
                              <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "APY"]} />
                              <Legend />
                              <Line type="monotone" dataKey="apy" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          Forecast based on historical performance and current market conditions
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Run AI Analysis</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Use our AI to analyze your liquidity pools and get personalized recommendations
                  </p>
                  <Button onClick={runAIAnalysis} disabled={analyzing || pools.length === 0}>
                    {analyzing ? "Analyzing..." : "Start Analysis"}
                  </Button>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
