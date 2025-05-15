import { Metadata } from "next"
import { LoginClient } from "./client"

export const metadata: Metadata = {
  title: "Login | VeritasVault",
  description: "Log in to your VeritasVault account",
}

/**
 * Login page with analytics flags
 * This page handles user authentication and tracks login attempts
 */
export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract returnUrl and any flags from query parameters
  const returnUrl = searchParams.returnUrl as string || "/"
  const loginFlag = searchParams.flag as string || "default"
  
  return <LoginClient returnUrl={returnUrl} loginFlag={loginFlag} />
}