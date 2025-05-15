import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Portfolio Optimization Whitepaper | VeritasVault Enterprise",
  description: "Download our comprehensive whitepaper on portfolio optimization solutions for digital assets."
}

export default function PortfolioWhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}