'use client'

import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface PerformanceOverviewProps {
  strategyId: string
}

/**
 * Performance Overview Component
 * Displays a high-level overview of strategy performance with key charts and metrics
 */
export function PerformanceOverview({ strategyId }: PerformanceOverviewProps) {
  // Mock data for performance metrics
  const performanceData = [
    { date: '2025-01', return: 1.8 },
    { date: '2025-02', return: 2.3 },
    { date: '2025-03', return: -0.5 },
    { date: '2025-04', return: 3.2 },
    { date: '2025-05', return: 2.1 }
  ]
  
  // Mock data for asset allocation
  const allocationData = [
    { name: 'USDC', value: 35, color: '#2563eb' },
    { name: 'ETH', value: 25, color: '#7c3aed' },
    { name: 'WBTC', value: 15, color: '#f59e0b' },
    { name: 'DAI', value: 10, color: '#10b981' },
    { name: 'AAVE', value: 8, color: '#ec4899' },
    { name: 'Other', value: 7, color: '#6b7280' }
  ]
  
  // Mock data for performance metrics
  const keyMetrics = [
    { name: 'Total Return', value: '15.2%' },
    { name: 'Annualized Return', value: '12.8%' },
    { name: 'Sharpe Ratio', value: '1.85' },
    { name: 'Max Drawdown', value: '4.2%' },
    { name: 'Volatility', value: '6.8%' },
    { name: 'Avg. Daily Return', value: '0.08%' }
  ]
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }
  
  return (
    <div className="space-y-6">
      {/* Performance chart */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Performance History</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Return']}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="return" 
                  name="Monthly Return" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset allocation */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Key performance metrics */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Key Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">{metric.name}</div>
                  <div className="text-2xl font-bold mt-1">{metric.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}