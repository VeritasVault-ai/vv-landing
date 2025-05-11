"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PerformanceChartProps {
  timeframe: string
}

export function PerformanceChart({ timeframe }: PerformanceChartProps) {
  // Sample data - in a real app, this would come from an API
  const data = {
    "7d": [
      { date: "Mon", tvl: 120000, yield: 2800, benchmark: 2400 },
      { date: "Tue", tvl: 122000, yield: 2950, benchmark: 2500 },
      { date: "Wed", tvl: 125000, yield: 3100, benchmark: 2600 },
      { date: "Thu", tvl: 124000, yield: 3250, benchmark: 2700 },
      { date: "Fri", tvl: 126000, yield: 3400, benchmark: 2800 },
      { date: "Sat", tvl: 127000, yield: 3600, benchmark: 2900 },
      { date: "Sun", tvl: 128429, yield: 3849, benchmark: 3000 },
    ],
    "30d": [
      { date: "Week 1", tvl: 115000, yield: 2500, benchmark: 2200 },
      { date: "Week 2", tvl: 118000, yield: 2700, benchmark: 2300 },
      { date: "Week 3", tvl: 122000, yield: 3100, benchmark: 2600 },
      { date: "Week 4", tvl: 128429, yield: 3849, benchmark: 3000 },
    ],
    "90d": [
      { date: "Jan", tvl: 100000, yield: 2000, benchmark: 1800 },
      { date: "Feb", tvl: 110000, yield: 2400, benchmark: 2100 },
      { date: "Mar", tvl: 120000, yield: 3200, benchmark: 2700 },
      { date: "Apr", tvl: 128429, yield: 3849, benchmark: 3000 },
    ],
    "1y": [
      { date: "Q1", tvl: 90000, yield: 1800, benchmark: 1600 },
      { date: "Q2", tvl: 100000, yield: 2200, benchmark: 1900 },
      { date: "Q3", tvl: 115000, yield: 2900, benchmark: 2400 },
      { date: "Q4", tvl: 128429, yield: 3849, benchmark: 3000 },
    ],
  }

  return (
    <ChartContainer
      config={{
        tvl: {
          label: "TVL",
          color: "hsl(var(--chart-1))",
        },
        yield: {
          label: "Yield",
          color: "hsl(var(--chart-2))",
        },
        benchmark: {
          label: "Benchmark",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data[timeframe as keyof typeof data]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" stroke="hsl(var(--foreground))" opacity={0.5} />
          <YAxis stroke="hsl(var(--foreground))" opacity={0.5} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="tvl"
            stroke="var(--color-tvl)"
            name="TVL"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="yield"
            stroke="var(--color-yield)"
            name="Yield"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="var(--color-benchmark)"
            name="Benchmark"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
