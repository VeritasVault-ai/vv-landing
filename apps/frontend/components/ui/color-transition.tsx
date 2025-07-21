"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ColorTransitionProps {
  baseColor: string
  hoverColor: string
  activeColor: string
  className?: string
  children: React.ReactNode
  duration?: number
}

export function ColorTransition({
  baseColor,
  hoverColor,
  activeColor,
  className,
  children,
  duration = 200,
}: ColorTransitionProps) {
  const [currentColor, setCurrentColor] = useState(baseColor)

  return (
    <div
      className={cn("transition-colors", className)}
      style={{
        backgroundColor: currentColor,
        transitionDuration: `${duration}ms`,
      }}
      onMouseEnter={() => setCurrentColor(hoverColor)}
      onMouseLeave={() => setCurrentColor(baseColor)}
      onMouseDown={() => setCurrentColor(activeColor)}
      onMouseUp={() => setCurrentColor(hoverColor)}
    >
      {children}
    </div>
  )
}
