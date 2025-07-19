"use client"

import { useCallback, useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase"

type EventParams = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function useAnalytics() {
  const [measurementId, setMeasurementId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMeasurementId = async () => {
      try {
        const supabase = createBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        const { data } = await supabase
          .from("user_settings")
          .select("google_analytics_id")
          .eq("user_id", session.user.id)
          .single()

        if (data?.google_analytics_id) {
          setMeasurementId(data.google_analytics_id)
        }
      } catch (error) {
        console.error("Error fetching Google Analytics ID:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeasurementId()
  }, [])

  const trackEvent = useCallback(
    (params: EventParams) => {
      if (!measurementId || !window.gtag) return

      const { action, category, label, value, ...rest } = params

      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
      })
    },
    [measurementId],
  )

  const trackPageView = useCallback(
    (url: string) => {
      if (!measurementId || !window.gtag) return

      window.gtag("config", measurementId, {
        page_path: url,
      })
    },
    [measurementId],
  )

  return {
    trackEvent,
    trackPageView,
    isAnalyticsReady: !isLoading && !!measurementId,
  }
}
