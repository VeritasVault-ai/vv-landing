"use client"

import type React from "react"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function EnhancedDarkThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Add the enhanced dark theme class to the body when in dark mode
    const body = document.body

    if (theme === "dark") {
      body.classList.add("dark-theme-enhanced")
    } else {
      body.classList.remove("dark-theme-enhanced")
    }

    return () => {
      body.classList.remove("dark-theme-enhanced")
    }
  }, [theme])

  return <>{children}</>
}
