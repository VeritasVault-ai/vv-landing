import React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  className,
  children
}: EmptyStateProps) {
  return (
    <div className={cn(
      "bg-slate-50 dark:bg-slate-800 p-8 rounded-lg text-center",
      className
    )}>
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      )}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}