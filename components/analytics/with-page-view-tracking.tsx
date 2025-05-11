"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView } from "@/lib/analytics/track-ga-event"

interface WithPageViewTrackingProps {
  children: React.ReactNode
}

export function WithPageViewTracking({ children }: WithPageViewTrackingProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
