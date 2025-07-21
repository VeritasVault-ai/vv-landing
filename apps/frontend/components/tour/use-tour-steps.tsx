"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getTourStepsBySection, completeTourSteps, type TourStep } from "./tour-steps"

export function useTourSteps(): {
  currentSectionSteps: TourStep[]
  completeTourSteps: TourStep[]
  currentSection: string
} {
  const pathname = usePathname()
  const [currentSection, setCurrentSection] = useState("dashboard")
  const [currentSectionSteps, setCurrentSectionSteps] = useState<TourStep[]>(getTourStepsBySection("dashboard"))

  useEffect(() => {
    // Determine current section from pathname
    let section = "dashboard"

    if (pathname.includes("/risk-assessment")) {
      section = "risk"
    } else if (pathname.includes("/strategies")) {
      section = "strategies"
    } else if (pathname.includes("/pools")) {
      section = "pools"
    } else if (pathname.includes("/market")) {
      section = "market"
    } else if (pathname.includes("/flash-loans")) {
      section = "flash-loans"
    } else if (pathname.includes("/dashboard")) {
      section = "dashboard"
    }

    setCurrentSection(section)
    setCurrentSectionSteps(getTourStepsBySection(section))
  }, [pathname])

  return {
    currentSectionSteps,
    completeTourSteps,
    currentSection,
  }
}
