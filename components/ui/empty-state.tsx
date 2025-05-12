import React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

/**
 * Displays a styled empty state with an optional icon, title, description, and custom content.
 *
 * Use this component to indicate the absence of data or content in a section of the UI.
 *
 * @param title - The main heading text to display.
 * @param description - Optional descriptive text shown below the title.
 * @param icon - Optional icon or graphic displayed above the title.
 * @param className - Optional additional CSS classes for the container.
 * @param children - Optional custom React elements rendered below the description.
 */
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