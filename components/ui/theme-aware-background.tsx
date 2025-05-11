"use client"

import { useTheme } from "next-themes"
import { type ReactNode, useEffect, useState } from "react"

interface ThemeAwareBackgroundProps {
  children: ReactNode
  lightClassName?: string
  darkClassName?: string
  className?: string
}

export function ThemeAwareBackground({
  children,
  lightClassName = "bg-white",
  darkClassName = "bg-slate-950",
  className = "",
}: ThemeAwareBackgroundProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which class to use based on the theme
  const getBackgroundClass = () => {
    const currentTheme = resolvedTheme || theme

    if (currentTheme === "dark") {
      return darkClassName
    }

    return lightClassName
  }

  // If not mounted yet, use a neutral background
  if (!mounted) {
    return <div className={`transition-colors duration-300 ${className}`}>{children}</div>
  }

  return <div className={`transition-colors duration-300 ${getBackgroundClass()} ${className}`}>{children}</div>
}
