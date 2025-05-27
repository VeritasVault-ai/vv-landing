"use client"

import { useCallback } from "react"
import { useAnalytics } from "./use-analytics"
import {
  WalletConnectionEventType,
  WalletTransactionEventType,
  WalletType,
  WalletConnectionEventData,
  WalletTransactionEventData
} from "@/lib/analytics/wallet-analytics"

/**
 * Hook for tracking wallet-related analytics events
 */
export function useWalletAnalytics() {
  const { trackEvent } = useAnalytics()

  /**
   * Track a wallet connection attempt
   */
  const trackConnectionAttempt = useCallback((data: Omit<WalletConnectionEventData, 'error' | 'errorCode'>) => {
    const startTime = Date.now()
    
    trackEvent({
      action: WalletConnectionEventType.CONNECT_ATTEMPT,
      category: 'wallet_connection',
      label: data.walletType,
      ...data,
    })
    
    return {
      // Return functions to track success or failure
      success: (address: string, chainId: number, pluralityData?: any) => {
        const duration = Date.now() - startTime
        
        trackEvent({
          action: WalletConnectionEventType.CONNECT_SUCCESS,
          category: 'wallet_connection',
          label: data.walletType,
          address,
          chainId,
          duration,
          plurality: pluralityData,
          ...data,
        })
      },
      failure: (error: string, errorCode?: string, pluralityData?: any) => {
        const duration = Date.now() - startTime
        
        trackEvent({
          action: WalletConnectionEventType.CONNECT_FAILURE,
          category: 'wallet_connection',
          label: data.walletType,
          error,
          errorCode,
          duration,
          plurality: pluralityData,
          ...data,
        })
      }
    }
  }, [trackEvent])

  /**
   * Track a wallet disconnection
   */
  const trackDisconnect = useCallback((data: Omit<WalletConnectionEventData, 'error' | 'errorCode'>) => {
    trackEvent({
      action: WalletConnectionEventType.DISCONNECT,
      category: 'wallet_connection',
      label: data.walletType,
      ...data,
    })
  }, [trackEvent])

  /**
   * Track a wallet account change
   */
  const trackAccountChanged = useCallback((
    oldAddress: string,
    newAddress: string,
    data: Omit<WalletConnectionEventData, 'error' | 'errorCode'>
  ) => {
    trackEvent({
      action: WalletConnectionEventType.ACCOUNT_CHANGED,
      category: 'wallet_connection',
      label: data.walletType,
      oldAddress,
      newAddress,
      ...data,
    })
  }, [trackEvent])

  /**
   * Track a wallet network change
   */
  const trackNetworkChanged = useCallback((
    oldChainId: number,
    newChainId: number,
    data: Omit<WalletConnectionEventData, 'error' | 'errorCode'>
  ) => {
    trackEvent({
      action: WalletConnectionEventType.NETWORK_CHANGED,
      category: 'wallet_connection',
      label: data.walletType,
      oldChainId,
      newChainId,
      ...data,
    })
  }, [trackEvent])

  /**
   * Track a transaction initiation
   */
  const trackTransactionInitiated = useCallback((data: WalletTransactionEventData) => {
    const startTime = Date.now()
    
    trackEvent({
      action: WalletTransactionEventType.TRANSACTION_INITIATED,
      category: 'wallet_transaction',
      label: data.transactionType,
      timestamp: startTime,
      ...data,
    })
    
    return {
      // Return functions to track subsequent steps
      signed: () => {
        trackEvent({
          action: WalletTransactionEventType.TRANSACTION_SIGNED,
          category: 'wallet_transaction',
          label: data.transactionType,
          timestamp: Date.now(),
          duration: Date.now() - startTime,
          ...data,
        })
        
        return {
          submitted: (transactionHash: string) => {
            const submittedTime = Date.now()
            
            trackEvent({
              action: WalletTransactionEventType.TRANSACTION_SUBMITTED,
              category: 'wallet_transaction',
              label: data.transactionType,
              transactionHash,
              timestamp: submittedTime,
              duration: submittedTime - startTime,
              ...data,
            })
            
            return {
              success: (gasUsed?: string, gasPrice?: string) => {
                trackEvent({
                  action: WalletTransactionEventType.TRANSACTION_SUCCESS,
                  category: 'wallet_transaction',
                  label: data.transactionType,
                  transactionHash,
                  gasUsed,
                  gasPrice,
                  timestamp: Date.now(),
                  duration: Date.now() - startTime,
                  ...data,
                })
              },
              failure: (error: string, errorCode?: string) => {
                trackEvent({
                  action: WalletTransactionEventType.TRANSACTION_FAILURE,
                  category: 'wallet_transaction',
                  label: data.transactionType,
                  transactionHash,
                  error,
                  errorCode,
                  timestamp: Date.now(),
                  duration: Date.now() - startTime,
                  ...data,
                })
              }
            }
          }
        }
      },
      failure: (error: string, errorCode?: string) => {
        trackEvent({
          action: WalletTransactionEventType.TRANSACTION_FAILURE,
          category: 'wallet_transaction',
          label: data.transactionType,
          error,
          errorCode,
          timestamp: Date.now(),
          duration: Date.now() - startTime,
          ...data,
        })
      }
    }
  }, [trackEvent])

  return {
    trackConnectionAttempt,
    trackDisconnect,
    trackAccountChanged,
    trackNetworkChanged,
    trackTransactionInitiated,
    // Export event types for direct use
    WalletConnectionEventType,
    WalletTransactionEventType,
    WalletType,
  }
}

