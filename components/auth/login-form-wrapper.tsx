"use client"

import { useSearchParams } from "next/navigation"
import { LoginForm } from "./login-form"

export function LoginFormWrapper() {
  const searchParams = useSearchParams()

  // Pass any necessary search params to the login form
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  return <LoginForm callbackUrl={callbackUrl} error={error} />
}
