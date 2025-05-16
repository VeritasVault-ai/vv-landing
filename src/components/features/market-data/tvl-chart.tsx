"use client"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { formatCurrency, formatDate } from "@/src/lib/formatters"
import type { HistoricalTvlData } from "@/src/types/market-data"
import { useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import styles from "./tvl-chart.module.css"

export interface TvlChartProps {
  historicalData: HistoricalTvlData[]
  chainName: string
}

export const TvlChart = ({ historicalData, chainName }: TvlChartProps) => {
  const formattedData = useMemo(() => {
    return historicalData.map((item) => ({
      date: formatDate(new Date(item.date)),
      tvl: item.tvl,
      timestamp: item.date,
    }))
  }, [historicalData])

  const capitalizedChainName = chainName.charAt(0).toUpperCase() + chainName.slice(1)

  return (
    <div className={styles.chartWrapper}>
      <ChartContainer
        config={{
          tvl: {
            label: `${capitalizedChainName} TVL`,
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} minTickGap={30} />
            <YAxis
              tickFormatter={(value) => formatCurrency(value, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="tvl"
              stroke="var(--color-tvl)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
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
      tvl: number
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
          <span className={styles.tooltipLabel}>TVL:</span> {formatCurrency(data.tvl)}
        </p>
      </div>
    </ChartTooltipContent>
  )
}