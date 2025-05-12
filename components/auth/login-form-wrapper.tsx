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
  // The Suspense boundary is here to handle the client-side rendering bailout
  // that happens with useSearchParams() - this is required for Next.js App Router
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading login form...</div>}>
      <LoginFormWrapperInner />
    </Suspense>
  )
}