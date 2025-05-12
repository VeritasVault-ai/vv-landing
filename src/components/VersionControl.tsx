"use client"

import { Button } from "@/components/ui/button"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { cn } from "@/lib/utils"
import { Building2, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ExperienceType } from "../types"

interface VersionControlProps {
  currentVersion?: ExperienceType
  mode?: "selector" | "switcher" | "enhanced"
  className?: string
  onVersionSelect?: (version: ExperienceType) => void
  disableNavigation?: boolean
}

export function VersionControl({ 
  currentVersion, 
  mode = "selector", 
  className,
  onVersionSelect,
  disableNavigation = false
}: VersionControlProps) {
  const router = useRouter()
  const [activeVersion, setActiveVersion] = useState<ExperienceType>(currentVersion || "standard")
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // If no currentVersion is provided, try to get from localStorage
    if (!currentVersion) {
      const storedVersion = localStorage.getItem("site-version") as ExperienceType | null
      if (storedVersion === "standard" || storedVersion === "corporate") {
        setActiveVersion(storedVersion)
      }
    }
  }, [currentVersion])

  const handleVersionChange = (version: ExperienceType) => {
    setActiveVersion(version)
    
    // Call the onVersionSelect callback if provided
    if (onVersionSelect) {
      onVersionSelect(version)
    }
    
    if (!disableNavigation) {
      // Store the preference in localStorage and cookies
      localStorage.setItem("site-version", version)
      document.cookie = `site-version=${version}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

      // Track the version selection/switch
      trackNavigationEvent({
        feature_name: mode === "switcher" ? "version_switch" : "version_selection",
        tab_destination: version,
      })

      // Navigate to the selected version
      router.push(`/${version}`)
    }
  }

  if (!mounted && mode === "enhanced") return null

  // Switcher mode - simple toggle between versions
  if (mode === "switcher" && currentVersion) {
    const newVersion = currentVersion === "standard" ? "corporate" : "standard"
    
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn("flex items-center gap-1", className)} 
        onClick={() => handleVersionChange(newVersion)}
      >
        {currentVersion === "standard" ? (
          <>
            <Building2 className="h-4 w-4" />
            <span className="text-xs">Switch to Corporate</span>
          </>
        ) : (
          <>
            <User className="h-4 w-4" />
            <span className="text-xs">Switch to Standard</span>
          </>
        )}
      </Button>
    )
  }

  if (mode === "enhanced") {
    return (
      <div className={cn("bg-white/70 dark:bg-slate-800/70 backdrop-blur-md py-2 px-4 rounded-full border border-slate-200 dark:border-slate-700/30 shadow-lg", className)}>
        <div className="flex items-center">
          <div className="bg-slate-100 dark:bg-slate-900/80 rounded-full p-1 flex shadow-inner">
            <button
              onClick={() => handleVersionChange("standard")}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeVersion === "standard"
                  ? "bg-blue-600 text-white shadow-inner"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
              )}
            >
              <User size={18} className="mr-2" />
              Standard
            </button>
            <button
              onClick={() => handleVersionChange("corporate")}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeVersion === "corporate"
                  ? "bg-blue-600 text-white shadow-inner"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
              )}
            >
              <Building2 size={18} className="mr-2" />
              Corporate
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default selector mode
  return (
    <div className={cn("flex gap-4", className)}>
      <Button 
        variant="outline" 
        size="lg" 
        className="flex items-center gap-2" 
        onClick={() => handleVersionChange("standard")}
      >
        <User className="h-5 w-5" />
        <span>Standard Version</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2 bg-blue-800 text-white hover:bg-blue-900"
        onClick={() => handleVersionChange("corporate")}
      >
        <Building2 className="h-5 w-5" />
        <span>Corporate Version</span>
      </Button>
    </div>
  )
}