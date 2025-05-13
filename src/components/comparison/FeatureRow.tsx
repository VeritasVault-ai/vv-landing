"use client"

import { HelpCircle, Check, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface FeatureRowProps {
  feature: string
  standardIncluded: boolean | string
  corporateIncluded: boolean | string
  tooltip: string
}

export function FeatureRow({
  feature,
  standardIncluded,
  corporateIncluded,
  tooltip,
}: FeatureRowProps) {
  return (
    <tr className="border-b border-border/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
      <td className="p-4 text-left">
        <div className="flex items-center">
          <span>{feature}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
      <td className="p-4 text-center">
        {typeof standardIncluded === "boolean" ? (
          standardIncluded ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-500 mx-auto" />
          )
        ) : (
          <span className="text-sm">{standardIncluded}</span>
        )}
      </td>
      <td className="p-4 text-center">
        {typeof corporateIncluded === "boolean" ? (
          corporateIncluded ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-500 mx-auto" />
          )
        ) : (
          <span className="text-sm">{corporateIncluded}</span>
        )}
      </td>
    </tr>
  )
}