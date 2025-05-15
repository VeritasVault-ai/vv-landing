'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * Macroeconomic Indicators Chart Component
 * Displays key economic metrics affecting markets
 */
export function MacroeconomicIndicatorsChart() {
  // Mock data for macroeconomic indicators
  const macroEconomicData = [
    { name: "Inflation", value: 3.8 },
    { name: "GDP Growth", value: 2.1 },
    { name: "Interest Rate", value: 4.5 },
    { name: "Unemployment", value: 3.7 },
    { name: "Consumer Sentiment", value: 6.8 } // Normalized to percentage for visualization
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={macroEconomicData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Value']}
        />
        <Bar 
          dataKey="value" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
          background={{ fill: '#eee' }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}