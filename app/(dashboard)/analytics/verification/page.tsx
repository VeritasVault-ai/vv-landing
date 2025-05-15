import { AnalyticsVerification } from "@/components/analytics/analytics-verification"

export const metadata = {
  title: "Analytics Verification - VeritasVault.net",
  description: "Verify that Google Analytics is properly configured",
}

export default function AnalyticsVerificationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Analytics Verification</h1>
      <AnalyticsVerification />
    </div>
  )
}
