import { Metadata } from "next"
import { SecurityClient } from "./client"

export const metadata: Metadata = {
  title: "Security | VeritasVault Enterprise",
  description: "How we secure your data and protect your assets at VeritasVault Enterprise.",
}

/**
 * Security page for the corporate version
 */
export default function SecurityPage() {
  return <SecurityClient />
}