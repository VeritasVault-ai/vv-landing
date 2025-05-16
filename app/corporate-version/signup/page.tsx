import { Metadata } from "next"
import { Suspense } from "react"
import { SignupClient } from "./client"

export const metadata: Metadata = {
  title: "Sign Up | VeritasVault Enterprise",
  description: "Create your VeritasVault Enterprise account and start managing your institutional digital assets.",
}

/**
 * Signup page for the corporate version
 */
export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SignupClient />
    </Suspense>
  )
}