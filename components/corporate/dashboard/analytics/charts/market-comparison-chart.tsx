'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Market Comparison Chart Component
 * Compares traditional markets with crypto markets over time
 */
export function MarketComparisonChart() {
  // Mock data for market comparison
  const marketData = [
    { name: "Jan", "S&P 500": 4.5, "Crypto Market": 7.2 },
    { name: "Feb", "S&P 500": 3.8, "Crypto Market": -2.1 },
    { name: "Mar", "S&P 500": -2.1, "Crypto Market": 5.7 },
    { name: "Apr", "S&P 500": 5.7, "Crypto Market": 12.3 },
    { name: "May", "S&P 500": 2.3, "Crypto Market": -8.4 },
    { name: "Jun", "S&P 500": 6.4, "Crypto Market": 6.4 },
    { name: "Jul", "S&P 500": 4.2, "Crypto Market": 9.2 },
    { name: "Aug", "S&P 500": -1.8, "Crypto Market": -1.8 },
    { name: "Sep", "S&P 500": 3.1, "Crypto Market": 3.1 },
    { name: "Oct", "S&P 500": 5.2, "Crypto Market": 15.2 },
    { name: "Nov", "S&P 500": 4.8, "Crypto Market": 4.8 },
    { name: "Dec", "S&P 500": 6.9, "Crypto Market": 10.9 }
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={marketData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Return']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="S&P 500" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line 
          type="monotone" 
          dataKey="Crypto Market" 
          stroke="#10b981" 
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}