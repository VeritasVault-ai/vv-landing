import { Metadata } from "next"
import { PricingClient } from "./client"

export const metadata: Metadata = {
  title: "Pricing | VeritasVault Enterprise",
  description: "Flexible pricing plans for institutional liquidity management solutions tailored to your organization's needs.",
}

/**
 * Pricing page for the corporate version
 */
export default function PricingPage() {
  return <PricingClient />
}