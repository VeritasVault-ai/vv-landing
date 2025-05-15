import { Metadata } from "next"
import { DemoClient } from "./client"

export const metadata: Metadata = {
  title: "Request Demo | VeritasVault Enterprise",
  description: "Experience our enterprise treasury management solution with a personalized demo.",
}

/**
 * Demo request page for the corporate version
 * This page will redirect users to the dashboard after form submission
 */
export default function DemoPage() {
  return <DemoClient />
}