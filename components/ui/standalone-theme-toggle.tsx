"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StandaloneThemeToggleProps {
  className?: string
}

export function StandaloneThemeToggle({ className }: StandaloneThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  // Initialize theme from localStorage and set up listeners
  useEffect(() => {
    setMounted(true)

    // Get initial theme from document class or localStorage
    const storedTheme = localStorage.getItem("theme") || "dark"
    const isDark =
      storedTheme === "dark" || (storedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setTheme(isDark ? "dark" : "light")

    // Apply the theme
    applyTheme(isDark ? "dark" : "light")

    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const currentTheme = localStorage.getItem("theme")
      if (currentTheme === "system" || !currentTheme) {
        setTheme(mediaQuery.matches ? "dark" : "light")
        applyTheme(mediaQuery.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Function to apply theme
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement

    if (newTheme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", newTheme)
  }

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn("rounded-full w-9 h-9 bg-opacity-20 border-gray-700", className)}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-200" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-300" />
      )}
    </Button>
  )
}
