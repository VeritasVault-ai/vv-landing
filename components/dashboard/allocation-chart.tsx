"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function AllocationChart() {
  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "ETH/USDC", value: 40, color: "#3A86FF" },
    { name: "BTC/USDT", value: 25, color: "#FF006E" },
    { name: "XTZ/USDC", value: 15, color: "#4ECDC4" },
    { name: "ETH/BTC", value: 10, color: "#8A2BE2" },
    { name: "XTZ/ETH", value: 10, color: "#FFD166" },
  ]

  const COLORS = ["#3A86FF", "#FF006E", "#4ECDC4", "#8A2BE2", "#FFD166"]

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Allocation"]}
          contentStyle={{ backgroundColor: "#1A1A2E", borderColor: "#3A3A5A", borderRadius: "8px" }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value: string) => <span style={{ color: "white", fontSize: "12px" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
