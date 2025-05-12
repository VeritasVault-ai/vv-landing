"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface HistoricalDataPoint {
  date: string
  value: number
}

interface ProtocolData {
  name: string
  slug: string
  tvlHistory: HistoricalDataPoint[]
  apyHistory: HistoricalDataPoint[]
}

interface Protocol {
  id: string
  name: string
  slug: string
  type: string
  totalValueLockedUSD: string
}

export default function HistoricalDataChart() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("30")
  const [historicalData, setHistoricalData] = useState<ProtocolData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("tvl")

  // Fetch the list of protocols
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/goldsky/protocols")
        if (!response.ok) {
          throw new Error("Failed to fetch protocols")
        }
        const data = await response.json()
        setProtocols(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching protocols:", error)
        setError("Failed to load protocols. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProtocols()
  }, [])

  // Fetch historical data when protocol or time range changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/goldsky/historical-data?protocol=${selectedProtocol}&days=${timeRange}`)
        if (!response.ok) {
          throw new Error("Failed to fetch historical data")
        }
        const data = await response.json()
        setHistoricalData(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching historical data:", error)
        setError("Failed to load historical data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchHistoricalData()
  }, [selectedProtocol, timeRange])

  // Format data for the chart
  const formatChartData = () => {
    if (historicalData.length === 0) return []

    // If "all" is selected, aggregate data from all protocols
    if (selectedProtocol === "all") {
      const dateMap: Record<string, { date: string; value: number }> = {}

      historicalData.forEach((protocol) => {
        const history = activeTab === "tvl" ? protocol.tvlHistory : protocol.apyHistory

        history.forEach((point) => {
          if (!dateMap[point.date]) {
            dateMap[point.date] = { date: point.date, value: 0 }
          }

          // For TVL, sum the values; for APY, calculate the average
          if (activeTab === "tvl") {
            dateMap[point.date].value += point.value
          } else if (point.value !== null) {
            // Only include non-null APY values in the average
            const currentValue = dateMap[point.date].value
            dateMap[point.date].value = currentValue === 0 ? point.value : (currentValue + point.value) / 2
          }
        })
      })

      return Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date))
    }

    // Otherwise, return data for the selected protocol
    const selectedData = historicalData.find((p) => p.slug === selectedProtocol)
    if (!selectedData) return []

    return (activeTab === "tvl" ? selectedData.tvlHistory : selectedData.apyHistory).sort((a, b) =>
      a.date.localeCompare(b.date),
    )
  }

  const chartData = formatChartData()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Historical {activeTab === "tvl" ? "TVL" : "APY"} Data</CardTitle>
            <CardDescription>
              {activeTab === "tvl" ? "Total Value Locked over time" : "Annual Percentage Yield over time"}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Protocol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Protocols</SelectItem>
                {protocols.map((protocol) => (
                  <SelectItem key={protocol.slug} value={protocol.slug}>
                    {protocol.name}
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
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="tvl">TVL</TabsTrigger>
            <TabsTrigger value="apy">APY</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <div className="mt-4">
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    activeTab === "tvl" ? `$${(value / 1000000).toFixed(1)}M` : `${value.toFixed(1)}%`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    activeTab === "tvl" ? [`$${value.toLocaleString()}`, "TVL"] : [`${value.toFixed(2)}%`, "APY"]
                  }
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name={activeTab === "tvl" ? "TVL" : "APY"}
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
