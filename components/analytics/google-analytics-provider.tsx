"use client"

import type React from "react"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

interface GoogleAnalyticsProviderProps {
  googleAnalyticsId?: string
  children: React.ReactNode
}

export function GoogleAnalyticsProvider({
  googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  children,
}: GoogleAnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!googleAnalyticsId) return

    // Send pageview with path and query parameters
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Track page view
    window.gtag?.("config", googleAnalyticsId, {
      page_path: url,
      send_page_view: true,
    })

    // Special handling for authentication pages
    if (pathname?.includes("/auth/")) {
      const authAction = pathname.split("/auth/")[1]?.split("?")[0] || "unknown"
      const redirectedFrom = searchParams?.get("redirectedFrom") || "direct"

      window.gtag?.("event", "auth_page_view", {
        auth_type: authAction,
        redirected_from: redirectedFrom,
        page_url: url,
      })
    }
  }, [pathname, searchParams, googleAnalyticsId])

  if (!googleAnalyticsId) {
    return <>{children}</>
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              cookie_domain: window.location.hostname,
              user_properties: {
                app_version: '1.0.0',
                platform: 'web'
              }
            });
          `,
        }}
      />
      {children}
    </>
  )
}
