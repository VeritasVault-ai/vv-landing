"use client"

import { useTheme } from "@/lib/context/theme-context"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface EnhancedThemeToggleProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "minimal" | "icon"
  showLabel?: boolean
}

export function EnhancedThemeToggle({ className, variant = "outline", showLabel = false }: EnhancedThemeToggleProps) {
  const { theme, setTheme, version, isDark } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Determine the appropriate styling based on version
  const getVersionSpecificStyles = () => {
    if (version === "corporate") {
      return isDark
        ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700"
        : "bg-white text-slate-800 hover:bg-slate-100 border-slate-200"
    }

    // Standard version or default
    return isDark
      ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700"
      : "bg-white text-gray-800 hover:bg-gray-100 border-gray-200"
  }

  // Determine icon and label based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className={cn("h-[1.2rem] w-[1.2rem]", showLabel && "mr-2")} />
      case "light":
        return <Sun className={cn("h-[1.2rem] w-[1.2rem]", showLabel && "mr-2")} />
      case "system":
        return <Monitor className={cn("h-[1.2rem] w-[1.2rem]", showLabel && "mr-2")} />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "dark":
        return "Dark"
      case "light":
        return "Light"
      case "system":
        return "System"
    }
  }

  // Cycle through themes
  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  if (variant === "minimal" || variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant === "minimal" ? "ghost" : "outline"}
              size="icon"
              className={cn(
                "rounded-full w-9 h-9 p-0",
                variant === "minimal" ? "hover:bg-transparent" : getVersionSpecificStyles(),
                className,
              )}
              onClick={cycleTheme}
              aria-label={`Change theme, current theme is ${getThemeLabel().toLowerCase()}`}
            >
              {getThemeIcon()}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change theme ({getThemeLabel()})</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button
      variant={variant}
      size={showLabel ? "default" : "icon"}
      className={cn("transition-all duration-200", variant === "default" ? "" : getVersionSpecificStyles(), className)}
      onClick={cycleTheme}
      aria-label={`Change theme, current theme is ${getThemeLabel().toLowerCase()}`}
    >
      <div className="flex items-center">
        {getThemeIcon()}
        {showLabel && <span>{getThemeLabel()}</span>}
      </div>
    </Button>
  )
}
