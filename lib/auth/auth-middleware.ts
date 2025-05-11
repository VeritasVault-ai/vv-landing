import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { SITE_VERSION_COOKIE, DEFAULT_VERSION } from "@/lib/version-utils"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/standard",
  "/corporate",
  "/standard/login",
  "/standard/register",
  "/corporate/login",
  "/corporate/register",
  "/auth/callback",
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
]

// Define routes that should be protected based on a pattern
const protectedPatterns = [
  "/standard/dashboard",
  "/corporate/dashboard",
  "/standard/settings",
  "/corporate/settings",
  "/standard/analytics",
  "/corporate/analytics",
  "/standard/strategies",
  "/corporate/strategies",
  "/standard/pools",
  "/corporate/pools",
]

export async function checkAuthStatus(request: NextRequest) {
  // Create a Supabase client for server-side auth checks
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    isAuthenticated: !!session,
    user: session?.user || null,
  }
}

export function isProtectedRoute(pathname: string): boolean {
  // Check if the path matches any of the protected patterns
  return protectedPatterns.some((pattern) => {
    if (pattern.endsWith("*")) {
      const basePattern = pattern.slice(0, -1)
      return pathname.startsWith(basePattern)
    }
    return pathname === pattern || pathname.startsWith(`${pattern}/`)
  })
}

export function isPublicRoute(pathname: string): boolean {
  // Check if the path is in the public routes list
  return publicRoutes.some((route) => {
    if (route.endsWith("*")) {
      const baseRoute = route.slice(0, -1)
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })
}

export function getLoginRedirect(request: NextRequest): string {
  // Get the stored version preference from cookies
  const siteVersion = request.cookies.get(SITE_VERSION_COOKIE)?.value || DEFAULT_VERSION

  // Create the login URL with the current URL as the redirect target
  const currentUrl = request.nextUrl.pathname
  const encodedRedirect = encodeURIComponent(currentUrl)

  return `/${siteVersion}/login?redirectTo=${encodedRedirect}`
}
