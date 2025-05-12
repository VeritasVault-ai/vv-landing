"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { useTour } from "./tour-context"
import { useTourSteps } from "./use-tour-steps"
import { cn } from "@/lib/utils"

interface TourButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showCompleteTour?: boolean
}

export function TourButton({ variant = "outline", size = "sm", className, showCompleteTour = false }: TourButtonProps) {
  const { openTour, setTourSteps } = useTour()
  const { currentSectionSteps, completeTourSteps } = useTourSteps()

  const handleClick = () => {
    // Set the appropriate tour steps
    setTourSteps(showCompleteTour ? completeTourSteps : currentSectionSteps)
    openTour()
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={cn("flex items-center gap-1", className)}>
      <HelpCircle className="h-4 w-4" />
      {showCompleteTour ? "Complete Tour" : "Section Guide"}
    </Button>
  )
}
