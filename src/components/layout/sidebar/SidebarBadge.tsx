'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SidebarBadgeProps {
  content: string | number
  variant?: 'default' | 'new' | 'primary' | 'secondary'
  className?: string
}

/**
 * Badge component for displaying counts or status labels in the sidebar
 */
export function SidebarBadge({ 
  content, 
  variant = 'default',
  className 
}: SidebarBadgeProps) {
  const isNewBadge = typeof content === 'string' && content.toLowerCase() === 'new'
  
  // Use the 'new' variant if content is "new" and no variant is specified
  const effectiveVariant = isNewBadge && variant === 'default' ? 'new' : variant

  return (
    <span
      className={cn(
        "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
        effectiveVariant === 'default' && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
        effectiveVariant === 'new' && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        effectiveVariant === 'primary' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        effectiveVariant === 'secondary' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        className
      )}
    >
      {content}
    </span>
  )
}