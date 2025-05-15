"use client"
import { useState } from "react"
import type { TransactionMetrics } from "@/types/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/formatters"
import styles from "./chart-common.module.css"

interface TransactionVolumeChartProps {
  data: TransactionMetrics | undefined
  isLoading: boolean
}

export function TransactionVolumeChart({ data, isLoading }: TransactionVolumeChartProps) {
  const [metrics, setMetrics] = useState<{
    volume: boolean
    count: boolean
    averageValue: boolean
    fees: boolean
  }>({
    volume: true,
    count: false,
    averageValue: false,
    fees: false,
  })

  const toggleMetric = (metric: keyof typeof metrics) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }))
  }

  if (isLoading) {
    return <div className={styles.skeleton}></div>
  }

  if (!data) {
    return <div className={styles.noData}>No data available</div>
  }

  // Prepare chart data by combining all metrics
  const chartData = data.volume.map((item, index) => {
    return {
      date: item.date,
      volume: item.value,
      count: data.count[index]?.value || 0,
      averageValue: data.averageValue[index]?.value || 0,
      fees: data.fees[index]?.value || 0,
    }
  })

  return (
    <div className={styles.chartContainer}>
      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${metrics.volume ? styles.active : ""}`}
          onClick={() => toggleMetric("volume")}
        >
          Volume
        </button>
        <button
          className={`${styles.controlButton} ${metrics.count ? styles.active : ""}`}
          onClick={() => toggleMetric("count")}
        >
          Transaction Count
        </button>
        <button
          className={`${styles.controlButton} ${metrics.averageValue ? styles.active : ""}`}
          onClick={() => toggleMetric("averageValue")}
        >
          Average Value
        </button>
        <button
          className={`${styles.controlButton} ${metrics.fees ? styles.active : ""}`}
          onClick={() => toggleMetric("fees")}
        >
          Fees
        </button>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value) => {
                if (metrics.volume || metrics.fees) {
                  if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`
                  } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(1)}K`
                  }
                  return `$${value}`
                } else if (metrics.count) {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`
                  }
                  return value
                } else if (metrics.averageValue) {
                  return `$${value}`
                }
                return value
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value, name) => {
                if (name === "volume" || name === "fees" || name === "averageValue") {
                  return [
                    formatCurrency(value as number),
                    name === "volume" ? "Volume" : name === "fees" ? "Fees" : "Average Value",
                  ]
                }
                return [value, "Transaction Count"]
              }}
              labelFormatter={(label) => {
                const date = new Date(label)
                return date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, color: "#64748b" }}
              formatter={(value) => {
                if (value === "volume") return "Volume"
                if (value === "count") return "Transaction Count"
                if (value === "averageValue") return "Average Value"
                if (value === "fees") return "Fees"
                return value
              }}
            />
            {metrics.volume && <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />}
            {metrics.count && <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />}
            {metrics.averageValue && <Bar dataKey="averageValue" fill="#f59e0b" radius={[4, 4, 0, 0]} />}
            {metrics.fees && <Bar dataKey="fees" fill="#8b5cf6" radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}