import type React from "react"
import { cn } from "@/lib/utils"

interface AccessibleColorInfoProps {
  color: string
  label: string
  icon?: React.ReactNode
  className?: string
}

export function AccessibleColorInfo({ color, label, icon, className }: AccessibleColorInfoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {/* Color indicator */}
      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} aria-hidden="true"></div>

      {/* Icon for additional visual cue */}
      {icon && (
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Text label */}
      <span>{label}</span>
    </div>
  )
}
