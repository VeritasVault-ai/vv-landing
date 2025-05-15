import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Risk Management Whitepaper | VeritasVault Enterprise",
  description: "Download our comprehensive whitepaper on risk management solutions for digital assets."
}

export default function RiskWhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}