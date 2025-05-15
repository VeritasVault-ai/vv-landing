"use client"
import { useState } from "react"
import type { UserActivity } from "@/types/analytics"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from "./chart-common.module.css"

interface UserActivityChartProps {
  data: UserActivity | undefined
  isLoading: boolean
}

export function UserActivityChart({ data, isLoading }: UserActivityChartProps) {
  const [metrics, setMetrics] = useState<{
    dailyActiveUsers: boolean
    newUsers: boolean
    sessionDuration: boolean
    bounceRate: boolean
  }>({
    dailyActiveUsers: true,
    newUsers: true,
    sessionDuration: false,
    bounceRate: false,
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
  const chartData = data.dailyActiveUsers.map((item, index) => {
    return {
      date: item.date,
      dailyActiveUsers: item.value,
      newUsers: data.newUsers[index]?.value || 0,
      sessionDuration: data.sessionDuration[index]?.value || 0,
      bounceRate: data.bounceRate[index]?.value || 0,
    }
  })

  return (
    <div className={styles.chartContainer}>
      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${metrics.dailyActiveUsers ? styles.active : ""}`}
          onClick={() => toggleMetric("dailyActiveUsers")}
        >
          Daily Active Users
        </button>
        <button
          className={`${styles.controlButton} ${metrics.newUsers ? styles.active : ""}`}
          onClick={() => toggleMetric("newUsers")}
        >
          New Users
        </button>
        <button
          className={`${styles.controlButton} ${metrics.sessionDuration ? styles.active : ""}`}
          onClick={() => toggleMetric("sessionDuration")}
        >
          Session Duration
        </button>
        <button
          className={`${styles.controlButton} ${metrics.bounceRate ? styles.active : ""}`}
          onClick={() => toggleMetric("bounceRate")}
        >
          Bounce Rate
        </button>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
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
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}k`
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
                if (name === "sessionDuration") {
                  return [`${value} min`, "Session Duration"]
                }
                if (name === "bounceRate") {
                  return [`${value}%`, "Bounce Rate"]
                }
                return [value, name === "dailyActiveUsers" ? "Daily Active Users" : "New Users"]
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
                if (value === "dailyActiveUsers") return "Daily Active Users"
                if (value === "newUsers") return "New Users"
                if (value === "sessionDuration") return "Session Duration (min)"
                if (value === "bounceRate") return "Bounce Rate (%)"
                return value
              }}
            />
            {metrics.dailyActiveUsers && (
              <Line
                type="monotone"
                dataKey="dailyActiveUsers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {metrics.newUsers && (
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {metrics.sessionDuration && (
              <Line
                type="monotone"
                dataKey="sessionDuration"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {metrics.bounceRate && (
              <Line
                type="monotone"
                dataKey="bounceRate"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}