"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { formatCurrency, formatNumber, formatDate } from "@/lib/formatters"
import styles from "./protocol-activity-chart.module.css"

interface DailyMetric {
  date: string
  volume: number
  tvl: number
  activeUsers: number
  transactions: number
}

export interface ProtocolActivityChartProps {
  metrics: DailyMetric[]
}

export const ProtocolActivityChart = ({ metrics }: ProtocolActivityChartProps) => {
  const formattedData = useMemo(() => {
    return metrics.map((item) => ({
      date: formatDate(new Date(item.date)),
      volume: item.volume,
      tvl: item.tvl,
      users: item.activeUsers,
      transactions: item.transactions,
      timestamp: item.date,
    }))
  }, [metrics])

  return (
    <div className={styles.chartWrapper}>
      <ChartContainer
        config={{
          volume: {
            label: "Volume",
            color: "hsl(var(--chart-1))",
          },
          tvl: {
            label: "TVL",
            color: "hsl(var(--chart-2))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-volume)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-volume)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-tvl)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-tvl)" stopOpacity={0} />
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
              dataKey="volume"
              stroke="var(--color-volume)"
              fillOpacity={1}
              fill="url(#colorVolume)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="tvl"
              stroke="var(--color-tvl)"
              fillOpacity={1}
              fill="url(#colorTvl)"
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
    dataKey: string
    payload: {
      date: string
      volume: number
      tvl: number
      users: number
      transactions: number
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
        <div className={styles.tooltipMetrics}>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>Volume:</span>
            <span>{formatCurrency(data.volume)}</span>
          </div>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>TVL:</span>
            <span>{formatCurrency(data.tvl)}</span>
          </div>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>Users:</span>
            <span>{formatNumber(data.users)}</span>
          </div>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>Txs:</span>
            <span>{formatNumber(data.transactions)}</span>
          </div>
        </div>
      </div>
    </ChartTooltipContent>
  )
}