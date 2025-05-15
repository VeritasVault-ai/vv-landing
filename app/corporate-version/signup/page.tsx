import { Metadata } from "next"
import { SignupClient } from "./client"

export const metadata: Metadata = {
  title: "Sign Up | VeritasVault Enterprise",
  description: "Create your VeritasVault Enterprise account and start managing your institutional digital assets.",
}

/**
 * Signup page for the corporate version
 */
export default function SignupPage() {
  return <SignupClient />
}