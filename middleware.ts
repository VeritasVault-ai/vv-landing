import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware function that runs before requests are processed
 * This version completely disables Vercel authentication redirects
 */
export async function middleware(request: NextRequest) {
  // Get the request URL and path
  const url = request.nextUrl.clone()
  const path = url.pathname
  
  // Get client IP address
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  if (process.env.NODE_ENV !== 'production') {  
    console.log(  
      `[${new Date().toISOString()}] ${request.method} ${path} - IP: ${ip.split(',')[0]?.trim() ?? 'unknown'}`  
    )  
  } 
  
  // IMPORTANT: Skip all authentication checks for demo purposes
  // This prevents any redirects to Vercel's login page
  
  // Add custom headers to the response
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Add header to bypass Vercel authentication
  response.headers.set('x-vercel-skip-auth', 'true')
  
  return response
}

/**
 * Configure which paths this middleware will run on
 */
export const config = {
  // Match all request paths except for static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}