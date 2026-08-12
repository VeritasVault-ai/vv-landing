"use client"

/**
 * Provider-agnostic analytics sink.
 *
 * The app was wired directly to Vercel Web Analytics. Hosting is moving to Azure
 * Container Apps, where that SDK is a no-op, so call sites now go through this
 * shim instead of importing `@vercel/analytics` directly.
 *
 * Both sinks are attempted on every event and each is independently guarded:
 * during the Vercel→Azure cutover both may be live, and afterwards the Vercel
 * one self-disables because `process.env.VERCEL` is unset off-platform. That
 * means no analytics gap and no code change at cutover.
 *
 * See docs/azure-migration.md.
 */

import { track as vercelTrack } from "@vercel/analytics"

type Properties = Record<string, string | number | boolean | null>

/** True only when running on Vercel's platform, which injects VERCEL=1. */
const onVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV)

const appInsightsConnectionString =
  process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING ?? ""

/**
 * Application Insights is loaded lazily and only when configured, so the bundle
 * does not carry it while the app is still on Vercel. Resolves to null when
 * unconfigured or unavailable.
 */
let appInsightsPromise: Promise<{ trackEvent: (e: { name: string }, p?: Properties) => void } | null> | null = null

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

/**
 * Records a single analytics event. Never throws — analytics must not be able to
 * break a user flow, which is why each sink is guarded separately rather than
 * sharing one try block.
 */
export function trackEvent(name: string, properties: Properties = {}): void {
  if (onVercel) {
    try {
      vercelTrack(name, properties)
    } catch {
      // Ignore: analytics failures must never surface to the user.
    }
  }

  if (appInsightsConnectionString) {
    void getAppInsights()
      .then((ai) => ai?.trackEvent({ name }, properties))
      .catch(() => {
        // Ignore: see above.
      })
  }
}

/** True when at least one sink is configured. Useful for dev diagnostics. */
export function analyticsEnabled(): boolean {
  return onVercel || Boolean(appInsightsConnectionString)
}
