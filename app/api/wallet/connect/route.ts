import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { validateWalletWithPlurality } from '@/lib/middleware/plurality'

interface ConnectRequest {
  walletAddress: string
  chainId: number
  signature: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json() as ConnectRequest
    const { walletAddress, chainId, signature } = body
    
    if (!walletAddress || !chainId || !signature) {
      return NextResponse.json({ 
        error: 'Missing required parameters' 
      }, { status: 400 })
    }
    
    // Validate the wallet address using Plurality security
    const { isValid, securityScore, riskLevel } = await validateWalletWithPlurality(walletAddress)
    
    if (!isValid) {
      return NextResponse.json({
        error: 'Wallet address validation failed',
        details: { securityScore, riskLevel }
      }, { status: 403 })
    }
    
    // Verify the provided signature (simplified for this implementation)
    const isSignatureValid = signature.length > 32 // Placeholder for actual signature verification
    
    if (!isSignatureValid) {
      return NextResponse.json({ 
        error: 'Invalid signature' 
      }, { status: 401 })
    }
    
    // Create a Supabase client for server-side operations
    const cookieStore = cookies()
    const supabase = createServerClient()
    
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ 
        error: 'User must be authenticated to connect a wallet' 
      }, { status: 401 })
    }
    
    // Generate a session ID for the wallet connection
    const sessionId = crypto.randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 4 * 60 * 60 * 1000) // 4 hours
    
    // Store the wallet session in the database
    const { error: dbError } = await supabase
      .from('wallet_sessions')
      .insert({
        session_id: sessionId,
        user_id: session.user.id,
        wallet_address: walletAddress,
        chain_id: chainId,
        connected_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        last_active: now.toISOString(),
        is_active: true
      })
    
    if (dbError) {
      console.error('Failed to store wallet session:', dbError)
      return NextResponse.json({ 
        error: 'Failed to create wallet session' 
      }, { status: 500 })
    }
    
    // Set a cookie with the session ID
    const response = NextResponse.json({
      success: true,
      sessionId,
      expiresAt: expiresAt.toISOString()
    })
    
    response.cookies.set({
      name: 'vv_wallet_session_id',
      value: sessionId,
      expires: expiresAt,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    
    // Add security headers
    response.headers.set('X-Wallet-Protection', 'enabled')
    response.headers.set('X-Plurality-Protection', 'enabled')
    
    return response
    
  } catch (error) {
    console.error('Wallet connection error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}