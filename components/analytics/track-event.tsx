"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

interface TrackEventProps {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function TrackEvent({ action, category, label, value, ...rest }: TrackEventProps) {
  const { trackEvent, isAnalyticsReady } = useAnalytics()

  useEffect(() => {
    if (isAnalyticsReady) {
      trackEvent({ action, category, label, value, ...rest })
    }
  }, [isAnalyticsReady, trackEvent, action, category, label, value])

  return null
}
