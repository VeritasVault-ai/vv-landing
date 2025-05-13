"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AIConfidenceIndicatorProps {
  level: number // 0 to 1
  showLabel?: boolean
  showTooltip?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
  labelClassName?: string
}

/**
 * Displays a visual indicator of AI-generated output confidence as a color-coded progress bar and optional label.
 *
 * Shows the AI's confidence level as a percentage, with color and tooltip descriptions reflecting the confidence range. Supports customizable size, label visibility, tooltip, and additional styling.
 *
 * @param level - Confidence value between 0 and 1.
 * @param showLabel - Whether to display the confidence percentage label. Defaults to true.
 * @param showTooltip - Whether to show a tooltip with descriptive confidence text. Defaults to true.
 * @param size - Size of the progress bar ("sm", "md", or "lg"). Defaults to "md".
 * @param className - Additional CSS classes for the container.
 * @param labelClassName - Additional CSS classes for the label.
 *
 * @returns A React element displaying the AI confidence indicator.
 *
 * @remark The confidence level is clamped to the range [0, 1]. Color and tooltip content vary by confidence threshold.
 */
export function AIConfidenceIndicator({
  level,
  showLabel = true,
  showTooltip = true,
  size = "md",
  className,
  labelClassName
}: AIConfidenceIndicatorProps) {
  // Ensure level is between 0 and 1
  const normalizedLevel = Math.max(0, Math.min(1, level))
  const percentage = Math.round(normalizedLevel * 100)
  
  // Determine color based on confidence level
  const getColorClass = () => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400"
    if (percentage >= 60) return "text-blue-600 dark:text-blue-400"
    if (percentage >= 40) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }
  
  // Determine progress bar color
  const getProgressColor = () => {
    if (percentage >= 80) return "bg-green-600 dark:bg-green-500"
    if (percentage >= 60) return "bg-blue-600 dark:bg-blue-500"
    if (percentage >= 40) return "bg-yellow-600 dark:bg-yellow-500"
    return "bg-red-600 dark:bg-red-500"
  }
  
  // Size classes for the progress bar
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }
  
  // Generate tooltip content based on confidence level
  const getTooltipContent = () => {
    if (percentage >= 80) return "High confidence: The AI is very confident in this output"
    if (percentage >= 60) return "Medium confidence: The AI is reasonably confident in this output"
    if (percentage >= 40) return "Low confidence: The AI has limited confidence in this output"
    return "Very low confidence: The AI is uncertain about this output"
  }
  
  const confidenceIndicator = (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs">
          <span>AI Confidence</span>
          <span className={cn("font-medium", getColorClass(), labelClassName)}>
            {percentage}%
          </span>
        </div>
      )}
      <Progress 
        value={percentage} 
        className={cn(sizeClasses[size])}
        indicatorClassName={getProgressColor()}
        aria-label={`AI confidence level: ${percentage}%`}
      />
    </div>
  )
  
  if (!showTooltip) {
    return confidenceIndicator
  }
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {confidenceIndicator}
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}