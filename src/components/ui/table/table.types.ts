import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

export type TableVariant = "default" | "compact"
export type TableSize = "small" | "medium" | "large"
export type CellAlignment = "left" | "center" | "right"
export type SortDirection = "ascending" | "descending" | undefined

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * The variant of the table
   * @default 'default'
   */
  variant?: TableVariant
  /**
   * The size of the table
   * @default 'medium'
   */
  size?: TableSize
  /**
   * Whether the table rows should have alternating background colors
   * @default false
   */
  striped?: boolean
  /**
   * Whether the table rows should change background color on hover
   * @default true
   */
  hoverable?: boolean
  /**
   * Whether the table cells should have borders
   * @default false
   */
  bordered?: boolean
  /**
   * Whether the table header should stick to the top when scrolling
   * @default false
   */
  stickyHeader?: boolean
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether the row is selected
   * @default false
   */
  selected?: boolean
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * The alignment of the cell content
   * @default 'left'
   */
  align?: CellAlignment
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * The alignment of the cell content
   * @default 'left'
   */
  align?: CellAlignment
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean
  /**
   * The current sort direction of the column
   */
  sortDirection?: SortDirection
  /**
   * Callback function when the sort button is clicked
   */
  onSort?: () => void
}