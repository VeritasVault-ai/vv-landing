import { Metadata } from "next"
import { LoginClient } from "./client"

export const metadata: Metadata = {
  title: "Login | VeritasVault Enterprise",
  description: "Log in to your VeritasVault enterprise account to access your dashboard and manage your digital assets.",
}

/**
 * Login page for the corporate version
 */
export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract returnUrl and any error from query parameters
  const returnUrl = searchParams.returnUrl as string || "/corporate-version/dashboard"
  const error = searchParams.error as string
  
  return <LoginClient returnUrl={returnUrl} error={error} />
}