"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

interface FeatureUsageTrackerProps {
  featureName: string
  category: string
  metadata?: Record<string, any>
}

export function FeatureUsageTracker({ featureName, category, metadata = {} }: FeatureUsageTrackerProps) {
  const { trackEvent, isAnalyticsReady } = useAnalytics()

  useEffect(() => {
    if (isAnalyticsReady) {
      trackEvent({
        action: "feature_view",
        category,
        label: featureName,
        ...metadata,
      })
    }
  }, [isAnalyticsReady, trackEvent, featureName, category, metadata])

  return null
}
