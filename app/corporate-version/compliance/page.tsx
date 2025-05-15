import { Metadata } from "next"
import { ComplianceClient } from "./client"

export const metadata: Metadata = {
  title: "Compliance | VeritasVault Enterprise",
  description: "Learn about our regulatory compliance features for institutional digital asset management.",
}

/**
 * Compliance page for the corporate version
 */
export default function CompliancePage() {
  return <ComplianceClient />
}