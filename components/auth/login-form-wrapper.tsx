"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { LoginForm } from "./login-form"

// Inner component that uses searchParams
function LoginFormWrapperInner() {
  const searchParams = useSearchParams()

  // Pass any necessary search params to the login form
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  return <LoginForm callbackUrl={callbackUrl} error={error} />
}

export function LoginFormWrapper() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading login form...</div>}>
      <LoginFormWrapperInner />
    </Suspense>
  )
}