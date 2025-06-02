"use client"
import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/src/components/ui/chart"
import { formatCurrency, formatDate } from "@/src/lib/formatters"
import styles from "@/src/components/shared/chart.module.css"

interface PortfolioChartProps {
  data: {
    date: string
    value: number
  }[]
}

export const PortfolioChart = ({ data }: PortfolioChartProps) => {
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      date: formatDate(new Date(item.date), { format: "short" }),
      value: item.value,
      timestamp: item.date,
    }))
  }, [data])

  return (
    <div className={styles.chartWrapper}>
      <ChartContainer
        config={{
          value: {
            label: "Portfolio Value",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} minTickGap={30} />
            <YAxis
              tickFormatter={(value) => formatCurrency(value, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: {
      date: string
      value: number
      timestamp: string
    }
  }>
  label?: string
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0].payload
  const date = new Date(data.timestamp)
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <ChartTooltipContent>
      <div className={styles.tooltipContent}>
        <p className={styles.tooltipDate}>{formattedDate}</p>
        <p className={styles.tooltipValue}>
          <span className={styles.tooltipLabel}>Value:</span> {formatCurrency(data.value)}
        </p>
      </div>
    </ChartTooltipContent>
  )
}