import { Metadata } from "next"
import { CookiesClient } from "./client"

export const metadata: Metadata = {
  title: "Cookie Policy | VeritasVault Enterprise",
  description: "Information about how VeritasVault Enterprise uses cookies on our website.",
}

/**
 * Cookie Policy page for the corporate version
 */
export default function CookiesPage() {
  return <CookiesClient />
}