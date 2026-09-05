import { NextRequest, NextResponse } from 'next/server'

const protectedAlphaRoutePrefixes = [
  '/admin',
  '/analytics',
  '/dashboard',
  '/flash-loans',
  '/pools',
  '/profile',
  '/risk-assessment',
  '/settings',
  '/strategies',
  '/standard-version/dashboard',
]

export function isProtectedAlphaRoute(pathname: string): boolean {
  return protectedAlphaRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function isRetiredCorporateRoute(pathname: string): boolean {
  return (
    pathname === '/corporate' ||
    pathname.startsWith('/corporate/') ||
    pathname === '/corporate-version' ||
    pathname.startsWith('/corporate-version/')
  )
}

function applicationInsightsIngestionOrigin(): string | null {
  const connectionString = process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING
  const endpoint = connectionString
    ?.split(';')
    .find((part) => part.startsWith('IngestionEndpoint='))
    ?.slice('IngestionEndpoint='.length)

  if (!endpoint) return null

  try {
    const url = new URL(endpoint)
    return url.protocol === 'https:' ? url.origin : null
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname

  // The approved alpha is Standard-only. Keep the Corporate prototype out of
  // the runtime surface after the retired implementation was removed.
  if (isRetiredCorporateRoute(path)) {
    return NextResponse.redirect(new URL('/standard', request.url))
  }

  // Mystira OIDC is a separately approved follow-up. Until it exists, routes
  // that require an end-user identity are deliberately unavailable.
  if (isProtectedAlphaRoute(path)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Block WordPress exploit probes with custom error page
  if (
    path.startsWith('/wp-admin') ||
    path.startsWith('/wordpress/wp-admin') ||
    path.endsWith('setup-config.php')
  ) {
     const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>404 – Not Found</title>
        <style>
          body { background: #09090b; color: #fafaf9; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; }
          .container { text-align: center; }
          h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
          p { color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🛡️ 404 – This is not the WordPress you’re looking for.</h1>
          <p>If you’re a bot, go probe somewhere else.<br>If you’re human and ended up here by mistake, contact the site admin.</p>
        </div>
      </body>
      </html>
    `
    return new NextResponse(html, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }

  const response = NextResponse.next()
  const ingestionOrigin = applicationInsightsIngestionOrigin()
  const connectSources = ["'self'", ingestionOrigin].filter(Boolean).join(' ')

  // Hardened security headers
  response.headers.set('Content-Security-Policy',
    `default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; connect-src ${connectSources}; frame-ancestors 'none';`
  )
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), usb=(), payment=(), accelerometer=(), gyroscope=(), magnetometer=(), clipboard-read=(), clipboard-write=()')
  response.headers.set('Feature-Policy', "camera 'none'; microphone 'none'; geolocation 'none'; usb 'none'; payment 'none'; accelerometer 'none'; gyroscope 'none'; magnetometer 'none'; clipboard-read 'none'; clipboard-write 'none'")
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
