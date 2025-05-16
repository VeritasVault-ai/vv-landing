import { ReactNode } from "react"

interface DashboardPanelProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * Renders a styled panel with a title, optional description, and content area for dashboard layouts.
 *
 * Use this component to provide a consistent container for charts, tables, or other dashboard elements, with customizable styling via the {@link className} prop.
 *
 * @param title - The panel's heading text.
 * @param description - Optional descriptive text displayed below the title.
 * @param children - The content to display within the panel.
 * @param className - Additional CSS classes for custom styling.
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
 * Wraps content in a horizontally scrollable container for displaying wide data tables.
 *
 * @param children - The table or content to display within the scrollable area.
 * @param className - Additional CSS classes for customizing the container.
 */
export function DataTable({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      {children}
    </div>
  )
}

/**
 * Renders a fixed-height container for charts with optional right or center alignment.
 *
 * @param height - The height of the container in pixels. Defaults to 200.
 * @param alignRight - If true, aligns the content to the right; otherwise, centers it. Defaults to false.
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
 * Renders a responsive two-column layout displaying a table and a chart side by side.
 *
 * On medium and larger screens, the table and chart are arranged horizontally with customizable width proportions. On smaller screens, the layout stacks vertically.
 *
 * @param table - The React node to display in the table section.
 * @param chart - The React node to display in the chart section.
 * @param tableWidth - Optional width for the table section (default: "70%").
 * @param chartWidth - Optional width for the chart section (default: "30%").
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