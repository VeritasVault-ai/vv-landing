"use client"

import { useEffect } from "react"

interface ThemeScriptProps {
  version?: "standard" | "corporate"
}

export function ThemeScript({ version = "standard" }: ThemeScriptProps) {
  useEffect(() => {
    // Get theme from localStorage or system preference
    const theme = localStorage.getItem("theme") || "system"
    const htmlElement = document.documentElement

    // Apply theme class
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    // Apply version class
    htmlElement.classList.remove("standard-theme", "corporate-theme")
    htmlElement.classList.add(`${version}-theme`)
  }, [version])

  return null
}
