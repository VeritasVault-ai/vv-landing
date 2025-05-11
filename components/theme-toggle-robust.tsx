"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ThemeToggleRobustProps {
  className?: string
  variant?: "default" | "minimal" | "icon-only"
}

export function ThemeToggleRobust({ className, variant = "default" }: ThemeToggleRobustProps) {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)

  // Update the theme only on the client side
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setThemeState(savedTheme)
    } else {
      // Check if user has dark mode preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("system")
      } else {
        setThemeState("light")
      }
    }
  }, [])

  // Set the theme in localStorage and apply it to the document
  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)

    // Apply theme to document with transition
    const root = window.document.documentElement

    // Add transition class
    root.classList.add("transition")

    // Remove current theme classes
    root.classList.remove("light", "dark")

    // Determine and apply the new theme
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }

    // Remove transition class after transition completes
    setTimeout(() => {
      root.classList.remove("transition")
    }, 300)
  }

  // Render placeholder to avoid layout shift
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn("w-9 h-9 opacity-0", className)}>
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Minimal variant (just toggles between light/dark)
  if (variant === "minimal") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setTheme(
            theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "light"
              : "dark",
          )
        }
        className={cn("rounded-full", className)}
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    )
  }

  // Icon-only variant (dropdown but with just an icon button)
  if (variant === "icon-only") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={cn("rounded-full", className)}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Default variant (full dropdown)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-1 px-3", className)}>
          {theme === "light" && (
            <>
              <Sun className="h-[1rem] w-[1rem]" />
              <span>Light</span>
            </>
          )}
          {theme === "dark" && (
            <>
              <Moon className="h-[1rem] w-[1rem]" />
              <span>Dark</span>
            </>
          )}
          {theme === "system" && (
            <>
              <Monitor className="h-[1rem] w-[1rem]" />
              <span>System</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
