import { Metadata } from "next"
import { CareersClient } from "./client"

export const metadata: Metadata = {
  title: "Careers | VeritasVault Enterprise",
  description: "Join our team and help build the future of institutional liquidity management for digital assets.",
}

/**
 * Careers page for the corporate version
 */
export default function CareersPage() {
  return <CareersClient />
}