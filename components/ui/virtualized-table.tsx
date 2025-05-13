"use client"

import { cn } from "@/lib/utils"
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual"
import React, { useEffect, useMemo, useRef } from "react"
import styles from "./virtualized-table.module.css"

interface VirtualizedTableProps<T> {
  data: T[]
  columns: {
    key: string
    header: React.ReactNode
    cell: (item: T) => React.ReactNode
    width?: string
    align?: "left" | "center" | "right"
  }[]
  rowHeight?: number
  className?: string
  emptyState?: React.ReactNode
  onRowClick?: (item: T) => void
  isLoading?: boolean
  loadingRows?: number
}

/**
 * A virtualized table component for efficiently rendering large datasets
 */
export function VirtualizedTable<T extends { id?: string | number }>({
  data,
  columns,
  rowHeight = 48,
  className,
  emptyState,
  onRowClick,
  isLoading = false,
  loadingRows = 10,
}: VirtualizedTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  // Determine items to render based on loading state
  const items = useMemo(() => {
    if (isLoading) {
      // Create placeholder items for loading state with validation for loadingRows
      const safeLoadingRows = Math.max(1, loadingRows);
      return Array.from({ length: safeLoadingRows }, (_, index) => ({ id: `loading-${index}` } as T))
    }
    return data
  }, [data, isLoading, loadingRows])

  // Set up resize observer for responsiveness
  useEffect(() => {
    if (!parentRef.current) return
    
    const observer = new ResizeObserver(() => {
      // Just for responsiveness, no state updates needed
    })
    
    observer.observe(parentRef.current)
    
    return () => {
      if (parentRef.current) {
        observer.unobserve(parentRef.current)
      }
    }
  }, [])

  // Set up virtualizer
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  })

  // Calculate column widths
  const columnWidths = useMemo(() => {
    return columns.map(col => col.width || `${100 / columns.length}%`)
  }, [columns])

  if (items.length === 0 && !isLoading) {
    return (
      <div className={styles.emptyState}>
        {emptyState || <p className={styles.emptyText}>No data available</p>}
      </div>
    )
  }

  return (
    <div 
      ref={parentRef}
      className={cn(styles.tableContainer, className)}
      role="region"
      aria-label="Data table"
      tabIndex={0}
    >
      <div className={styles.tableWrapper} role="table">
        {/* Table header */}
        <div className={styles.tableHeader} role="rowgroup">
          <div className={styles.headerRow} role="row">
            {columns.map((column, columnIndex) => (
              <div
                key={`header-${column.key}`}
                className={cn(
                  styles.headerCell,
                  column.align === "center" && styles.alignCenter,
                  column.align === "right" && styles.alignRight,
                )}
                // NOTE: This inline style is necessary for dynamic column widths
                style={{ width: columnWidths[columnIndex] }}
                role="columnheader"
                aria-sort="none"
              >
                {column.header}
              </div>
            ))}
          </div>
        </div>

        {/* Virtualized rows */}
        <div
          className={styles.rowsContainer}
          // NOTE: This inline style is necessary for virtualization to work correctly
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          role="rowgroup"
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
            const item = items[virtualRow.index]
            const isLoading = item.id?.toString().startsWith("loading-")
            const rowIndex = virtualRow.index + 1;
            
            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                className={cn(
                  styles.tableRow,
                  onRowClick && !isLoading && styles.clickable,
                  virtualRow.index % 2 === 0 ? styles.even : styles.odd
                )}
                // NOTE: These inline styles are necessary for virtualization positioning
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => !isLoading && onRowClick?.(item)}
                role="row"
                aria-rowindex={rowIndex}
                tabIndex={onRowClick && !isLoading ? 0 : -1}
                onKeyDown={(e) => {
                  if (!isLoading && onRowClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onRowClick(item);
                  }
                }}
              >
                <div className={styles.rowContent}>
                  {columns.map((column, columnIndex) => (
                    <div
                      key={`${virtualRow.index}-${column.key}`}
                      className={cn(
                        styles.cell,
                        column.align === "center" && styles.alignCenter,
                        column.align === "right" && styles.alignRight,
                        isLoading && styles.loading
                      )}
                      // NOTE: This inline style is necessary for dynamic column widths
                      style={{ width: columnWidths[columnIndex] }}
                      role="cell"
                    >
                      {isLoading ? (
                        <div className={styles.loadingPlaceholder}></div>
                      ) : (
                        column.cell(item)
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}