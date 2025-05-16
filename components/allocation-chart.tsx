"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface AllocationData {
  name: string
  value: number
  color: string
}

// Fallback data in case API fails
const FALLBACK_DATA: AllocationData[] = [
  { name: "stETH", value: 50, color: "#3B82F6" },
  { name: "tzBTC", value: 20, color: "#10B981" },
  { name: "USDC", value: 30, color: "#F59E0B" }
];

interface AllocationChartProps {
  // Allow passing initial data to avoid API call
  initialData?: AllocationData[];
}

/**
 * Renders a responsive pie chart displaying allocation data, with support for initial data and fallback handling.
 *
 * If `initialData` is provided, the chart uses it directly; otherwise, it fetches allocation data from an API endpoint and falls back to default data on failure.
 *
 * @param initialData - Optional pre-fetched allocation data to display instead of fetching from the API.
 *
 * @returns A React element containing the allocation pie chart, a loading skeleton, or an error message if data cannot be loaded.
 */
export function AllocationChart({ initialData }: AllocationChartProps) {
  const [allocationData, setAllocationData] = useState<AllocationData[]>(initialData || [])
  const [loading, setLoading] = useState(!initialData) // Only set loading to true if no initial data
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If we have initial data, don't fetch from API
    if (initialData) {
      return;
    }
    const fetchAllocationData = async () => {
      try {
        setLoading(true)

        // In a real application, this would be a call to your backend API
        console.log("Fetching allocation data from API...")
        const response = await fetch("/api/goldsky/protocols")

        if (!response.ok) {
          console.warn(`API request failed with status ${response.status}, using fallback data`)
          setAllocationData(FALLBACK_DATA)
          return
        }

        const data = await response.json()
        console.log("Received data:", data)

        // Transform the data to include colors and convert values
        const colors = ["#3B82F6", "#10B981", "#F59E0B", "#ff8042", "#0088fe", "#00C49F", "#FFBB28", "#FF8042"]

        const transformedData = data.map((item: any, index: number) => {
          // Convert string values to numbers and calculate a percentage value
          const tvl = Number.parseFloat(item.totalValueLockedUSD) || 0
          return {
            name: item.name || `Protocol ${index + 1}`,
            // Use the TVL as the value, or fall back to index-based values
            value: tvl || (index === 0 ? 35 : index === 1 ? 25 : index === 2 ? 20 : index === 3 ? 15 : index === 4 ? 5 : 10),
            color: item.color || colors[index % colors.length],
            // Store original data for tooltip
            originalTVL: tvl,
          }
        })

        console.log("Transformed data:", transformedData)
        setAllocationData(transformedData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch allocation data:", err)
        setError("Failed to load allocation data")

        // Always use fallback data if there's any error
        setAllocationData(FALLBACK_DATA)
      } finally {
        setLoading(false)
      }
    }

    fetchAllocationData()
  }, [initialData])
  if (loading) {
    return <Skeleton className="h-full w-full rounded-full" />
  }

  if (error && !allocationData.length) {
    return (
      <div className="flex items-center justify-center h-full border rounded-md">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={allocationData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={70}
          innerRadius={0}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {allocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AllocationChart
