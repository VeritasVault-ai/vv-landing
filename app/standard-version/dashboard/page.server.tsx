import { generateStandardMetadata } from "@/lib/metadata-utils"
import type { Metadata } from "next"

// export const metadata: Metadata = generateStandardMetadata(
//   "Standard Dashboard | Liquidity Management",
//   "AI-powered dashboard for DeFi liquidity management.",
//   "/api/og/standard-dashboard",
/**
 * Renders the Standard Dashboard page container with adaptive background for light and dark modes.
 *
 * @returns A React element representing the dashboard page layout.
 */

export default function StandardDashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* … your header + content */}
    </div>
  )
}