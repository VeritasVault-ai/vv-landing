import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { SITE_VERSION_COOKIE, DEFAULT_VERSION } from "@/lib/version-utils"
import { checkAuthStatus, isProtectedRoute, getLoginRedirect } from "@/lib/auth/auth-middleware"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets, API routes, and other special paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Get the stored preference from cookies
  const siteVersion = request.cookies.get(SITE_VERSION_COOKIE)?.value || DEFAULT_VERSION

  // Allow direct access to the root path without redirection
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Handle auth routes - redirect to version-specific auth pages
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    const url = request.nextUrl.clone()
    url.pathname = `/${siteVersion}${pathname.replace("/auth", "")}`
    return NextResponse.redirect(url)
  }

  // Check if this is a protected route
  if (isProtectedRoute(pathname)) {
    // Check authentication status
    const { isAuthenticated } = await checkAuthStatus(request)

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      const loginUrl = getLoginRedirect(request)
      const url = request.nextUrl.clone()
      url.pathname = loginUrl.split("?")[0]
      url.search = loginUrl.includes("?") ? loginUrl.split("?")[1] : ""
      return NextResponse.redirect(url)
    }
  }

  // For all other cases, continue with the request
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
