import { createServerClient } from "@/lib/supabase"
import { syncUserProfile } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"
  const provider = requestUrl.searchParams.get("provider") || "unknown"
  const version = redirectTo.includes("corporate") ? "corporate" : "standard"

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient()

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      // Update user metadata with version information if not already set
      if (!data.user.user_metadata?.account_type) {
        await supabase.auth.updateUser({
          data: { account_type: version },
        })
      }

      // Sync user profile data
      await syncUserProfile(data.user.id)

      // Add analytics tracking script to the response
      const response = NextResponse.redirect(new URL(redirectTo, requestUrl.origin))

      // Add analytics data to be picked up by client-side script
      response.headers.set(
        "Set-Cookie",
        `auth_analytics=${encodeURIComponent(
          JSON.stringify({
            event: "social_login_success",
            provider,
            version,
            timestamp: new Date().toISOString(),
            user_id_hash: Buffer.from(data.user.id).toString("base64").slice(-10),
          }),
        )}; Path=/; Max-Age=60; SameSite=Lax`,
      )

      return response
    }
  }

  // If no code or error, redirect to appropriate login page based on version
  const defaultRedirect =
    requestUrl.searchParams.get("version") === "corporate" ? "/corporate/login" : "/standard/login"

  return NextResponse.redirect(new URL(defaultRedirect, requestUrl.origin))
}
