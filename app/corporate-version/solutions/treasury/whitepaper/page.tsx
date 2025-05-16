import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Treasury Management Whitepaper | VeritasVault Enterprise",
  description: "Download our comprehensive whitepaper on treasury management solutions for digital assets."
}

export default function TreasuryWhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}