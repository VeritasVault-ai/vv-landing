'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

/**
 * Protocol Metrics Chart Component
 * Displays key metrics for different protocols
 */
export function ProtocolMetricsChart() {
  // Mock data for protocol metrics
  const protocolData = [
    { name: 'Uniswap', tvl: 5.8, volume: 3.2, fees: 4.1, color: '#ff007a' },
    { name: 'Aave', tvl: 4.2, volume: 1.8, fees: 2.5, color: '#b6509e' },
    { name: 'Compound', tvl: 3.1, volume: 1.2, fees: 1.8, color: '#00d395' },
    { name: 'Curve', tvl: 3.8, volume: 2.5, fees: 2.2, color: '#3a68d9' },
    { name: 'MakerDAO', tvl: 7.2, volume: 0.9, fees: 3.5, color: '#1aab9b' }
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={protocolData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'tvl') return [`$${value}B`, 'TVL']
            if (name === 'volume') return [`$${value}B`, '24h Volume']
            if (name === 'fees') return [`$${value}M`, '24h Fees']
            return [value, name]
          }}
        />
        <Legend />
        <Bar 
          dataKey="tvl" 
          name="TVL (Billions)" 
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="volume" 
          name="24h Volume (Billions)" 
          fill="#10b981" 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="fees" 
          name="24h Fees (Millions)" 
          radius={[4, 4, 0, 0]} 
        >
          {protocolData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}