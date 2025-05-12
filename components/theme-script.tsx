"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { setCookie, getCookie } from "@/lib/cookies"

interface ThemeScriptProps {
  version?: "standard" | "corporate"
}

export function ThemeScript({ version = "standard" }: ThemeScriptProps) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check for theme in URL parameters first
    const themeParam = searchParams?.get("theme")
    // Get theme from URL param, cookie, or system preference
    const theme = themeParam || getCookie("theme") || localStorage.getItem("theme") || "system"
    const htmlElement = document.documentElement

    // Save theme preference if it came from URL
    if (themeParam) {
      localStorage.setItem("theme", themeParam)
      setCookie("preferred-theme", themeParam, 30)
    }

    // Apply theme class
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    // Apply experience-specific theme classes
    const allThemeClasses = ["light", "dark", "neuralliquid", "corporate", "veritasvault", "cosmic"]
      .map(t => `theme-${t}`)
    
    // Remove all theme classes
    htmlElement.classList.remove(...allThemeClasses)
    
    // Add the current theme class
    htmlElement.classList.add(`theme-${theme}`)

    // Apply version class
    htmlElement.classList.remove("standard-theme", "corporate-theme")
    htmlElement.classList.add(`${version}-theme`)
  }, [version, searchParams])

  return null
}
