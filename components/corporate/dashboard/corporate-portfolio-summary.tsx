"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api/api-client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export interface CorporatePortfolioSummaryProps {
  className?: string
}

interface PortfolioData {
  allocation: {
    name: string
    value: number
    color: string
  }[]
  totalValue: number
  performance: {
    daily: number
    weekly: number
    monthly: number
  }
}

export function CorporatePortfolioSummary({ className }: CorporatePortfolioSummaryProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PortfolioData | null>(null)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch real data from API
        const response = await apiClient.get<PortfolioData>(`/portfolio/summary?filter=${filter}`)
        setData(response)
        setError(null)
      } catch (err) {
        console.error("Error fetching portfolio data:", err)
        setError("Failed to load portfolio data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filter])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Your current asset allocation</CardDescription>
        </div>
        <div className="flex space-x-2">
          <select
            className="px-2 py-1 text-sm border rounded-md"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Assets</option>
            <option value="liquidity-pools">Liquidity Pools</option>
            <option value="strategies">Strategies</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data?.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${data?.totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Daily Change</p>
              <p
                className={`text-2xl font-bold ${data?.performance.daily && data.performance.daily >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.performance.daily && data.performance.daily >= 0 ? "+" : ""}
                {data?.performance.daily.toFixed(2)}%
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Change</p>
              <p
                className={`text-2xl font-bold ${data?.performance.monthly && data.performance.monthly >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.performance.monthly && data.performance.monthly >= 0 ? "+" : ""}
                {data?.performance.monthly.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CorporatePortfolioSummary
