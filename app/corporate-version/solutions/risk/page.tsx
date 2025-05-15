import { Metadata } from "next"
import { RiskSolutionClient } from "./client"

export const metadata: Metadata = {
  title: "Risk Management Solutions | VeritasVault Enterprise",
  description: "Advanced risk management solutions for institutions dealing with digital assets.",
}

/**
 * Risk Management solution page for the corporate version
 */
export default function RiskSolutionPage() {
  return <RiskSolutionClient />
}