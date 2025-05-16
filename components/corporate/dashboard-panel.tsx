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
 * Displays a styled dashboard panel with a title, optional description, and content area.
 *
 * Provides a consistent container for dashboard elements such as charts or tables, supporting additional custom styling.
 *
 * @param title - The heading text displayed at the top of the panel.
 * @param description - Optional text shown below the title for additional context.
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
 * Provides a horizontally scrollable container for wide data tables or similar content.
 *
 * Supports additional CSS classes for custom styling.
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
 * Displays chart content within a fixed-height container, aligned either right or center.
 *
 * @param height - Height of the container in pixels. Defaults to 200.
 * @param alignRight - If true, aligns content to the right; otherwise, centers it. Defaults to false.
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
 * Displays a table and a chart in a responsive two-column layout with customizable section widths.
 *
 * On medium and larger screens, the table and chart are shown side by side; on smaller screens, they stack vertically. Section widths can be adjusted via props.
 *
 * @param table - Content to render in the table section.
 * @param chart - Content to render in the chart section.
 * @param tableWidth - Width of the table section (default: "70%").
 * @param chartWidth - Width of the chart section (default: "30%").
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