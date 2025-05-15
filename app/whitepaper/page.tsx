import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "VeritasVault Whitepaper | Enterprise Solutions",
  description: "Download our comprehensive whitepaper on enterprise-grade digital asset management solutions."
}

export default function WhitepaperPage() {
  // Redirect to the whitepaper PDF file
  redirect("/whitepapers/veritasvault-whitepaper.pdf")
}