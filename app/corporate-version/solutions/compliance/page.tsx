import { Metadata } from "next"
import { ComplianceSolutionClient } from "./client"

export const metadata: Metadata = {
  title: "Compliance Solutions | VeritasVault Enterprise",
  description: "Advanced compliance solutions for institutions managing digital assets.",
}

/**
 * Compliance solution page for the corporate version
 */
export default function ComplianceSolutionPage() {
  return <ComplianceSolutionClient />
}