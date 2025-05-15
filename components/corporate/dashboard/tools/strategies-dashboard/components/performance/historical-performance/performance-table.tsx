'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PerformanceTableProps {
  strategyId: string
  timeframe: string
}

/**
 * Performance Table Component
 * Displays tabular performance data with detailed metrics
 */
export function PerformanceTable({ strategyId, timeframe }: PerformanceTableProps) {
  // In a real implementation, this would fetch data based on strategyId and timeframe
  // Here we're using a custom hook that would handle the data fetching and processing
  const { tableData, isLoading, error } = useHistoricalData(strategyId, timeframe)
  
  // State for table view (monthly/quarterly/yearly)
  const [tableView, setTableView] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')
  
  // Mock data for performance table
  const mockMonthlyData = [
    { period: '2025-05', return: 3.1, benchmark: 2.6, alpha: 0.5, volatility: 4.2, sharpe: 2.2, drawdown: -1.2, beta: 1.15 },
    { period: '2025-04', return: 2.4, benchmark: 1.9, alpha: 0.5, volatility: 3.8, sharpe: 1.9, drawdown: -2.8, beta: 1.12 },
    { period: '2025-03', return: -0.7, benchmark: -1.2, alpha: 0.5, volatility: 5.1, sharpe: -0.4, drawdown: -4.2, beta: 1.08 },
    { period: '2025-02', return: 1.9, benchmark: 1.5, alpha: 0.4, volatility: 3.5, sharpe: 1.6, drawdown: -2.2, beta: 1.18 },
    { period: '2025-01', return: 3.5, benchmark: 2.8, alpha: 0.7, volatility: 4.0, sharpe: 2.6, drawdown: -0.8, beta: 1.22 },
    { period: '2024-12', return: 2.8, benchmark: 2.2, alpha: 0.6, volatility: 3.7, sharpe: 2.2, drawdown: -1.5, beta: 1.15 },
    { period: '2024-11', return: -1.2, benchmark: -1.5, alpha: 0.3, volatility: 4.8, sharpe: -0.8, drawdown: -3.8, beta: 1.05 },
    { period: '2024-10', return: 2.1, benchmark: 1.7, alpha: 0.4, volatility: 3.4, sharpe: 1.8, drawdown: -1.5, beta: 1.12 },
    { period: '2024-09', return: 3.2, benchmark: 2.5, alpha: 0.7, volatility: 3.9, sharpe: 2.4, drawdown: -0.7, beta: 1.20 },
    { period: '2024-08', return: -0.5, benchmark: -0.8, alpha: 0.3, volatility: 4.5, sharpe: -0.3, drawdown: -2.5, beta: 1.08 },
    { period: '2024-07', return: 2.3, benchmark: 1.8, alpha: 0.5, volatility: 3.6, sharpe: 1.9, drawdown: -1.2, beta: 1.14 },
    { period: '2024-06', return: 1.8, benchmark: 1.2, alpha: 0.6, volatility: 3.2, sharpe: 1.7, drawdown: -0.8, beta: 1.10 }
  ]
  
  const mockQuarterlyData = [
    { period: 'Q2 2025', return: 5.5, benchmark: 4.5, alpha: 1.0, volatility: 4.0, sharpe: 2.1, drawdown: -2.8, beta: 1.15 },
    { period: 'Q1 2025', return: 4.7, benchmark: 3.1, alpha: 1.6, volatility: 4.2, sharpe: 1.7, drawdown: -4.2, beta: 1.16 },
    { period: 'Q4 2024', return: 3.7, benchmark: 2.4, alpha: 1.3, volatility: 4.1, sharpe: 1.4, drawdown: -3.8, beta: 1.12 },
    { period: 'Q3 2024', return: 5.0, benchmark: 3.5, alpha: 1.5, volatility: 3.8, sharpe: 2.0, drawdown: -2.5, beta: 1.14 }
  ]
  
  const mockYearlyData = [
    { period: '2025 YTD', return: 10.2, benchmark: 7.6, alpha: 2.6, volatility: 4.1, sharpe: 1.9, drawdown: -4.2, beta: 1.15 },
    { period: '2024', return: 12.8, benchmark: 9.5, alpha: 3.3, volatility: 3.9, sharpe: 1.8, drawdown: -3.8, beta: 1.12 }
  ]
  
  // Format period for display
  const formatPeriod = (periodStr: string) => {
    if (periodStr.includes('Q')) {
      return periodStr // Already formatted for quarters
    } else if (periodStr.includes('YTD') || !periodStr.includes('-')) {
      return periodStr // Already formatted for years
    } else {
      // Format month-year
      const [year, month] = periodStr.split('-')
      const date = new Date(parseInt(year), parseInt(month) - 1)
      return date.toLocaleString('default', { month: 'short', year: 'numeric' })
    }
  }
  
  // Get the appropriate data based on the selected view
  const getTableData = () => {
    switch (tableView) {
      case 'monthly': return mockMonthlyData
      case 'quarterly': return mockQuarterlyData
      case 'yearly': return mockYearlyData
    }
  }
  
  const tableDataToDisplay = getTableData()
  
  if (isLoading) {
    return <div className="h-80 flex items-center justify-center">Loading data...</div>
  }
  
  if (error) {
    return <div className="h-80 flex items-center justify-center text-red-500">Error loading data</div>
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Performance Table</h3>
        <div className="flex space-x-2">
          <Button 
            variant={tableView === 'monthly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTableView('monthly')}
          >
            Monthly
          </Button>
          <Button 
            variant={tableView === 'quarterly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTableView('quarterly')}
          >
            Quarterly
          </Button>
          <Button 
            variant={tableView === 'yearly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTableView('yearly')}
          >
            Yearly
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Period</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Return</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Benchmark</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Alpha</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Volatility</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Sharpe</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Max DD</th>
              <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Beta</th>
            </tr>
          </thead>
          <tbody>
            {tableDataToDisplay.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4 font-medium">{formatPeriod(row.period)}</td>
                <td className={`text-right py-3 px-4 ${row.return >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {row.return.toFixed(2)}%
                </td>
                <td className={`text-right py-3 px-4 ${row.benchmark >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {row.benchmark.toFixed(2)}%
                </td>
                <td className={`text-right py-3 px-4 ${row.alpha >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {row.alpha.toFixed(2)}%
                </td>
                <td className="text-right py-3 px-4">{row.volatility.toFixed(2)}%</td>
                <td className="text-right py-3 px-4">{row.sharpe.toFixed(2)}</td>
                <td className="text-right py-3 px-4 text-red-600 dark:text-red-500">{row.drawdown.toFixed(2)}%</td>
                <td className="text-right py-3 px-4">{row.beta.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function useHistoricalData(strategyId: string, timeframe: string): { tableData: any; isLoading: any; error: any } {
  throw new Error("Function not implemented.")
}
