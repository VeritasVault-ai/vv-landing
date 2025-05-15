'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useHistoricalData } from '../../../hooks/use-historical-data'

interface ReturnsChartProps {
  strategyId: string
  timeframe: string
}

/**
 * Returns Chart Component
 * Displays monthly or periodic returns as a bar chart
 */
export function ReturnsChart({ strategyId, timeframe }: ReturnsChartProps) {
  // In a real implementation, this would fetch data based on strategyId and timeframe
  // Here we're using a custom hook that would handle the data fetching and processing
  const { returnsData, isLoading, error } = useHistoricalData(strategyId, timeframe)
  
  // Mock data for returns
  const mockReturnsData = [
    { date: '2024-06', return: 1.8, benchmark: 1.2 },
    { date: '2024-07', return: 2.3, benchmark: 1.8 },
    { date: '2024-08', return: -0.5, benchmark: -0.8 },
    { date: '2024-09', return: 3.2, benchmark: 2.5 },
    { date: '2024-10', return: 2.1, benchmark: 1.7 },
    { date: '2024-11', return: -1.2, benchmark: -1.5 },
    { date: '2024-12', return: 2.8, benchmark: 2.2 },
    { date: '2025-01', return: 3.5, benchmark: 2.8 },
    { date: '2025-02', return: 1.9, benchmark: 1.5 },
    { date: '2025-03', return: -0.7, benchmark: -1.2 },
    { date: '2025-04', return: 2.4, benchmark: 1.9 },
    { date: '2025-05', return: 3.1, benchmark: 2.6 }
  ]
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }
  
  // Filter data based on timeframe
  const getFilteredData = () => {
    // In a real implementation, this would use the actual data from the hook
    // For this example, we'll just use the mock data with simple filtering
    
    const now = new Date()
    let monthsToShow = 12 // default to 1 year
    
    switch (timeframe) {
      case '1m': monthsToShow = 1; break;
      case '3m': monthsToShow = 3; break;
      case '6m': monthsToShow = 6; break;
      case '1y': monthsToShow = 12; break;
      case 'all': return mockReturnsData; // Show all data
    }
    
    return mockReturnsData.slice(-monthsToShow)
  }
  
  const filteredData = getFilteredData()
  
  if (isLoading) {
    return <div className="h-80 flex items-center justify-center">Loading data...</div>
  }
  
  if (error) {
    return <div className="h-80 flex items-center justify-center text-red-500">Error loading data</div>
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Monthly Returns</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
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
            <Bar 
              dataKey="return" 
              name="Strategy Return" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="benchmark" 
              name="Benchmark" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Monthly Return</div>
          <div className="text-xl font-bold mt-1">2.1%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Best Month</div>
          <div className="text-xl font-bold mt-1 text-green-600">3.5%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Worst Month</div>
          <div className="text-xl font-bold mt-1 text-red-600">-1.2%</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 dark:text-slate-400">Positive Months</div>
          <div className="text-xl font-bold mt-1">75%</div>
        </div>
      </div>
    </div>
  )
}