"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the Google Analytics ID from environment variables
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Track page view
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      send_page_view: true,
      user_properties: {
        app_version: "1.0.0",
        platform: "web",
        theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      },
    })
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              cookie_domain: window.location.hostname
            });
          `,
        }}
      />
    </>
  )
}
