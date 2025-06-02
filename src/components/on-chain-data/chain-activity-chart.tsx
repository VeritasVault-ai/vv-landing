"use client"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { formatCurrency, formatDate, formatNumber } from "@/src/lib/formatters"
import { useMemo } from "react"
import { Bar, BarChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import styles from "@/src/components/shared/chart.module.css"

interface DailyMetric {
  date: string
  blocks: number
  transactions: number
  activeAddresses: number
  gasUsed: number
  avgGasPrice: number
  valueTransferred: number
}

export interface ChainActivityChartProps {
  metrics: DailyMetric[]
}

export const ChainActivityChart = ({ metrics }: ChainActivityChartProps) => {
  const formattedData = useMemo(() => {
    return metrics.map((item) => ({
      date: formatDate(new Date(item.date)),
      transactions: item.transactions,
      activeAddresses: item.activeAddresses,
      valueTransferred: item.valueTransferred,
      timestamp: item.date,
    }))
  }, [metrics])

  return (
    <div className={styles.chartWrapper}>
      <ChartContainer
        config={{
          transactions: {
            label: "Transactions",
            color: "hsl(var(--chart-1))",
          },
          activeAddresses: {
            label: "Active Addresses",
            color: "hsl(var(--chart-2))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} minTickGap={30} />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => formatNumber(value, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => formatNumber(value, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="left"
              dataKey="transactions"
              fill="var(--color-transactions)"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="activeAddresses"
              stroke="var(--color-addresses)"
              strokeWidth={2}
              dot={false}
            />
          </BarChart>
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
      transactions: number
      activeAddresses: number
      valueTransferred: number
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
            <span className={styles.tooltipLabel}>Transactions:</span>
            <span>{formatNumber(data.transactions)}</span>
          </div>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>Active Addresses:</span>
            <span>{formatNumber(data.activeAddresses)}</span>
          </div>
          <div className={styles.tooltipMetric}>
            <span className={styles.tooltipLabel}>Value Transferred:</span>
            <span>{formatCurrency(data.valueTransferred)}</span>
          </div>
        </div>
      </div>
    </ChartTooltipContent>
  )
}