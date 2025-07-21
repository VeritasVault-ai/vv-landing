"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

// Define the type for our metrics data
type MetricsData = {
  users: number[]
  tvl: number[]
  months: string[]
  growth: {
    users: number
    tvl: number
  }
}

export default function DemoMetrics() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [metrics, setMetrics] = useState<MetricsData>({
    users: [0, 120, 350, 580, 820, 1200],
    tvl: [0, 1.2, 3.5, 5.8, 8.2, 12],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    growth: {
      users: 46,
      tvl: 38,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch historical data for the chart
        const response = await fetch("/api/goldsky/historical-data")

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const historicalData = await response.json()

        // Process the data for the chart
        if (historicalData && historicalData.length > 0) {
          // Format the data for the chart
          const chartData = historicalData.map((item: any) => ({
            month: new Date(item.timestamp).toLocaleString("default", { month: "short" }),
            users: item.users || 0,
            tvl: item.tvl || 0,
          }))

          setData(chartData)

          // Calculate growth rates
          if (chartData.length >= 2) {
            const lastMonth = chartData[chartData.length - 1]
            const previousMonth = chartData[chartData.length - 2]

            const userGrowth =
              previousMonth.users > 0 ? ((lastMonth.users - previousMonth.users) / previousMonth.users) * 100 : 0

            const tvlGrowth =
              previousMonth.tvl > 0 ? ((lastMonth.tvl - previousMonth.tvl) / previousMonth.tvl) * 100 : 0

            setMetrics({
              ...metrics,
              growth: {
                users: Math.round(userGrowth * 10) / 10,
                tvl: Math.round(tvlGrowth * 10) / 10,
              },
            })
          }
        }
      } catch (err) {
        console.error("Error fetching metrics data:", err)
        setError("Failed to load metrics data")

        // Use the default data
        const defaultData = [
          { month: "Jan", users: 0, tvl: 0 },
          { month: "Feb", users: 120, tvl: 1.2 },
          { month: "Mar", users: 350, tvl: 3.5 },
          { month: "Apr", users: 580, tvl: 5.8 },
          { month: "May", users: 820, tvl: 8.2 },
          { month: "Jun", users: 1200, tvl: 12 },
        ]

        setData(defaultData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="h-[200px] flex items-center justify-center border rounded-lg">
          <p className="text-muted-foreground">Failed to load metrics data</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm text-muted-foreground">Beta Users</p>
            <p className="text-2xl font-bold">--</p>
            <p className="text-xs text-muted-foreground">Data unavailable</p>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm text-muted-foreground">Current TVL</p>
            <p className="text-2xl font-bold">--</p>
            <p className="text-xs text-muted-foreground">Data unavailable</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="users" stroke="#10b981" name="Users" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="tvl" stroke="#3b82f6" name="TVL ($M)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-3 text-center">
          <p className="text-sm text-muted-foreground">Beta Users</p>
          <p className="text-2xl font-bold">
            {data.length > 0 ? data[data.length - 1].users.toLocaleString() : "1,200"}+
          </p>
          <p className="text-xs text-emerald-500">+{metrics.growth.users}% MoM Growth</p>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <p className="text-sm text-muted-foreground">Current TVL</p>
          <p className="text-2xl font-bold">${data.length > 0 ? data[data.length - 1].tvl.toLocaleString() : "12"}M</p>
          <p className="text-xs text-emerald-500">+{metrics.growth.tvl}% MoM Growth</p>
        </div>
      </div>
    </div>
  )
}
