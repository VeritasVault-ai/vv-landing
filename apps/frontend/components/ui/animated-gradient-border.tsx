import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  gradientClassName?: string
  borderWidth?: number
  animationDuration?: number
  borderRadius?: string
}

export function AnimatedGradientBorder({
  children,
  className,
  gradientClassName,
  borderWidth = 1,
  animationDuration = 4,
  borderRadius = "0.5rem",
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative p-[1px] overflow-hidden group", className)} style={{ borderRadius }}>
      {/* Animated gradient border */}
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300",
          gradientClassName || "bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600",
        )}
        style={{
          animation: `gradient-rotate ${animationDuration}s linear infinite`,
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #6366f1, #3b82f6)",
          backgroundSize: "1000% 1000%",
        }}
      />

      {/* Inner content with background */}
      <div className="relative z-10 h-full w-full rounded-[inherit] bg-[#111a35]">{children}</div>
    </div>
  )
}
