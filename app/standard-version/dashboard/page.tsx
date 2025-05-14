import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { UnifiedHeader } from "@/components/layout/unified-header"
import { generateStandardMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"

export const metadata: Metadata = generateStandardMetadata(
  "Standard Dashboard | Liquidity Management",
  "AI-powered dashboard for DeFi liquidity management.",
  "/api/og/standard-dashboard",
)

/**
 * Renders the standard dashboard page for liquidity management, including the unified header and dashboard overview.
 *
 * @returns The JSX structure for the dashboard page.
 */
export default function StandardDashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <UnifiedHeader />
      <div className="pt-16">
        <DashboardOverview />
      </div>
    </div>
  )
}
