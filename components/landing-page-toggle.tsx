"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, Building2 } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

interface LandingPageToggleProps {
  onChange: (mode: "standard" | "corporate") => void
  initialMode?: "standard" | "corporate"
}

export function LandingPageToggle({ onChange, initialMode = "standard" }: LandingPageToggleProps) {
  const [mode, setMode] = useState<"standard" | "corporate">(initialMode)

  useEffect(() => {
    // Check if there's a stored preference
    const storedMode = localStorage.getItem("landing-page-mode") as "standard" | "corporate" | null
    if (storedMode) {
      setMode(storedMode)
      onChange(storedMode)
    }
  }, [onChange])

  const handleModeChange = (newMode: "standard" | "corporate") => {
    setMode(newMode)
    localStorage.setItem("landing-page-mode", newMode)
    onChange(newMode)

    trackNavigationEvent({
      feature_name: "landing_page_toggle",
      tab_destination: newMode,
    })
  }

  return (
    <div className="w-full bg-slate-100 border-b border-slate-200 py-1">
      <div className="container mx-auto flex justify-end">
        <div className="flex items-center">
          <Button
            variant={mode === "standard" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full ${mode === "standard" ? "bg-primary text-white" : "text-slate-600"}`}
            onClick={() => handleModeChange("standard")}
          >
            <Users className="h-4 w-4 mr-1" />
            <span>Standard</span>
          </Button>
          <Button
            variant={mode === "corporate" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full ${mode === "corporate" ? "bg-blue-800 text-white" : "text-slate-600"}`}
            onClick={() => handleModeChange("corporate")}
          >
            <Building2 className="h-4 w-4 mr-1" />
            <span>Corporate</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
