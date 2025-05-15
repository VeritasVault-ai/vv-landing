import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { randomBytes, createHash } from 'crypto' 
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
    // Mask email for privacy in logs  
    const maskedEmail = email ? `${email.split('@')[0].slice(0, 3)}***@${email.split('@')[1]}` : 'empty'  
    console.log(`[${new Date().toISOString()}] Login attempt - Email: ${maskedEmail}, Flag: ${flag}, IP: ${ip}`)  
    
    // For demo purposes, accept any login with a valid email format
    // In production, you would validate credentials against your database
    if (!email || !email.includes('@') || !password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
  
    // Generate a token with secure random bytes  
    const tokenSecret = process.env.TOKEN_SECRET || 'fallback-secret-for-demo-only'  
    const randomString = randomBytes(32).toString('hex')  
    const timestamp = Date.now().toString()  
    const tokenData = `${email}:${timestamp}`  
    const signature = createHash('sha256')  
      .update(`${tokenData}:${tokenSecret}`)  
      .digest('hex')  
    const token = Buffer.from(`${tokenData}:${signature}`).toString('base64')  
    
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