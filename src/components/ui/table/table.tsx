"use client"

import { forwardRef } from "react"
import styles from "./table.module.css"
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
} from "./table.types"
import { cn } from "@/lib/utils"

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "medium",
      striped = false,
      hoverable = true,
      bordered = false,
      stickyHeader = false,
      ...rest
    },
    ref,
  ) => {
    const tableClasses = cn(
      styles.table,
      styles[`table--${variant}`],
      styles[`table--${size}`],
      striped && styles["table--striped"],
      hoverable && styles["table--hoverable"],
      bordered && styles["table--bordered"],
      stickyHeader && styles["table--sticky-header"],
      className,
    )
    return (
      <div className={styles.tableContainer}>
        <table className={tableClasses} ref={ref} {...rest}>
          {children}
        </table>
      </div>
    )
  },
)

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <thead className={cn(styles.tableHeader, className)} ref={ref} {...rest}>
        {children}
      </thead>
    )
  },
)

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <tbody className={cn(styles.tableBody, className)} ref={ref} {...rest}>
        {children}
      </tbody>
    )
  },
)

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, selected, ...rest }, ref) => {
    return (
      <tr className={cn(styles.tableRow, selected && styles["tableRow--selected"], className)} ref={ref} {...rest}>
        {children}
      </tr>
    )
  },
)

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, align = "left", ...rest }, ref) => {
    return (
      <td className={cn(styles.tableCell, styles[`tableCell--${align}`], className)} ref={ref} {...rest}>
        {children}
      </td>
    )
  },
)

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ children, className, align = "left", sortable = false, sortDirection, onSort, ...rest }, ref) => {
    const handleSort = () => {
      if (sortable && onSort) {
        onSort()
      }
    }
    return (
      <th
        className={cn(
          styles.tableHeaderCell,
          styles[`tableHeaderCell--${align}`],
          sortable && styles["tableHeaderCell--sortable"],
          className,
        )}
        ref={ref}
        onClick={handleSort}
        aria-sort={sortDirection}
        {...rest}
      >
        <div className={styles.tableHeaderCellContent}>
          {children}
          {sortable && (
            <span className={styles.sortIcon}>
              {sortDirection === "ascending" && "▲"}
              {sortDirection === "descending" && "▼"}
              {!sortDirection && "⇅"}
            </span>
          )}
        </div>
      </th>
    )
  },
)

Table.displayName = "Table"
TableHeader.displayName = "TableHeader"
TableBody.displayName = "TableBody"
TableRow.displayName = "TableRow"
TableCell.displayName = "TableCell"
TableHeaderCell.displayName = "TableHeaderCell"