import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  change?: number
  icon?: React.ReactNode
  className?: string
  tooltipText?: string
}

export function StatCard({ title, value, description, change, icon, className, tooltipText }: StatCardProps) {
  // Determine change indicator
  const renderChangeIndicator = () => {
    if (change === undefined) return null

    if (change > 0) {
      return (
        <div className="flex items-center text-brand-success">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{change}%</span>
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center text-brand-danger">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{change}%</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="h-4 w-4 mr-1" />
          <span>0%</span>
        </div>
      )
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                    {title}
                    {tooltipText && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 h-3 w-3 text-muted-foreground/70"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    )}
                  </h3>
                </TooltipTrigger>
                {tooltipText && <TooltipContent>{tooltipText}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              {change !== undefined && <span className="ml-2">{renderChangeIndicator()}</span>}
            </div>
            {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          </div>
          {icon && <div className="rounded-full p-2 bg-muted/30">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
