import { Metadata } from "next"
import { ForgotPasswordClient } from "./client"

export const metadata: Metadata = {
  title: "Forgot Password | VeritasVault Enterprise",
  description: "Reset your VeritasVault Enterprise account password.",
}

/**
 * Forgot Password page for the corporate version
 */
export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />
}