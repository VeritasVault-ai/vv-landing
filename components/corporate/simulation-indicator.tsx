"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ActivitySquare } from "lucide-react"
import { useState } from "react"

interface SimulationIndicatorProps {
  isSimulated?: boolean
  className?: string
  showLabel?: boolean
  compact?: boolean // Add the compact prop
}

/**
 * Component that displays an indicator when data is being simulated
 * Can be configured to show a label and provides a tooltip with more information
 * 
 * @param isSimulated - Whether the data is simulated
 * @param className - Additional CSS classes
 * @param showLabel - Whether to show the "Simulated Data" label
 * @param compact - Whether to show a more compact version of the indicator
 */
export function SimulationIndicator({ 
  isSimulated = true, 
  className,
  showLabel = false,
  compact = false
}: SimulationIndicatorProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  
  if (!isSimulated) return null
  
  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 cursor-help",
              compact ? "p-1" : "px-2 py-1",
              className
            )}
            onClick={() => setIsTooltipOpen(true)}
          >
            <ActivitySquare className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
            {(showLabel || !compact) && <span>Simulated Data</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p>This data is being simulated for demonstration purposes. In a production environment, this would be real-time data from the API.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}