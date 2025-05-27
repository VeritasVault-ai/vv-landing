'use client'

import { useState, useEffect, useCallback } from 'react'
import { createWalletSession, terminateWalletSession, updateWalletSessionActivity, extendWalletSession, isWalletSessionValid, getWalletSession } from '@/lib/auth/wallet-session'
import { useAnalytics } from './use-analytics'

interface WalletSessionHook {
  isConnected: boolean
  walletAddress: string | null
  chainId: number | null
  connectWallet: (address: string, chainId: number, signature: string) => Promise<boolean>
  disconnectWallet: () => Promise<void>
  refreshSession: () => Promise<boolean>
  sessionExpiresAt: Date | null
}

/**
 * Hook for managing wallet connection sessions.
 * Provides functionality to connect wallets, track session status,
 * and handle session expiration.
 */
export function useWalletSession(): WalletSessionHook {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null)
  const { trackEvent } = useAnalytics()

  // Check for existing session on mount
  useEffect(() => {
    checkWalletSession()
    
    // Set up periodic session refresh
    const refreshInterval = setInterval(() => {
      checkWalletSession()
    }, 60000) // Check every minute
    
    // Set up activity tracking
    const activityInterval = setInterval(() => {
      if (isConnected) {
        updateWalletSessionActivity()
      }
    }, 5 * 60 * 1000) // Update activity every 5 minutes
    
    return () => {
      clearInterval(refreshInterval)
      clearInterval(activityInterval)
    }
  }, [isConnected])

  // Check if we have a valid wallet session
  const checkWalletSession = useCallback(() => {
    const session = getWalletSession()
    
    if (session && isWalletSessionValid()) {
      setIsConnected(true)
      setWalletAddress(session.walletAddress)
      setChainId(session.chainId)
      setSessionExpiresAt(new Date(session.expiresAt))
    } else {
      setIsConnected(false)
      setWalletAddress(null)
      setChainId(null)
      setSessionExpiresAt(null)
    }
  }, [])

  // Connect wallet function
  const connectWallet = async (address: string, chainId: number, signature: string): Promise<boolean> => {
    try {
      trackEvent({
        action: 'wallet_connect_attempt',
        category: 'wallet',
        label: 'connect',
        custom_data: { chain_id: chainId }
      })
      
      // Call the API to connect the wallet
      const response = await fetch('/api/wallet/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          chainId,
          signature,
        }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to connect wallet')
      }
      
      // Create local session
      await createWalletSession(address, chainId)
      
      // Update state
      setIsConnected(true)
      setWalletAddress(address)
      setChainId(chainId)
      
      const session = getWalletSession()
      setSessionExpiresAt(session ? new Date(session.expiresAt) : null)
      
      trackEvent({
        action: 'wallet_connect_success',
        category: 'wallet',
        label: 'connect',
        custom_data: {
          chain_id: chainId,
          address_prefix: address.substring(0, 6) // Don't track full address for privacy
        }
      })
      
      return true
    } catch (error) {
      console.error('Error connecting wallet:', error)
      
      trackEvent({
        action: 'wallet_connect_error',
        category: 'wallet',
        label: 'connect',
        custom_data: {
          chain_id: chainId,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })
      
      return false
    }
  }

  // Disconnect wallet function
  const disconnectWallet = async (): Promise<void> => {
    try {
      trackEvent({
        action: 'wallet_disconnect',
        category: 'wallet',
        label: 'disconnect'
      })
      
      // Call the API to disconnect
      await fetch('/api/wallet/disconnect', {
        method: 'POST',
      })
      
      // Terminate local session
      await terminateWalletSession()
      
      // Update state
      setIsConnected(false)
      setWalletAddress(null)
      setChainId(null)
      setSessionExpiresAt(null)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  // Refresh/extend session
  const refreshSession = async (): Promise<boolean> => {
    if (!isConnected) return false
    
    try {
      const updatedSession = await extendWalletSession()
      
      if (updatedSession) {
        setSessionExpiresAt(new Date(updatedSession.expiresAt))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error refreshing wallet session:', error)
      return false
    }
  }

  return {
    isConnected,
    walletAddress,
    chainId,
    connectWallet,
    disconnectWallet,
    refreshSession,
    sessionExpiresAt
  }
}