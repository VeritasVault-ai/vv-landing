"use client"

import { useEffect, Suspense } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

// Inner component that uses searchParams
function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the Google Analytics ID from environment variables
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

  useEffect(() => {
    if (gaId && window.gtag) {
      // When the route changes, update GA
      window.gtag("config", gaId, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      })
    }
  }, [pathname, searchParams, gaId])

    return null
  }

export default function GoogleAnalytics() {
  // Get the Google Analytics ID from environment variables
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
  
  if (!gaId) return null
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  )
}
