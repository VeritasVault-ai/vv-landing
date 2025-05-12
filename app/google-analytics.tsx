"use client"

import { useEffect, Suspense } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

/**
   * Updates Google Analytics with the current page path on route changes.
   *
   * Triggers a GA page view update whenever the pathname or search parameters change, using the measurement ID from environment variables.
   *
   * @remark Renders nothing and is intended for use within a React component tree to enable client-side GA tracking.
   */
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

/**
 * Integrates Google Analytics into the application by injecting the GA script and initializing tracking.
 *
 * Loads the Google Analytics script and sets up the global `gtag` function with the provided measurement ID. If the measurement ID is not set, renders nothing. Also ensures page view tracking is initialized on first load.
 *
 * @returns The necessary script elements for Google Analytics integration, or `null` if no measurement ID is configured.
 */
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
