import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route for handling GitHub OAuth callback
 * Extracts login flag from state parameter and completes authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Get client IP address for logging
    const headersList = headers()
    const ip = (await headersList).get('x-forwarded-for') || 
               (await headersList).get('x-real-ip') || 
               'unknown'
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    
    if (!code || !state) {
      return NextResponse.redirect(new URL('/login?error=invalid_request', request.url))
    }
    
    // Decode state parameter to get returnUrl and flag
    let returnUrl = '/'
    let flag = 'default'
    
    try {
      const decodedState = Buffer.from(state, 'base64').toString()  
      const stateParts = decodedState.split(':')  
      const stateReturnUrl = stateParts[0]  
      const stateFlag = stateParts[1]  
      
      if (stateReturnUrl) returnUrl = stateReturnUrl
      if (stateFlag) flag = stateFlag
    } catch (error) {
      console.error('Error decoding state:', error)
    }
    
    // Log SSO callback with flag
    console.log(`[${new Date().toISOString()}] GitHub SSO callback - Flag: ${flag}, IP: ${ip}`)
    
    // In a real implementation, you would:
    // 1. Exchange the code for an access token
    // 2. Fetch the user's GitHub profile
    // 3. Create or update the user in your database
    // 4. Create a session or JWT token
    
    // For demo purposes, create a mock token
    const token = Buffer.from(`github:${Date.now()}:${flag}`).toString('base64')
    
    // Set the token in a cookie
    const response = NextResponse.redirect(new URL(returnUrl, request.url))
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    
    // Also set a flag cookie for analytics
    response.cookies.set('login_flag', flag, {
      httpOnly: false, // Allow JavaScript access for analytics
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('GitHub callback error:', error)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}