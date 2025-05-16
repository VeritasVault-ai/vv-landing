import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Security Whitepaper | VeritasVault Enterprise",
  description: "Download our comprehensive whitepaper on security features for digital asset management."
}

export default function SecurityWhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}