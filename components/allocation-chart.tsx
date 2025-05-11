"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface AllocationData {
  name: string
  value: number
  color: string
}

export function AllocationChart() {
  const [allocationData, setAllocationData] = useState<AllocationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllocationData = async () => {
      try {
        setLoading(true)

        // In a real application, this would be a call to your backend API
        console.log("Fetching allocation data from API...")
        const response = await fetch("/api/goldsky/protocols")

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("Received data:", data)

        // Transform the data to include colors and convert values
        const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28", "#FF8042"]

        const transformedData = data.map((item: any, index: number) => {
          // Convert string values to numbers and calculate a percentage value
          const tvl = Number.parseFloat(item.totalValueLockedUSD) || 0
          return {
            name: item.name || `Protocol ${index + 1}`,
            // Use a percentage or the TVL as a fallback
            value: index === 0 ? 35 : index === 1 ? 25 : index === 2 ? 20 : index === 3 ? 15 : index === 4 ? 5 : 10,
            color: colors[index % colors.length],
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

        // Fallback to mock data if API fails
        setAllocationData([
          { name: "Uniswap", value: 35, color: "#8884d8" },
          { name: "SushiSwap", value: 25, color: "#82ca9d" },
          { name: "Raydium", value: 20, color: "#ffc658" },
          { name: "Gnosis", value: 15, color: "#ff8042" },
          { name: "Other", value: 5, color: "#0088fe" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAllocationData()
  }, [])

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-md">
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
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {allocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AllocationChart
