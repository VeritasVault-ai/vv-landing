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
 * Renders a visual indicator to show when data is simulated, with optional label and tooltip.
 *
 * Displays an icon and, optionally, the "Simulated Data" label. When clicked or hovered, a tooltip explains that the data is for demonstration purposes. The appearance can be compact or standard, and the indicator is only rendered if {@link isSimulated} is true.
 *
 * @param isSimulated - If false, the indicator is not rendered.
 * @param showLabel - If true, always displays the "Simulated Data" label; otherwise, the label is shown unless in compact mode.
 * @param compact - If true, renders a smaller, label-less indicator unless {@link showLabel} is also true.
 * @param className - Additional CSS classes for the indicator container.
 *
 * @returns The simulation indicator element, or null if not simulated.
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