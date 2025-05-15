'use client'

import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useHistoricalData } from '../../../hooks/use-historical-data'

interface DrawdownChartProps {
  strategyId: string
  timeframe: string
}

/**
 * Drawdown Chart Component
 * Visualizes the drawdowns (peak-to-trough declines) over time
 */
export function DrawdownChart({ strategyId, timeframe }: DrawdownChartProps) {
  // In a real implementation, this would fetch data based on strategyId and timeframe
  // Here we're using a custom hook that would handle the data fetching and processing
  const { drawdownData, isLoading, error } = useHistoricalData(strategyId, timeframe)
  
  // Mock data for drawdowns
  const mockDrawdownData = [
    { date: '2024-06-01', drawdown: 0, benchmark: 0 },
    { date: '2024-06-15', drawdown: -0.5, benchmark: -0.8 },
    { date: '2024-07-01', drawdown: 0, benchmark: 0 },
    { date: '2024-07-15', drawdown: -0.3, benchmark: -0.5 },
    { date: '2024-08-01', drawdown: -1.2, benchmark: -1.8 },
    { date: '2024-08-15', drawdown: -2.5, benchmark: -3.2 },
    { date: '2024-09-01', drawdown: -1.8, benchmark: -2.5 },
    { date: '2024-09-15', drawdown: 0, benchmark: -0.5 },
    { date: '2024-10-01', drawdown: 0, benchmark: 0 },
    { date: '2024-10-15', drawdown: -0.7, benchmark: -1.2 },
    { date: '2024-11-01', drawdown: -1.5, benchmark: -2.3 },
    { date: '2024-11-15', drawdown: -3.8, benchmark: -4.5 },
    { date: '2024-12-01', drawdown: -2.1, benchmark: -3.2 },
    { date: '2024-12-15', drawdown: -0.5, benchmark: -1.5 },
    { date: '2025-01-01', drawdown: 0, benchmark: 0 },
    { date: '2025-01-15', drawdown: -0.8, benchmark: -1.2 },
    { date: '2025-02-01', drawdown: -1.5, benchmark: -2.1 },
    { date: '2025-02-15', drawdown: -0.5, benchmark: -1.5 },
    { date: '2025-03-01', drawdown: 0, benchmark: -0.5 },
    { date: '2025-03-15', drawdown: -2.2, benchmark: -3.1 },
    { date: '2025-04-01', drawdown: -4.2, benchmark: -5.5 },
    { date: '2025-04-15', drawdown: -2.8, benchmark: -4.2 },
    { date: '2025-05-01', drawdown: -1.2, benchmark: -2.5 },
    { date: '2025-05-15', drawdown: 0, benchmark: -0.8 }
  ]
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  // Filter data based on timeframe
  const getFilteredData = () => {
    // In a real implementation, this would use the actual data from the hook
    // For this example, we'll just use the mock data with simple filtering
    
    const now = new Date()
    let daysToShow = 365 // default to 1 year
    
    switch (timeframe) {
      case '1m': daysToShow = 30; break;
      case '3m': daysToShow = 90; break;
      case '6m': daysToShow = 180; break;
      case '1y': daysToShow = 365; break;
      case 'all': return mockDrawdownData; // Show all data
    }
    
    const cutoffDate = new Date(now)
    cutoffDate.setDate(now.getDate() - daysToShow)
    
    return mockDrawdownData.filter(item => new Date(item.date) >= cutoffDate)
  }
  
  const filteredData = getFilteredData()
  
  // Calculate drawdown metrics
  const calculateMetrics = () => {
    if (filteredData.length === 0) return { maxDrawdown: 0, avgDrawdown: 0, recoveryTime: 0, drawdownFrequency: 0 }
    
    // Find maximum drawdown
    const maxDrawdown = Math.min(...filteredData.map(item => item.drawdown))
    
    // Calculate average drawdown (only negative values)
    const negativeDrawdowns = filteredData.filter(item => item.drawdown < 0).map(item => item.drawdown)
    const avgDrawdown = negativeDrawdowns.length > 0 
      ? negativeDrawdowns.reduce((sum, val) => sum + val, 0) / negativeDrawdowns.length
      : 0
    
    // Count drawdown periods (sequences of negative values)
    let drawdownPeriods = 0
    let inDrawdown = false
    
    for (const item of filteredData) {
      if (!inDrawdown && item.drawdown < 0) {
        inDrawdown = true
        drawdownPeriods++
      } else if (inDrawdown && item.drawdown === 0) {
        inDrawdown = false
      }
    }
    
    // Average recovery time (in days) - would be calculated from actual periods in real implementation
    const recoveryTime = 12
    
    // Drawdown frequency (average number of drawdowns per year)
    const timeframeInDays = filteredData.length > 1 
      ? (new Date(filteredData[filteredData.length - 1].date).getTime() - new Date(filteredData[0].date).getTime()) / (1000 * 60 * 60 * 24)
      : 365
    
    const drawdownFrequency = drawdownPeriods / (timeframeInDays / 365)
    
    return { maxDrawdown, avgDrawdown, recoveryTime, drawdownFrequency }
  }
  
  const metrics = calculateMetrics()
  
  if (isLoading) {
    return <div className="h-80 flex items-center justify-center">Loading data...</div>
  }
  
  if (error) {
    return <div className="h-80 flex items-center justify-center text-red-500">Error loading data</div>
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Drawdown Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr)
                return date.toLocaleDateString('default', { month: 'short', year: '2-digit' })
              }}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Drawdown']}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="drawdown" 
              name="Strategy Drawdown" 
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.2}
            />
            <Area 
              type="monotone" 
              dataKey="benchmark" 
              name="Benchmark Drawdown" 
              stroke="#10b981" 
              fill="#10b981"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Maximum Drawdown</div>
          <div className="text-xl font-bold mt-1 text-red-600">{metrics.maxDrawdown.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Average Drawdown</div>
          <div className="text-xl font-bold mt-1 text-red-600">{metrics.avgDrawdown.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Recovery Time</div>
          <div className="text-xl font-bold mt-1">{metrics.recoveryTime} days</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Drawdown Frequency</div>
          <div className="text-xl font-bold mt-1">{metrics.drawdownFrequency.toFixed(1)}/year</div>
        </div>
      </div>
    </div>
  )
}