import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware function that runs before requests are processed
 * This version blocks WordPress exploit probes and disables Vercel auth redirects.
 */
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Log requests in non-prod for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${path} - IP: ${ip.split(',')[0]?.trim() ?? 'unknown'}`
    )
  }

  // BLOCK WordPress exploit probes
  if (
    path.startsWith('/wp-admin') ||
    path.startsWith('/wordpress/wp-admin') ||
    path.endsWith('setup-config.php')
  ) {
    return new NextResponse('Not found', { status: 404 })
  }

  // Proceed as before, add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('x-vercel-skip-auth', 'true')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
