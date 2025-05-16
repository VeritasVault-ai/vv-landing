import { ReactNode } from "react"
import styles from "./dashboard-panel.module.css"

interface DashboardPanelProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

interface DataTableProps {
  children: ReactNode
  className?: string
}

interface ChartContainerProps {
  children: ReactNode
  height?: number
  alignRight?: boolean
}

interface TableWithChartProps {
  table: ReactNode
  chart: ReactNode
  tableWidth?: string
  chartWidth?: string
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
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>{title}</h2>
        {description && <p className={styles.panelDescription}>{description}</p>}
      </div>
      <div className={styles.panelContent}>
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
export function DataTable({ 
  children, 
  className = "" 
}: DataTableProps) {
  return (
    <div className={`${styles.dataTable} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Renders a fixed-height container for charts with optional right or center alignment.
 *
 * @param children - The React node to display in the chart container.
 * @param height - The height of the container in pixels. Defaults to 200.
 * @param alignRight - If true, aligns the content to the right; otherwise, centers it. Defaults to false.
 */
export function ChartContainer({ 
  children, 
  height = 200,
  alignRight = false
}: ChartContainerProps) {
  return (
    <div 
      style={{ height: `${height}px` }}
      className={`${styles.chartContainer} ${alignRight ? styles.chartContainerRight : styles.chartContainerCenter}`}
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
}: TableWithChartProps) {
  return (
    <div className={styles.tableWithChart}>
      <div className={styles.tableSection} style={{ width: tableWidth }}>
        {table}
      </div>
      <div className={styles.chartSection} style={{ width: chartWidth }}>
        {chart}
      </div>
    </div>
  )
}