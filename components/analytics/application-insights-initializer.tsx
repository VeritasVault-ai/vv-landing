"use client"

import { useEffect } from "react"
import { initializeAnalytics } from "@/lib/analytics/provider"

/** Initializes browser telemetry once when the root layout mounts. */
export function ApplicationInsightsInitializer() {
  useEffect(() => {
    initializeAnalytics()
  }, [])

  return null
}
