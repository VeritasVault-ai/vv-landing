'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

/**
 * Correlation Analysis Chart Component
 * Shows correlation between crypto assets and traditional financial assets
 */
export function CorrelationAnalysisChart() {
  // Mock data for correlation analysis
  const correlationData = [
    { name: "BTC-Gold", value: -0.12, color: "#f59e0b" },
    { name: "BTC-S&P500", value: 0.35, color: "#3b82f6" },
    { name: "ETH-NASDAQ", value: 0.42, color: "#10b981" },
    { name: "Crypto-Forex", value: 0.18, color: "#8b5cf6" },
    { name: "DeFi-FinTech", value: 0.65, color: "#ec4899" }
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={correlationData}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
        <XAxis type="number" domain={[-1, 1]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip 
          formatter={(value: number) => [`${value.toFixed(2)}`, 'Correlation']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {correlationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}