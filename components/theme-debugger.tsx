"use client"

import { useTheme } from "@/lib/context/theme-context"
import { useEffect, useState } from "react"

export function ThemeDebugger() {
  const { theme, version, isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [systemPreference, setSystemPreference] = useState<string>("unknown")

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemPreference(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg text-xs z-50 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <span className="font-semibold">Theme:</span>
        <span>{theme}</span>

        <span className="font-semibold">Version:</span>
        <span>{version || "none"}</span>

        <span className="font-semibold">Is Dark:</span>
        <span>{isDark ? "Yes" : "No"}</span>

        <span className="font-semibold">System Preference:</span>
        <span>{systemPreference}</span>

        <span className="font-semibold">Document Classes:</span>
        <span>{document.documentElement.className}</span>
      </div>
    </div>
  )
}
