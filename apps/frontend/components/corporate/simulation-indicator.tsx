"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ActivitySquare } from "lucide-react"
import { useState } from "react"
import styles from "./simulation-indicator.module.css"

interface SimulationIndicatorProps {
  isSimulated?: boolean
  className?: string
  showLabel?: boolean
  compact?: boolean
}

/**
 * Displays an indicator with an icon and optional label to signify that data is simulated.
 *
 * Renders an icon and, depending on props, the "Simulated Data" label. A tooltip provides additional context about the simulated nature of the data. The indicator is only shown if {@link isSimulated} is true, and its appearance can be compact or standard.
 *
 * @param isSimulated - Controls whether the indicator is rendered.
 * @param showLabel - If true, always shows the label; otherwise, the label is hidden in compact mode.
 * @param compact - If true, renders a smaller indicator and hides the label unless {@link showLabel} is true.
 * @param className - Additional CSS classes for the container.
 *
 * @returns The simulation indicator element, or null if {@link isSimulated} is false.
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
              styles.container,
              compact ? styles.compact : styles.standard,
              className
            )}
            onClick={() => setIsTooltipOpen(true)}
          >
            <ActivitySquare className={compact ? styles.iconCompact : styles.iconStandard} />
            {(showLabel || !compact) && <span>Simulated Data</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className={styles.tooltipContent}>
          <p>This data is being simulated for demonstration purposes. In a production environment, this would be real-time data from the API.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}