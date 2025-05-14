'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SidebarNavBadgeProps {
  content: string | number
  variant?: 'default' | 'new' | 'primary' | 'secondary'
  className?: string
}

/**
 * Renders a styled badge element for sidebar navigation, displaying the provided content with variant-based styling.
 *
 * If the content is the string "new" (case-insensitive) and the variant is not explicitly set, the badge uses the "new" variant style.
 *
 * @param content - The text or number to display inside the badge.
 * @param variant - Optional style variant for the badge; defaults to "default".
 * @param className - Optional additional CSS classes to apply.
 *
 * @returns A React element representing the styled badge.
 */
export function SidebarNavBadge({ 
  content, 
  variant = 'default',
  className 
}: SidebarNavBadgeProps) {
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