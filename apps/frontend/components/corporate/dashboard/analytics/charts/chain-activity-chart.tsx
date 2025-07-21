'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Chain Activity Chart Component
 * Displays transaction volume and gas usage over time
 */
export function ChainActivityChart() {
  // Mock data for chain activity
  const activityData = [
    { date: '05/08', transactions: 1250000, gasUsed: 85, avgGasPrice: 25 },
    { date: '05/09', transactions: 1320000, gasUsed: 92, avgGasPrice: 28 },
    { date: '05/10', transactions: 980000, gasUsed: 78, avgGasPrice: 22 },
    { date: '05/11', transactions: 1450000, gasUsed: 95, avgGasPrice: 30 },
    { date: '05/12', transactions: 1680000, gasUsed: 97, avgGasPrice: 35 },
    { date: '05/13', transactions: 1520000, gasUsed: 94, avgGasPrice: 32 },
    { date: '05/14', transactions: 1350000, gasUsed: 88, avgGasPrice: 27 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={activityData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'transactions') return [value.toLocaleString(), 'Transactions']
            if (name === 'gasUsed') return [`${value}%`, 'Gas Used']
            if (name === 'avgGasPrice') return [`${value} gwei`, 'Avg Gas Price']
            return [value, name]
          }}
        />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="transactions" 
          stroke="#3b82f6" 
          name="Transactions"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="gasUsed" 
          stroke="#10b981" 
          name="Gas Used (%)"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="avgGasPrice" 
          stroke="#f59e0b" 
          name="Avg Gas Price (gwei)"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}