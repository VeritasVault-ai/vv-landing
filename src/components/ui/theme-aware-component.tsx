// src/components/ui/theme-aware-component.tsx
"use client"

import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"
import { ReactNode } from "react"

interface ThemeAwareComponentProps {
  children: ReactNode
  lightClassName?: string
  darkClassName?: string
  // Preserve any other props from the original component
}

export function ThemeAwareComponent({
  children,
  lightClassName = "bg-white text-slate-900",
  darkClassName = "bg-slate-900 text-white",
  // Include other props here
}: ThemeAwareComponentProps) {
  // Use isDark from the unified hook
  const { isDark } = useUnifiedTheme()
  
  // Preserve the original component's rendering logic
  return (
    <div className={isDark ? darkClassName : lightClassName}>
      {children}
    </div>
  )
}