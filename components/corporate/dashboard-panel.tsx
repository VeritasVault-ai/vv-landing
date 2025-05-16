import { ReactNode } from "react"

interface DashboardPanelProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * A standardized panel component for dashboard content with proper alignment
 * for charts, tables, and other data visualizations.
 */
export function DashboardPanel({ 
  title, 
  description, 
  children, 
  className = "" 
}: DashboardPanelProps) {
  return (
    <div className={`bg-slate-800/50 dark:bg-slate-900/50 rounded-lg border border-slate-700/50 p-4 ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>
      <div className="dashboard-panel-content">
        {children}
      </div>
    </div>
  )
}

/**
 * A component specifically for displaying data tables with proper styling
 */
export function DataTable({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      {children}
    </div>
  )
}

/**
 * A component for displaying charts with proper alignment and sizing
 */
export function ChartContainer({ 
  children, 
  height = 200,
  alignRight = false
}: { 
  children: ReactNode, 
  height?: number,
  alignRight?: boolean
}) {
  return (
    <div 
      style={{ height: `${height}px` }}
      className={`relative ${alignRight ? 'flex justify-end' : 'flex justify-center'}`}
    >
      {children}
    </div>
  )
}

/**
 * A component for creating a two-column layout with a table and chart side by side
 */
export function TableWithChart({ 
  table, 
  chart,
  tableWidth = "70%",
  chartWidth = "30%"
}: { 
  table: ReactNode, 
  chart: ReactNode,
  tableWidth?: string,
  chartWidth?: string
}) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 items-center">
      <div style={{ width: tableWidth }} className="w-full md:w-auto">
        {table}
      </div>
      <div style={{ width: chartWidth }} className="w-full md:w-auto flex items-center justify-center">
        {chart}
      </div>
    </div>
  )
}