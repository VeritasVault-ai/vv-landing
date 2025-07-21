"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LogoIconOnly } from "./logo-icon-only"

interface LogoWithTextProps {
  size?: number
  variant?: "light" | "dark" | "auto"
  className?: string
}

export function LogoWithText({ size = 40, variant = "auto", className = "" }: LogoWithTextProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which text color to use
  const getTextColor = () => {
    if (!mounted) return "text-gray-900" // Default during SSR

    if (variant === "light") return "text-gray-900"
    if (variant === "dark") return "text-white"

    // Auto mode - use the current theme
    return theme === "dark" || resolvedTheme === "dark" ? "text-white" : "text-gray-900"
  }

  const textColor = getTextColor()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIconOnly width={size} height={size} variant={variant} />
      <div className={`font-bold text-xl ${textColor} transition-colors duration-200`}>
        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Neural</span>
        <span>Liquid</span>
      </div>
    </div>
  )
}
