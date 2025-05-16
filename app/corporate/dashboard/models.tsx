"use client"

import { useDashboardData } from "@/lib/hooks/useDashboardData"

/**
 * Model results component that shows AI model predictions and analytics
 */
export function ModelResults() {
  const { modelData, isModelSimulated } = useDashboardData()
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Model Results</h2>
      
      {/* Model status */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Model Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Status</div>
            <div className="text-xl font-semibold">{modelData?.modelStatus || 'Unknown'}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Active Model</div>
            <div className="text-xl font-semibold">{modelData?.activeModel || 'None'}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Available Models</div>
            <div className="text-xl font-semibold">{modelData?.availableModels?.length || 0}</div>
          </div>
        </div>
      </div>
      
      {/* Model results */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Prediction Results</h3>
        {modelData?.results ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-slate-500">Accuracy</div>
                <div className="text-xl font-semibold">{(modelData.results.accuracy * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Confidence</div>
                <div className="text-xl font-semibold">{(modelData.results.confidence * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Execution Time</div>
                <div className="text-xl font-semibold">{modelData.results.executionTime}</div>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
              <p className="text-slate-500">
                Prediction chart would render here
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <p className="text-slate-500">No model results available</p>
          </div>
        )}
      </div>
      
      {isModelSimulated && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1">
          <span>⚠️</span>
          <span>Using simulated model data</span>
        </div>
      )}
    </div>
  )
}