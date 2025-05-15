import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware function that runs before requests are processed
 * Handles authentication, login flags, and analytics tracking
 */
export async function middleware(request: NextRequest) {
  // Get the request URL and path
  const url = request.nextUrl.clone()
  const path = url.pathname
  
  // Get client IP address
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // Check for login flag in query parameters
  const loginFlag = url.searchParams.get('flag') || 'default'
  
  // Log request information with login flag
  console.log(`[${new Date().toISOString()}] ${request.method} ${path} - Flag: ${loginFlag} - IP: ${ip}`)
  
  // List of public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/standard-version',
    '/corporate-version',
    '/api/analytics',
    '/api/auth',
    '/api/theme',
    '/favicon.ico',
    '/logo.svg',
    '/logo-white.svg'
  ]

  const securedRoutes = [
    '/dashboard/',
    '/corporate-version/dashboard/',
    '/corporate-version/admin/',
    '/corporate-version/account/',
    '/corporate-version/analytics/',
    '/standard-version/dashboard/',
    '/standard-version/admin/',
    '/standard-version/account/',
    '/standard-version/analytics/',
  ]
  
  // Check if current path starts with any public route
  const isSecuredRoute = securedRoutes.some(route => path.startsWith(route))
  
  // Skip authentication for public routes
  if (!isSecuredRoute) {
    // For login page, preserve the flag parameter
    if (path === '/login' && loginFlag !== 'default') {
      // Flag is already in the URL, no need to modify
      return NextResponse.next()
    }
    
    return NextResponse.next()
  }
  
  // Check for authentication if accessing protected routes
  if (path.startsWith('/corporate-version/dashboard') || 
      path.startsWith('/corporate-version/admin') || 
      path.startsWith('/corporate-version/account')) {
    
    // Check for authentication token in cookies or headers
    const authToken = request.cookies.get('auth_token')?.value
    const authHeader = request.headers.get('authorization')
    
    // If no authentication is present, redirect to login with flag and return URL
    if (!authToken && !authHeader) {
      console.log(`[AUTH] Unauthorized access attempt to ${path} - IP: ${ip}`)
      
      // Determine appropriate login flag based on the accessed route
      let routeFlag = 'dashboard'
      if (path.includes('/admin')) routeFlag = 'admin'
      if (path.includes('/account')) routeFlag = 'account'
      
      // Use provided flag or route-based flag
      const finalFlag = loginFlag !== 'default' ? loginFlag : routeFlag
      
      // Redirect to login page with flag and return URL
      url.pathname = '/login'
      url.searchParams.set('returnUrl', path)
      url.searchParams.set('flag', finalFlag)
      
      return NextResponse.redirect(url)
    }
    
    // In a real implementation, you would validate the token here
    console.log(`[AUTH] Authenticated access to ${path} - IP: ${ip}`)
  }
  
  // Add custom headers to the response
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

/**
 * Configure which paths this middleware will run on
 */
export const config = {
  // Match all request paths except for:
  // - Static files (_next/static/*, favicon.ico, etc.)
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}