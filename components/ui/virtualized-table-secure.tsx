"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"
import { memoizeLRU } from "@/utils/memoize"
import { makeKeyboardAccessible, labeledBy } from "@/utils/accessibility"

interface VirtualizedTableProps<T> {
  data: T[]
  columns: {
    key: string
    header: React.ReactNode
    cell: (item: T) => React.ReactNode
    width?: string
    align?: "left" | "center" | "right"
    isSensitive?: boolean // Mark columns containing sensitive data
  }[]
  rowHeight?: number
  className?: string
  emptyState?: React.ReactNode
  onRowClick?: (item: T) => void
  isLoading?: boolean
  loadingRows?: number
  ariaLabel?: string
  ariaDescription?: string
}

/**
 * Returns a shallow copy of the given item with sensitive fields redacted.
 *
 * For each column marked as sensitive, the corresponding property in the item is replaced with the string "[REDACTED]". If the input item is null or undefined, it is returned as-is.
 *
 * @param item - The data item to sanitize.
 * @param columns - The column definitions, used to determine which fields are sensitive.
 * @returns A shallow copy of {@link item} with sensitive fields redacted, or the original value if null or undefined.
 */
import { cloneDeep, set } from "lodash-es"

function sanitizeData<T>(item: T, columns: VirtualizedTableProps<T>["columns"]): T {
  if (item == null) return item

  // Deep-clone to prevent nested leakage
  const sanitized: any = cloneDeep(item)

  // Redact sensitive columns
  columns.forEach(column => {
    if (column.isSensitive && column.key in sanitized) {
      set(sanitized, column.key, "[REDACTED]")
    }
  })

  return sanitized
}

/**
 * Renders a performant, accessible, and secure virtualized table for large datasets, with support for data sanitization and loading states.
 *
 * The table virtualizes rows for efficient rendering, automatically redacts sensitive data in columns marked as such, and provides ARIA roles and keyboard accessibility for enhanced usability. Supports customizable columns, loading placeholders, empty states, and responsive resizing.
 *
 * @template T - The type of data items, optionally including an `id` field for row identification.
 *
 * @param data - The array of data items to display in the table.
 * @param columns - Column definitions, including header, cell renderer, and optional sensitivity marking.
 * @param rowHeight - Height of each row in pixels. Defaults to 48.
 * @param className - Optional additional CSS classes for the table container.
 * @param emptyState - Optional custom content to display when there is no data.
 * @param onRowClick - Optional callback invoked when a row is clicked.
 * @param isLoading - If true, displays loading placeholder rows instead of data.
 * @param loadingRows - Number of loading placeholder rows to show when loading. Defaults to 10.
 * @param ariaLabel - Accessible label for the table region. Defaults to "Data table".
 * @param ariaDescription - Optional ARIA description for screen readers.
 *
 * @returns The rendered virtualized table component.
 *
 * @remark
 * Columns marked with `isSensitive` will have their corresponding data redacted as "[REDACTED]" before rendering.
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
  ariaLabel = "Data table",
  ariaDescription,
}: VirtualizedTableProps<T>) {
  const [tableWidth, setTableWidth] = useState(0)
  const parentRef = useRef<HTMLDivElement>(null)
  const tableId = useRef(`table-${Math.random().toString(36).substring(2, 11)}`).current
  
  // Memoize sanitization function for performance
  const sanitizeItem = useMemo(() => memoizeLRU(
    (item: T) => sanitizeData(item, columns),
    100 // Cache up to 100 items
  ), [columns]);
  
  // Determine items to render based on loading state
  const items = useMemo(() => {
    if (isLoading) {
      // Create placeholder items for loading state
      return Array.from({ length: loadingRows }, (_, index) => ({ id: `loading-${index}` } as T))
    }
    return data;
  }, [data, isLoading, loadingRows])

  // Update table width on resize
  useEffect(() => {
    if (!parentRef.current) return
    
    const updateWidth = () => {
      if (parentRef.current) {
        setTableWidth(parentRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    
    const observer = new ResizeObserver(updateWidth)
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
      <div 
        className="py-8 text-center" 
        role="region" 
        aria-label={ariaLabel}
        {...(ariaDescription ? { 'aria-describedby': `${tableId}-desc` } : {})}
      >
        {ariaDescription && (
          <div id={`${tableId}-desc`} className="sr-only">
            {ariaDescription}
          </div>
        )}
        {emptyState || <p className="text-slate-500">No data available</p>}
      </div>
    )
  }

  return (
    <div 
      ref={parentRef}
      className={cn("w-full overflow-auto border border-slate-200 dark:border-slate-800 rounded-md", className)}
      style={{ height: "100%", maxHeight: "500px" }}
      role="region"
      aria-label={ariaLabel}
      {...(ariaDescription ? { 'aria-describedby': `${tableId}-desc` } : {})}
    >
      {ariaDescription && (
        <div id={`${tableId}-desc`} className="sr-only">
          {ariaDescription}
        </div>
      )}
      
      <div className="w-full min-w-max">
        {/* Table header */}
        <div 
          className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
          role="rowgroup"
          aria-rowindex={1}
        >
          <div 
            className="flex w-full"
            role="row"
          >
            {columns.map((column, columnIndex) => (
              <div
                key={`header-${column.key}`}
                className={cn(
                  "py-3 px-4 font-medium text-slate-700 dark:text-slate-300",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right"
                )}
                style={{ width: columnWidths[columnIndex] }}
                role="columnheader"
                aria-colindex={columnIndex + 1}
                id={`${tableId}-col-${column.key}`}
              >
                {column.header}
              </div>
            ))}
          </div>
        </div>

        {/* Virtualized rows */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
          role="rowgroup"
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const item = items[virtualRow.index]
            const isLoadingRow = item.id?.toString().startsWith("loading-")
            
            // Sanitize item if it's not a loading placeholder
            const displayItem = isLoadingRow ? item : sanitizeItem(item)
            
            return (
              <div
                key={(item as any).id ?? virtualRow.index}
                data-index={virtualRow.index}
                className={cn(
                  "absolute top-0 left-0 w-full border-b border-slate-100 dark:border-slate-800",
                  onRowClick && !isLoadingRow && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  virtualRow.index % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/50"
                )}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => !isLoadingRow && onRowClick?.(item)}
                role="row"
                aria-rowindex={virtualRow.index + 2} // +2 because header is row 1
                {...(onRowClick && !isLoadingRow ? makeKeyboardAccessible(() => onRowClick(item)) : {})}
              >
                <div className="flex w-full h-full">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={`${virtualRow.index}-${column.key}`}
                      className={cn(
                        "py-3 px-4 flex items-center",
                        column.align === "center" && "justify-center text-center",
                        column.align === "right" && "justify-end text-right",
                        isLoadingRow && "animate-pulse"
                      )}
                      style={{ width: columnWidths[columnIndex] }}
                      role="cell"
                      aria-colindex={columnIndex + 1}
                      {...labeledBy(`${tableId}-col-${column.key}`)}
                    >
                      {isLoadingRow ? (
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                      ) : (
                        column.cell(displayItem)
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