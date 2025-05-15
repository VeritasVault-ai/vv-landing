import { Metadata } from "next"
import { DashboardClient } from "./client"

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Enterprise Dashboard | VeritasVault",
  description: "Access your enterprise treasury management dashboard and analytics.",
}

/**
 * Dashboard page for the corporate version
 * This is where users land after clicking the demo button
 */
export default function DashboardPage() {
  return <DashboardClient />
}