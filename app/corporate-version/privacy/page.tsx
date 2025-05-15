import { Metadata } from "next"
import { PrivacyClient } from "./client"

export const metadata: Metadata = {
  title: "Privacy Policy | VeritasVault Enterprise",
  description: "How we collect, use, and protect your information at VeritasVault Enterprise.",
}

/**
 * Privacy Policy page for the corporate version
 */
export default function PrivacyPage() {
  return <PrivacyClient />
}