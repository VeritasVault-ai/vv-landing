import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { Header } from "@/components/layout/header"
import { generateStandardMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"

export const metadata: Metadata = generateStandardMetadata(
  "Standard Dashboard | Liquidity Management",
  "AI-powered dashboard for DeFi liquidity management.",
  "/api/og/standard-dashboard",
)

export default function StandardDashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <div className="pt-16">
        <DashboardOverview />
      </div>
    </div>
  )
}
