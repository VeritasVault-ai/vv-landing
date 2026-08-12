"use client"

/**
 * Renders the Vercel Web Analytics beacon only while the app is actually hosted
 * on Vercel. Off-platform the SDK cannot report anywhere, so mounting it just
 * ships dead script.
 *
 * Application Insights is not mounted here — it initialises lazily from
 * lib/analytics/provider.ts on first tracked event, so it needs no component.
 *
 * After the Azure cutover this renders nothing and both this file and the
 * `@vercel/analytics` dependency can be removed. See docs/azure-migration.md.
 */

import { Analytics as VercelAnalytics } from "@vercel/analytics/next"

const onVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV)

export function AnalyticsScripts() {
  if (!onVercel) return null
  return <VercelAnalytics />
}
