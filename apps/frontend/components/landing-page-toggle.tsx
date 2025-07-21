"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface LandingPageToggleProps {
  initialMode: "standard" | "corporate"
  onChange: (mode: "standard" | "corporate") => void
}

export function LandingPageToggle({ initialMode, onChange }: LandingPageToggleProps) {
  const [mode, setMode] = useState<"standard" | "corporate">(initialMode)
  
  // Update the mode when the initialMode prop changes
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])
  
  const handleToggle = () => {
    const newMode = mode === "standard" ? "corporate" : "standard"
    setMode(newMode)
    onChange(newMode)
  }
  
  return (
    <div className="bg-muted py-2 px-4 flex justify-center items-center gap-4 text-sm">
      <div className="flex items-center space-x-2">
        <Switch
          id="mode-toggle"
          checked={mode === "corporate"}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor="mode-toggle" className="cursor-pointer">
          {mode === "standard" ? "Standard Experience" : "Corporate Experience"}
        </Label>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant={mode === "standard" ? "secondary" : "outline"} 
          size="sm"
          onClick={() => {
            setMode("standard")
            onChange("standard")
          }}
        >
          Standard
        </Button>
        <Button 
          variant={mode === "corporate" ? "secondary" : "outline"} 
          size="sm"
          onClick={() => {
            setMode("corporate")
            onChange("corporate")
          }}
        >
          Corporate
        </Button>
      </div>
    </div>
  )
}