import { createBrowserClient } from "@/lib/supabase"
import { SITE_VERSION_COOKIE, DEFAULT_VERSION } from "@/lib/version-utils"
import { getCookie } from "@/lib/cookies"

export type AuthRedirectOptions = {
  redirectTo?: string
  version?: "standard" | "corporate"
}

export async function signInWithEmail(email: string, password: string, options?: AuthRedirectOptions) {
  const supabase = createBrowserClient()

  // Determine which version to use for redirect
  const version = options?.version || getCookie(SITE_VERSION_COOKIE) || DEFAULT_VERSION

  // Set default redirect based on version
  const defaultRedirect = version === "corporate" ? "/corporate/dashboard" : "/standard/dashboard"
  const redirectTo = options?.redirectTo || defaultRedirect

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error, redirectTo }
}

export async function signUpWithEmail(email: string, password: string, userData: any, options?: AuthRedirectOptions) {
  const supabase = createBrowserClient()

  // Determine which version to use for redirect
  const version = options?.version || getCookie(SITE_VERSION_COOKIE) || DEFAULT_VERSION

  // Set default redirect based on version
  const defaultRedirect = version === "corporate" ? "/corporate/dashboard" : "/standard/dashboard"
  const redirectTo = options?.redirectTo || defaultRedirect

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
        account_type: version, // Store the account type in user metadata
      },
    },
  })

  return { data, error, redirectTo }
}

export async function signInWithProvider(provider: "google" | "github", options?: AuthRedirectOptions) {
  const supabase = createBrowserClient()

  // Determine which version to use for redirect
  const version = options?.version || getCookie(SITE_VERSION_COOKIE) || DEFAULT_VERSION

  // Set default redirect based on version
  const defaultRedirect = version === "corporate" ? "/corporate/dashboard" : "/standard/dashboard"
  const redirectTo = options?.redirectTo || defaultRedirect

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}&provider=${provider}`,
    },
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createBrowserClient()
  return await supabase.auth.signOut()
}
