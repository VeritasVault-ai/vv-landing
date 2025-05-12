"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { LoginForm } from "./login-form"

/**
 * Extracts authentication-related search parameters from the URL and renders the login form.
 *
 * Retrieves the `callbackUrl` (defaulting to "/dashboard" if not specified) and any `error` message from the URL's search parameters, then passes them as props to the {@link LoginForm} component.
 */
function LoginFormWrapperInner() {
  const searchParams = useSearchParams()

  // Pass any necessary search params to the login form
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  return <LoginForm callbackUrl={callbackUrl} error={error} />
}

/**
 * Renders the login form within a Suspense boundary to ensure search parameters are available for client-side rendering in Next.js.
 *
 * Displays a loading message until the login form can be rendered with the appropriate URL parameters.
 */
export function LoginFormWrapper() {
  // The Suspense boundary is here to handle the client-side rendering bailout
  // that happens with useSearchParams() - this is required for Next.js App Router
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading login form...</div>}>
      <LoginFormWrapperInner />
    </Suspense>
  )
}