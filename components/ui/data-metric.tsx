import type React from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface DataMetricProps {
  label: string
  value: string | number
  previousValue?: string | number
  change?: number
  changeLabel?: string
  tooltipText?: string
  className?: string
  valueClassName?: string
  labelClassName?: string
  changeClassName?: string
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  isLoading?: boolean
}

export function DataMetric({
  label,
  value,
  previousValue,
  change,
  changeLabel,
  tooltipText,
  className,
  valueClassName,
  labelClassName,
  changeClassName,
  icon,
  prefix = "",
  suffix = "",
  isLoading = false,
}: DataMetricProps) {
  // Determine change indicator and styling
  const renderChangeIndicator = () => {
    if (change === undefined) return null

    if (change > 0) {
      return (
        <div className={cn("flex items-center text-brand-success text-sm", changeClassName)}>
          <TrendingUp className="h-3 w-3 mr-1" />
          <span>+{change}%</span>
          {changeLabel && <span className="ml-1 text-xs text-muted-foreground">{changeLabel}</span>}
        </div>
      )
    } else if (change < 0) {
      return (
        <div className={cn("flex items-center text-brand-danger text-sm", changeClassName)}>
          <TrendingDown className="h-3 w-3 mr-1" />
          <span>{change}%</span>
          {changeLabel && <span className="ml-1 text-xs text-muted-foreground">{changeLabel}</span>}
        </div>
      )
    } else {
      return (
        <div className={cn("flex items-center text-muted-foreground text-sm", changeClassName)}>
          <Minus className="h-3 w-3 mr-1" />
          <span>0%</span>
          {changeLabel && <span className="ml-1 text-xs">{changeLabel}</span>}
        </div>
      )
    }
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center mb-1">
        <span className={cn("text-sm text-muted-foreground", labelClassName)}>{label}</span>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-baseline">
        {icon && <span className="mr-2">{icon}</span>}
        <span className={cn("text-2xl font-semibold", valueClassName)}>
          {isLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
          ) : (
            <>
              {prefix}
              {value}
              {suffix}
            </>
          )}
        </span>
      </div>
      {renderChangeIndicator()}
      {previousValue !== undefined && (
        <div className="text-xs text-muted-foreground mt-1">
          Previous: {prefix}
          {previousValue}
          {suffix}
        </div>
      )}
    </div>
  )
}
