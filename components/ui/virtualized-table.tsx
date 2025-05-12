"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"

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
  const [tableWidth, setTableWidth] = useState(0)
  const parentRef = useRef<HTMLDivElement>(null)
  
  // Determine items to render based on loading state
  const items = useMemo(() => {
    if (isLoading) {
      // Create placeholder items for loading state
      return Array.from({ length: loadingRows }, (_, index) => ({ id: `loading-${index}` } as T))
    }
    return data
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
      <div className="py-8 text-center">
        {emptyState || <p className="text-slate-500">No data available</p>}
      </div>
    )
  }

  return (
    <div 
      ref={parentRef}
      className={cn("w-full overflow-auto border border-slate-200 dark:border-slate-800 rounded-md", className)}
      style={{ height: "100%", maxHeight: "500px" }}
    >
      <div className="w-full min-w-max">
        {/* Table header */}
        <div className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex w-full">
            {columns.map((column, columnIndex) => (
              <div
                key={`header-${column.key}`}
                className={cn(
                  "py-3 px-4 font-medium text-slate-700 dark:text-slate-300",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right"
                )}
                style={{ width: columnWidths[columnIndex] }}
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
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const item = items[virtualRow.index]
            const isLoading = item.id?.toString().startsWith("loading-")
            
            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                className={cn(
                  "absolute top-0 left-0 w-full border-b border-slate-100 dark:border-slate-800",
                  onRowClick && !isLoading && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  virtualRow.index % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/50"
                )}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => !isLoading && onRowClick?.(item)}
              >
                <div className="flex w-full h-full">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={`${virtualRow.index}-${column.key}`}
                      className={cn(
                        "py-3 px-4 flex items-center",
                        column.align === "center" && "justify-center text-center",
                        column.align === "right" && "justify-end text-right",
                        isLoading && "animate-pulse"
                      )}
                      style={{ width: columnWidths[columnIndex] }}
                    >
                      {isLoading ? (
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
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