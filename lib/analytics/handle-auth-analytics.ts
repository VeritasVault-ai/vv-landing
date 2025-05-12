"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"
import { getCookie, deleteCookie } from "cookies-next"

export function useAuthAnalytics() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Check for auth analytics cookie
    const authAnalyticsCookie = getCookie("auth_analytics")

    if (authAnalyticsCookie) {
      try {
        const analyticsData = JSON.parse(decodeURIComponent(authAnalyticsCookie))

        if (analyticsData.event === "social_login_success") {
          // Track the successful social login
          trackEvent({
            action: "social_login_success",
            category: "authentication",
            label: analyticsData.provider || "unknown",
            custom_data: {
              user_id_hash: analyticsData.user_id_hash,
              timestamp: analyticsData.timestamp,
            },
          })
        }

        // Delete the cookie after processing
        deleteCookie("auth_analytics")
      } catch (error) {
        console.error("Error processing auth analytics cookie:", error)
      }
    }
  }, [trackEvent])

  return null
}
