import { Metadata } from "next"
import { TermsClient } from "./client"

export const metadata: Metadata = {
  title: "Terms of Service | VeritasVault Enterprise",
  description: "Terms and conditions for using VeritasVault Enterprise services.",
}

/**
 * Terms of Service page for the corporate version
 */
export default function TermsPage() {
  return <TermsClient />
}