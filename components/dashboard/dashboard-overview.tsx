"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { AllocationChart } from "@/components/dashboard/allocation-chart"
import { StrategyPerformanceTable } from "@/components/dashboard/strategy-performance-table"
import { Skeleton } from "@/components/ui/skeleton"
import { getBrowserClient } from "@/lib/supabase"
import { trackTabChange, trackFeatureUse } from "@/lib/analytics/track-events"

interface DashboardData {
  totalLiquidity: number
  totalYield: number
  activeStrategies: number
  portfolioPerformance: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  allocationData: {
    name: string
    value: number
    color: string
  }[]
  performanceData: {
    date: string
    value: number
  }[]
  strategies: {
    id: string
    name: string
    type: string
    apy: number
    tvl: number
    risk: string
  }[]
}

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("weekly")
  const supabase = getBrowserClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Track dashboard view
        trackFeatureUse("dashboard_overview", "dashboard")

        // Fetch user data from Supabase
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError) throw userError

        // Fetch dashboard data
        // In a real app, this would be an API call to get the actual data
        // For now, we'll simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockData: DashboardData = {
          totalLiquidity: 125000,
          totalYield: 12.5,
          activeStrategies: 3,
          portfolioPerformance: {
            daily: 0.5,
            weekly: 2.3,
            monthly: 8.7,
            yearly: 24.5,
          },
          allocationData: [
            { name: "Stable Pairs", value: 40, color: "#10b981" },
            { name: "Medium Volatility", value: 35, color: "#3b82f6" },
            { name: "High Volatility", value: 25, color: "#6366f1" },
          ],
          performanceData: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            value: 100000 + Math.random() * 30000,
          })),
          strategies: [
            { id: "1", name: "Conservative Yield", type: "Automated", apy: 8.2, tvl: 50000, risk: "Low" },
            { id: "2", name: "Balanced Growth", type: "Custom", apy: 14.5, tvl: 45000, risk: "Medium" },
            { id: "3", name: "High Yield Tezos", type: "Automated", apy: 22.8, tvl: 30000, risk: "High" },
          ],
        }

        setData(mockData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)

    // Track timeframe change
    trackTabChange("performance_chart", value)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Skeleton className="h-full w-full" />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Skeleton className="h-full w-full" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">Failed to load dashboard data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liquidity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalLiquidity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Yield</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34" />
              <path d="M14 3v4a2 2 0 0 0 2 2h4" />
              <path d="M5 12v7M19 12v7" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalYield}%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeStrategies}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Performance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{data.portfolioPerformance[timeframe as keyof typeof data.portfolioPerformance]}%
            </div>
            <Tabs defaultValue="weekly" className="mt-2" onValueChange={handleTimeframeChange}>
              <TabsList className="grid grid-cols-4 h-8">
                <TabsTrigger value="daily" className="text-xs">
                  1D
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs">
                  1W
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs">
                  1M
                </TabsTrigger>
                <TabsTrigger value="yearly" className="text-xs">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>View your portfolio performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PerformanceChart data={data.performanceData} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current distribution of your assets</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AllocationChart data={data.allocationData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Performance</CardTitle>
          <CardDescription>Overview of your active strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <StrategyPerformanceTable
            data={data.strategies}
            onViewStrategy={(id) => {
              // Track strategy view
              trackFeatureUse("view_strategy_details", "dashboard")
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
