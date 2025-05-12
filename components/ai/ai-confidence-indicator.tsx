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
 * A component that displays the confidence level of an AI-generated output
 * for transparency and helping users make informed decisions
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