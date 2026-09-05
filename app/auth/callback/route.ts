import { createRequestServerClient } from "@/lib/supabase/server"
import { syncUserProfile } from "@/lib/auth-helpers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"
  const provider = requestUrl.searchParams.get("provider") || "unknown"
  const version = redirectTo.includes("corporate") ? "corporate" : "standard"

  if (code) {
    const response = NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
    const supabase = createRequestServerClient(request, (cookies) => {
      cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
    })

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
      // Add analytics data to be picked up by client-side script
      response.cookies.set(
        "auth_analytics",
        JSON.stringify({
          event: "social_login_success",
          provider,
          version,
          timestamp: new Date().toISOString(),
          user_id_hash: Buffer.from(data.user.id).toString("base64").slice(-10),
        }),
        { path: "/", maxAge: 60, sameSite: "lax" },
      )

      return response
    }
  }

  // If no code or error, redirect to appropriate login page based on version
  const defaultRedirect =
    requestUrl.searchParams.get("version") === "corporate" ? "/corporate/login" : "/standard/login"

  return NextResponse.redirect(new URL(defaultRedirect, requestUrl.origin))
}
