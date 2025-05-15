import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware function that runs before requests are processed
 * This can be used to handle authentication, logging, and other cross-cutting concerns
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
  
  // Log request information (in production, you would send this to a logging service)
  console.log(`[${new Date().toISOString()}] ${request.method} ${path} - IP: ${ip} - UA: ${userAgent.substring(0, 100)}...`)
  
  // Check for authentication if accessing protected routes
  if (path.startsWith('/corporate-version/dashboard') || 
      path.startsWith('/corporate-version/admin') || 
      path.startsWith('/corporate-version/account')) {
    
    // Check for authentication token in cookies or headers
    const authToken = request.cookies.get('auth_token')?.value
    const authHeader = request.headers.get('authorization')
    
    // If no authentication is present, redirect to login
    if (!authToken && !authHeader) {
      console.log(`[AUTH] Unauthorized access attempt to ${path} - IP: ${ip}`)
      
      // Redirect to login page with return URL
      url.pathname = '/corporate-version/login'
      url.searchParams.set('returnUrl', path)
      
      return NextResponse.redirect(url)
    }
    
    // In a real implementation, you would validate the token here
    // For now, we'll just log the authentication attempt
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
  // - API routes (/api/*)
  // - Static files (_next/static/*, favicon.ico, etc.)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}