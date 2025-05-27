import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Get the wallet session ID from cookies
    const sessionId = request.cookies.get('vv_wallet_session_id')?.value
    
    if (!sessionId) {
      return NextResponse.json({
        success: true,
        message: 'No active wallet session to disconnect'
      })
    }
    
    // Create a Supabase client for server-side operations
    const cookieStore = cookies()
    const supabase = createServerClient({ cookies: cookieStore })
    
    // Mark the session as inactive in the database
    const { error } = await supabase
      .from('wallet_sessions')
      .update({
        is_active: false
      })
      .eq('session_id', sessionId)
    
    if (error) {
      console.error('Error updating wallet session:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to update session status'
      }, { status: 500 })
    }
    
    // Clear the session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Wallet disconnected successfully'
    })
    
    response.cookies.set({
      name: 'vv_wallet_session_id',
      value: '',
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    
    return response
    
  } catch (error) {
    console.error('Error disconnecting wallet:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to disconnect wallet'
    }, { status: 500 })
  }
}