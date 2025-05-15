import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Compliance Whitepaper | VeritasVault Enterprise",
  description: "Download our comprehensive whitepaper on compliance features for digital asset management."
}

export default function ComplianceWhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}