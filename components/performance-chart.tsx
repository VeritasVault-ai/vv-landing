"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { getBrowserClient } from "@/lib/supabase"

interface PerformanceData {
  name: string
  returns: number
}

// Add named export alongside default export
export const PerformanceChart = () => {
  const [data, setData] = useState<PerformanceData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const mockData = [
          { name: "Jan", returns: 4.2 },
          { name: "Feb", returns: 5.1 },
          { name: "Mar", returns: 3.8 },
          { name: "Apr", returns: 6.2 },
          { name: "May", returns: 5.7 },
          { name: "Jun", returns: 7.3 },
        ]
        setData(mockData)
      } catch (err) {
        console.error("Error fetching performance data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, "Returns"]} />
        <Legend />
        <Bar dataKey="returns" name="Monthly Returns" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Keep default export for backward compatibility
export default PerformanceChart
