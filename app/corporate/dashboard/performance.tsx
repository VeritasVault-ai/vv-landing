"use client"

import { useDashboardData } from "@/lib/hooks/useDashboardData"

/**
 * Dashboard performance component that shows detailed performance metrics
 */
export function DashboardPerformance() {
  const { performanceMetrics, isModelSimulated } = useDashboardData()
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Analytics</h2>
      
      {/* Performance charts would go here */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Historical Performance</h3>
        <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
          <p className="text-slate-500">
            Historical performance chart would render here
          </p>
        </div>
      </div>
      
      {/* Performance tables would go here */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Performance Breakdown</h3>
        <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
          <p className="text-slate-500">
            Performance breakdown table would render here
          </p>
        </div>
      </div>
      
      {isModelSimulated && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1">
          <span>⚠️</span>
          <span>Using simulated performance data</span>
        </div>
      )}
    </div>
  )
}