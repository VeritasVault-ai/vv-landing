"use client"

/**
 * Application Insights analytics sink. It remains lazy and non-throwing so
 * telemetry can never block a user flow.
 */

type Properties = Record<string, string | number | boolean | null>

const appInsightsConnectionString =
  process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING ?? ""

/**
 * Application Insights is loaded lazily and only when configured, so the bundle
 * Resolves to null when unconfigured or unavailable.
 */
type AppInsightsClient = {
  trackEvent: (event: { name: string }, properties?: Properties) => void
  trackPageView: () => void
}

let appInsightsPromise: Promise<AppInsightsClient | null> | null = null

function getAppInsights() {
  if (!appInsightsConnectionString) return Promise.resolve(null)

  if (!appInsightsPromise) {
    appInsightsPromise = import("@microsoft/applicationinsights-web")
      .then(({ ApplicationInsights }) => {
        const ai = new ApplicationInsights({
          config: {
            connectionString: appInsightsConnectionString,
            disableFetchTracking: false,
            enableAutoRouteTracking: true,
          },
        })
        ai.loadAppInsights()
        return ai
      })
      .catch(() => null)
  }

  return appInsightsPromise
}

/** Starts browser telemetry at application mount, including the initial page view. */
export function initializeAnalytics(): void {
  if (!appInsightsConnectionString) return

  void getAppInsights()
    .then((ai) => ai?.trackPageView())
    .catch(() => {
      // Ignore: telemetry must not block rendering.
    })
}

/**
 * Records a single analytics event. Never throws — analytics must not be able to
 * break a user flow.
 */
export function trackEvent(name: string, properties: Properties = {}): void {
  if (appInsightsConnectionString) {
    void getAppInsights()
      .then((ai) => ai?.trackEvent({ name }, properties))
      .catch(() => {
        // Ignore: see above.
      })
  }
}

/** True when Application Insights is configured. Useful for dev diagnostics. */
export function analyticsEnabled(): boolean {
  return Boolean(appInsightsConnectionString)
}
