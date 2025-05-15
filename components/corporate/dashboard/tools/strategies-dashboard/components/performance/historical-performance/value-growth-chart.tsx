'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useHistoricalData } from '../../../hooks/use-historical-data'

interface ValueGrowthChartProps {
  strategyId: string
  timeframe: string
}

/**
 * Value Growth Chart Component
 * Displays cumulative growth of investment value over time
 */
export function ValueGrowthChart({ strategyId, timeframe }: ValueGrowthChartProps) {
  // In a real implementation, this would fetch data based on strategyId and timeframe
  // Here we're using a custom hook that would handle the data fetching and processing
  const { growthData, isLoading, error } = useHistoricalData(strategyId, timeframe)
  
  // Mock data for value growth
  const mockGrowthData = [
    { date: '2024-06-01', value: 1000000, benchmark: 1000000 },
    { date: '2024-07-01', value: 1018000, benchmark: 1012000 },
    { date: '2024-08-01', value: 1041400, benchmark: 1030200 },
    { date: '2024-09-01', value: 1036200, benchmark: 1022000 },
    { date: '2024-10-01', value: 1069400, benchmark: 1047500 },
    { date: '2024-11-01', value: 1091900, benchmark: 1065300 },
    { date: '2024-12-01', value: 1078800, benchmark: 1049300 },
    { date: '2025-01-01', value: 1109000, benchmark: 1072300 },
    { date: '2025-02-01', value: 1147800, benchmark: 1102300 },
    { date: '2025-03-01', value: 1169600, benchmark: 1118800 },
    { date: '2025-04-01', value: 1161400, benchmark: 1105400 },
    { date: '2025-05-01', value: 1189300, benchmark: 1126400 },
    { date: '2025-05-15', value: 1226900, benchmark: 1155800 }
  ]
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
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
      case 'all': return mockGrowthData; // Show all data
    }
    
    const cutoffDate = new Date(now)
    cutoffDate.setDate(now.getDate() - daysToShow)
    
    return mockGrowthData.filter(item => new Date(item.date) >= cutoffDate)
  }
  
  const filteredData = getFilteredData()
  
  // Calculate performance metrics
  const calculateMetrics = () => {
    if (filteredData.length < 2) return { totalReturn: 0, benchmarkReturn: 0, alpha: 0, beta: 0 }
    
    const firstValue = filteredData[0].value
    const lastValue = filteredData[filteredData.length - 1].value
    const firstBenchmark = filteredData[0].benchmark
    const lastBenchmark = filteredData[filteredData.length - 1].benchmark
    
    const totalReturn = ((lastValue - firstValue) / firstValue) * 100
    const benchmarkReturn = ((lastBenchmark - firstBenchmark) / firstBenchmark) * 100
    const alpha = totalReturn - benchmarkReturn
    const beta = 1.2 // This would be calculated from covariance and variance in a real implementation
    
    return { totalReturn, benchmarkReturn, alpha, beta }
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
      <h3 className="text-lg font-medium">Value Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Value']}
              labelFormatter={(label) => formatDate(label)}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Strategy Value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              name="Benchmark" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Total Return</div>
          <div className="text-xl font-bold mt-1 text-green-600">{metrics.totalReturn.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Benchmark Return</div>
          <div className="text-xl font-bold mt-1">{metrics.benchmarkReturn.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Alpha</div>
          <div className="text-xl font-bold mt-1 text-green-600">+{metrics.alpha.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Beta</div>
          <div className="text-xl font-bold mt-1">{metrics.beta.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}