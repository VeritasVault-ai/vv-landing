"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getBrowserClient } from "@/lib/supabase"

interface HistoricalDataPoint {
  date: string
  apy: number
  tvl: number
}

interface PoolOption {
  id: string
  name: string
}

export function HistoricalPerformanceChart() {
  const [pools, setPools] = useState<PoolOption[]>([])
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<string>("30")
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeMetric, setActiveMetric] = useState<string>("apy")
  const supabase = getBrowserClient()

  // Fetch the list of pools
  useEffect(() => {
    const fetchPools = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("liquidity_pools").select("id, name").order("name")

        if (error) throw error

        if (data && data.length > 0) {
          setPools(data)
          setSelectedPool(data[0].id)
        }
      } catch (error) {
        console.error("Error fetching pools:", error)
        setError("Failed to load pools. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  // Fetch historical data when pool or time range changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedPool) return

      try {
        setLoading(true)

        const { data, error } = await supabase
          .from("performance_history")
          .select("date, apy, tvl")
          .eq("pool_id", selectedPool)
          .order("date", { ascending: true })
          .limit(Number.parseInt(timeRange))

        if (error) throw error

        if (data) {
          setHistoricalData(
            data.map((item) => ({
              date: new Date(item.date).toISOString().split("T")[0],
              apy: Number(item.apy),
              tvl: Number(item.tvl),
            })),
          )
        }
      } catch (error) {
        console.error("Error fetching historical data:", error)
        setError("Failed to load historical data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (selectedPool) {
      fetchHistoricalData()
    }
  }, [selectedPool, timeRange])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Historical {activeMetric.toUpperCase()} Data</CardTitle>
            <CardDescription>
              {activeMetric === "apy" ? "Annual Percentage Yield over time" : "Total Value Locked over time"}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedPool || ""} onValueChange={setSelectedPool}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Pool" />
              </SelectTrigger>
              <SelectContent>
                {pools.map((pool) => (
                  <SelectItem key={pool.id} value={pool.id}>
                    {pool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setActiveMetric("apy")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeMetric === "apy" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            APY
          </button>
          <button
            onClick={() => setActiveMetric("tvl")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeMetric === "tvl" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            TVL
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => {
                    const d = new Date(date)
                    return `${d.getMonth() + 1}/${d.getDate()}`
                  }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    activeMetric === "tvl" ? `$${(value / 1000000).toFixed(1)}M` : `${value.toFixed(1)}%`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    activeMetric === "tvl" ? [`$${value.toLocaleString()}`, "TVL"] : [`${value.toFixed(2)}%`, "APY"]
                  }
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  name={activeMetric === "tvl" ? "TVL" : "APY"}
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
