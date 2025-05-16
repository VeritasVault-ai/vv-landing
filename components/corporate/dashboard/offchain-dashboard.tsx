'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics'
import { DashboardActivity } from '@/components/dashboard/dashboard-activity'

interface OffChainDashboardProps {
  fullView?: boolean
}

/**
 * Off-Chain Analytics Dashboard component
 * Displays market data, traditional finance metrics, and cross-chain comparisons
 */
export function OffChainDashboard({ fullView = true }: OffChainDashboardProps) {
  // Mock data for market metrics
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
  
  const correlationData = [
    { name: "BTC-Gold", value: -0.12, color: "#f59e0b" },
    { name: "BTC-S&P500", value: 0.35, color: "#3b82f6" },
    { name: "ETH-NASDAQ", value: 0.42, color: "#10b981" },
    { name: "Crypto-Forex", value: 0.18, color: "#8b5cf6" },
    { name: "DeFi-FinTech", value: 0.65, color: "#ec4899" }
  ]
  
  const macroEconomicData = [
    { name: "Inflation", value: 3.8 },
    { name: "GDP Growth", value: 2.1 },
    { name: "Interest Rate", value: 4.5 },
    { name: "Unemployment", value: 3.7 },
    { name: "Consumer Sentiment", value: 68.3 }
  ]

  const crossChainComparison = [
    { name: "Ethereum", transactions: 12500000, fees: 4.5, tvl: 48.2 },
    { name: "Solana", transactions: 65000000, fees: 0.001, tvl: 12.7 },
    { name: "Avalanche", transactions: 8500000, fees: 0.25, tvl: 8.3 },
    { name: "Polygon", transactions: 35000000, fees: 0.01, tvl: 6.1 },
    { name: "Tezos", transactions: 3200000, fees: 0.05, tvl: 2.8 }
  ]

  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
            <CardDescription>Traditional vs Crypto Markets Performance</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>
        
        {/* Correlation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Correlation Analysis</CardTitle>
            <CardDescription>Relationship between crypto and traditional assets</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Macroeconomic Indicators */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Macroeconomic Indicators</CardTitle>
            <CardDescription>Key economic metrics affecting markets</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
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
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Market Events</CardTitle>
            <CardDescription>Recent significant market events</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActivity limit={5} />
          </CardContent>
        </Card>
      </div>
      
      {fullView && (
        <Card>
          <CardHeader>
            <CardTitle>Cross-Chain Comparison</CardTitle>
            <CardDescription>Performance metrics across different blockchains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Blockchain</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                      Daily Transactions
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                      Avg. Fee (USD)
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                      TVL (Billion USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {crossChainComparison.map((chain, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">{chain.name}</td>
                      <td className="text-right py-3 px-4">{chain.transactions.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">${chain.fees}</td>
                      <td className="text-right py-3 px-4">${chain.tvl.toFixed(1)}B</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}