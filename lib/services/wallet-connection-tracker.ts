"use client"

import { useCallback, useEffect, useState } from 'react'
import { useWalletAnalytics } from '@/hooks/use-wallet-analytics'
import { WalletType } from '@/lib/analytics/wallet-analytics'
import { usePluralityAnalytics } from '@/lib/plurality/plurality-analytics'

// Define connection status types
export type WalletConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

// Define connection error type
export type WalletConnectionError = {
  message: string
  code?: string
  timestamp: number
}

// Define wallet connection state
export type WalletConnectionState = {
  status: WalletConnectionStatus
  address?: string
  chainId?: number
  walletType?: WalletType
  error?: WalletConnectionError
  lastConnected?: number
  connectionDuration?: number
  pluralitySessionId?: string
  pluralityUserId?: string
}

/**
 * Hook for tracking wallet connections and reporting analytics
 */
export function useWalletConnectionTracker() {
  // Initialize analytics hooks
  const walletAnalytics = useWalletAnalytics()
  const pluralityAnalytics = usePluralityAnalytics()
  
  // Track connection state
  const [connectionState, setConnectionState] = useState<WalletConnectionState>({
    status: 'disconnected'
  })
  
  // Track connection metrics
  const [metrics, setMetrics] = useState({
    totalAttempts: 0,
    successfulConnections: 0,
    failedConnections: 0,
    averageConnectTime: 0,
    connectionHistory: [] as Array<{
      timestamp: number
      success: boolean
      duration?: number
      error?: string
    }>
  })
  
  // Track Plurality integration
  const [pluralityState, setPluralityState] = useState({
    sessionId: '',
    userId: '',
    isAuthenticated: false
  })
  
  /**
   * Initialize a wallet connection attempt
   */
  const initiateConnection = useCallback((walletType: WalletType, pluralityData?: { sessionId?: string, userId?: string }) => {
    // Update connection state
    setConnectionState(prev => ({
      ...prev,
      status: 'connecting',
      walletType,
      error: undefined,
      pluralitySessionId: pluralityData?.sessionId,
      pluralityUserId: pluralityData?.userId
    }))
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1
    }))
    
    // Track connection attempt in analytics
    walletAnalytics.trackConnectionAttempt({
      walletType,
      plurality: pluralityData
    })
    
    // Return timestamp for duration calculation
    return Date.now()
  }, [walletAnalytics])
  
  /**
   * Handle successful connection
   */
  const handleConnectionSuccess = useCallback((
    address: string, 
    chainId: number, 
    startTime: number,
    pluralityData?: { sessionId?: string, userId?: string }
  ) => {
    const connectionTime = Date.now() - startTime
    
    // Update connection state
    setConnectionState(prev => ({
      ...prev,
      status: 'connected',
      address,
      chainId,
      lastConnected: Date.now(),
      connectionDuration: connectionTime,
      pluralitySessionId: pluralityData?.sessionId || prev.pluralitySessionId,
      pluralityUserId: pluralityData?.userId || prev.pluralityUserId
    }))
    
    // Update metrics
    setMetrics(prev => {
      const newSuccessCount = prev.successfulConnections + 1
      const newAvgTime = (prev.averageConnectTime * prev.successfulConnections + connectionTime) / newSuccessCount
      
      return {
        ...prev,
        successfulConnections: newSuccessCount,
        averageConnectTime: newAvgTime,
        connectionHistory: [
          {
            timestamp: Date.now(),
            success: true,
            duration: connectionTime
          },
          ...prev.connectionHistory
        ].slice(0, 100) // Keep last 100 connections
      }
    })
    
    // Track in Plurality analytics if we have session data
    if (pluralityData?.sessionId && pluralityData?.userId) {
      pluralityAnalytics.trackWalletConnected(
        pluralityData.sessionId,
        pluralityData.userId,
        address,
        connectionState.walletType || 'unknown',
        chainId,
        { connectionTime }
      )
      
      // Update Plurality state
      setPluralityState({
        sessionId: pluralityData.sessionId,
        userId: pluralityData.userId,
        isAuthenticated: true
      })
    }
  }, [connectionState.walletType, pluralityAnalytics])
  
  /**
   * Handle connection failure
   */
  const handleConnectionFailure = useCallback((
    error: string, 
    errorCode: string | undefined, 
    startTime: number,
    pluralityData?: { sessionId?: string, userId?: string }
  ) => {
    const connectionTime = Date.now() - startTime
    
    // Update connection state
    setConnectionState(prev => ({
      ...prev,
      status: 'error',
      error: {
        message: error,
        code: errorCode,
        timestamp: Date.now()
      },
      pluralitySessionId: pluralityData?.sessionId || prev.pluralitySessionId,
      pluralityUserId: pluralityData?.userId || prev.pluralityUserId
    }))
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      failedConnections: prev.failedConnections + 1,
      connectionHistory: [
        {
          timestamp: Date.now(),
          success: false,
          duration: connectionTime,
          error
        },
        ...prev.connectionHistory
      ].slice(0, 100) // Keep last 100 connections
    }))
    
    // Track in Plurality analytics if we have session data
    if (pluralityData?.sessionId) {
      pluralityAnalytics.trackAuthenticationFailure(
        pluralityData.sessionId,
        error,
        errorCode,
        { connectionTime }
      )
    }
  }, [pluralityAnalytics])
  
  /**
   * Handle wallet disconnection
   */
  const handleDisconnect = useCallback(() => {
    // Only track disconnect if previously connected
    if (connectionState.status === 'connected' && connectionState.address) {
      // Track in wallet analytics
      walletAnalytics.trackDisconnect({
        walletType: connectionState.walletType || WalletType.OTHER,
        address: connectionState.address,
        chainId: connectionState.chainId
      })
      
      // Track in Plurality analytics if we have session data
      if (connectionState.pluralitySessionId && 
          connectionState.pluralityUserId && 
          connectionState.address) {
        pluralityAnalytics.trackWalletDisconnected(
          connectionState.pluralitySessionId,
          connectionState.pluralityUserId,
          connectionState.address,
          connectionState.walletType || 'unknown'
        )
      }
    }
    
    // Reset connection state
    setConnectionState({
      status: 'disconnected'
    })
  }, [
    connectionState.address, 
    connectionState.chainId, 
    connectionState.pluralitySessionId, 
    connectionState.pluralityUserId, 
    connectionState.status, 
    connectionState.walletType, 
    pluralityAnalytics, 
    walletAnalytics
  ])
  
  /**
   * Handle account change
   */
  const handleAccountChanged = useCallback((newAddress: string) => {
    if (connectionState.status === 'connected' && connectionState.address) {
      // Track in wallet analytics
      walletAnalytics.trackAccountChanged(
        connectionState.address,
        newAddress,
        {
          walletType: connectionState.walletType || WalletType.OTHER,
          chainId: connectionState.chainId
        }
      )
      
      // Update connection state
      setConnectionState(prev => ({
        ...prev,
        address: newAddress
      }))
    }
  }, [
    connectionState.address, 
    connectionState.chainId, 
    connectionState.status, 
    connectionState.walletType, 
    walletAnalytics
  ])
  
  /**
   * Handle network change
   */
  const handleNetworkChanged = useCallback((newChainId: number) => {
    if (connectionState.status === 'connected' && connectionState.chainId) {
      // Track in wallet analytics
      walletAnalytics.trackNetworkChanged(
        connectionState.chainId,
        newChainId,
        {
          walletType: connectionState.walletType || WalletType.OTHER,
          address: connectionState.address
        }
      )
      
      // Update connection state
      setConnectionState(prev => ({
        ...prev,
        chainId: newChainId
      }))
    }
  }, [
    connectionState.address, 
    connectionState.chainId, 
    connectionState.status, 
    connectionState.walletType, 
    walletAnalytics
  ])
  
  /**
   * Set Plurality session data
   */
  const setPluralitySession = useCallback((sessionId: string, userId?: string) => {
    setPluralityState(prev => ({
      ...prev,
      sessionId,
      userId: userId || prev.userId
    }))
    
    // Track session creation
    pluralityAnalytics.trackSessionCreated(sessionId, userId)
    
    // Update connection state with Plurality data
    setConnectionState(prev => ({
      ...prev,
      pluralitySessionId: sessionId,
      pluralityUserId: userId
    }))
  }, [pluralityAnalytics])
  
  // Calculate success rate
  const successRate = metrics.totalAttempts > 0 
    ? (metrics.successfulConnections / metrics.totalAttempts) * 100 
    : 0
  
  // Return connection tracker API
  return {
    // Connection state
    connectionState,
    metrics: {
      ...metrics,
      successRate
    },
    pluralityState,
    
    // Connection methods
    initiateConnection,
    handleConnectionSuccess,
    handleConnectionFailure,
    handleDisconnect,
    handleAccountChanged,
    handleNetworkChanged,
    setPluralitySession,
    
    // Analytics hooks for direct access
    walletAnalytics,
    pluralityAnalytics
  }
}

