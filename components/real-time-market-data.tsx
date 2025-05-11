"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface MarketData {
  id: string
  symbol: string
  price: number
  change_24h: number
  volume_24h: number
  market_cap: number
  timestamp: string
  updated_at: string
}

export function RealTimeMarketData() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [priceHistory, setPriceHistory] = useState<Record<string, any[]>>({})

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        const supabase = createBrowserClient()

        // Fetch initial market data
        const { data, error } = await supabase.from("market_data").select("*").order("symbol")

        if (error) throw error

        if (data) {
          setMarketData(data)

          // Initialize price history
          const history: Record<string, any[]> = {}
          data.forEach((item) => {
            history[item.symbol] = [
              {
                time: new Date(item.updated_at).toLocaleTimeString(),
                price: item.price,
              },
            ]
          })
          setPriceHistory(history)
        }

        // Subscribe to real-time updates
        const subscription = supabase
          .channel("market_data_changes")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "market_data",
            },
            (payload) => {
              // Update market data
              setMarketData((current) =>
                current.map((item) => (item.id === payload.new.id ? (payload.new as MarketData) : item)),
              )

              // Update price history
              const newData = payload.new as MarketData
              setPriceHistory((current) => {
                const symbol = newData.symbol
                const newHistory = { ...current }

                if (!newHistory[symbol]) {
                  newHistory[symbol] = []
                }

                // Add new data point
                newHistory[symbol] = [
                  ...newHistory[symbol],
                  {
                    time: new Date(newData.updated_at).toLocaleTimeString(),
                    price: newData.price,
                  },
                ]

                // Keep only the last 20 data points
                if (newHistory[symbol].length > 20) {
                  newHistory[symbol] = newHistory[symbol].slice(-20)
                }

                return newHistory
              })
            },
          )
          .subscribe()

        // Clean up subscription on unmount
        return () => {
          subscription.unsubscribe()
        }
      } catch (err: any) {
        console.error("Error fetching market data:", err)
        setError(err.message || "Failed to load market data")
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()

    // Simulate real-time updates for demo purposes
    // In a real app, this would come from the Supabase subscription
    const simulateUpdates = setInterval(() => {
      setMarketData((current) =>
        current.map((item) => ({
          ...item,
          price: item.price * (1 + (Math.random() * 0.02 - 0.01)), // +/- 1%
          change_24h: item.change_24h + (Math.random() * 0.4 - 0.2), // +/- 0.2%
          updated_at: new Date().toISOString(),
        })),
      )
    }, 5000)

    return () => clearInterval(simulateUpdates)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-300">Error Loading Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Real-Time Market Data</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketData.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{item.symbol}</CardTitle>
                <Badge
                  variant={item.change_24h >= 0 ? "default" : "destructive"}
                  className={
                    item.change_24h >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""
                  }
                >
                  {item.change_24h >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(item.change_24h).toFixed(2)}%
                </Badge>
              </div>
              <CardDescription>Last updated: {new Date(item.updated_at).toLocaleTimeString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="h-[100px]">
                {priceHistory[item.symbol] && priceHistory[item.symbol].length > 1 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory[item.symbol]}>
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={item.change_24h >= 0 ? "#10b981" : "#ef4444"}
                        dot={false}
                        strokeWidth={2}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    Waiting for data...
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                <div>
                  <span className="block">Volume (24h)</span>
                  <span className="font-medium text-foreground">${(item.volume_24h / 1000000).toFixed(2)}M</span>
                </div>
                <div>
                  <span className="block">Market Cap</span>
                  <span className="font-medium text-foreground">${(item.market_cap / 1000000000).toFixed(2)}B</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RealTimeMarketData
