import { NextRequest, NextResponse } from 'next/server'
import { validateWalletSession } from '@/lib/auth/wallet-session-server'

export async function GET(request: NextRequest) {
  try {
    // Check if there's a valid wallet session
    const { isValid, session } = await validateWalletSession(request)
    
    if (!isValid || !session) {
      return NextResponse.json({
        connected: false,
        message: 'No active wallet session'
      })
    }
    
    // Return the wallet session details
    return NextResponse.json({
      connected: true,
      walletAddress: session.wallet_address,
      chainId: session.chain_id,
      connectedAt: session.connected_at,
      expiresAt: session.expires_at,
      lastActive: session.last_active
    })
    
  } catch (error) {
    console.error('Error checking wallet status:', error)
    return NextResponse.json({
      connected: false,
      error: 'Error checking wallet session status'
    }, { status: 500 })
  }
}