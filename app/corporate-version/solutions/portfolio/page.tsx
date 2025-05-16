import { Metadata } from "next"
import { PortfolioSolutionClient } from "./client"

export const metadata: Metadata = {
  title: "Portfolio Management Solutions | VeritasVault Enterprise",
  description: "Advanced portfolio management solutions for institutions investing in digital assets.",
}

/**
 * Portfolio Management solution page for the corporate version
 */
export default function PortfolioSolutionPage() {
  return <PortfolioSolutionClient />
}