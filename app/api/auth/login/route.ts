import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

/**
 * API route for handling login requests
 * Includes support for login flags for analytics tracking
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP address for logging
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'
    
    // Parse request body
    const body = await request.json()
    const { email, password, flag = 'default' } = body
    
    // Log login attempt with flag (in a real app, use a proper logging system)
    console.log(`[${new Date().toISOString()}] Login attempt - Email: ${email}, Flag: ${flag}, IP: ${ip}`)
    
    // For demo purposes, accept any login with a valid email format
    // In production, you would validate credentials against your database
    if (!email || !email.includes('@') || !password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Generate a mock token (in production, use a proper JWT or session system)
    const token = Buffer.from(`${email}:${Date.now()}:${flag}`).toString('base64')
    
    // In a real application, you would:
    // 1. Validate credentials against your database
    // 2. Create a proper session or JWT token
    // 3. Store login analytics data
    
    // Return success response with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        email,
        name: email.split('@')[0],
        // Include other user data as needed
      },
      // Include the flag in the response for client-side tracking
      flag
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}