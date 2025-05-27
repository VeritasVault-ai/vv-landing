"use client"

import { useCallback } from 'react'
import { useWalletAnalytics } from '@/hooks/use-wallet-analytics'
import { WalletType } from '@/lib/analytics/wallet-analytics'
import { usePluralityAnalytics } from '@/lib/plurality/plurality-analytics'

// Define transaction types
export type TransactionType = 'deposit' | 'withdrawal' | 'governance' | 'other'

// Define transaction state
export type TransactionState = {
  hash?: string
  status: 'initiated' | 'signed' | 'submitted' | 'confirmed' | 'failed'
  type: TransactionType
  walletType: WalletType
  address: string
  chainId: number
  amount?: string
  asset?: string
  error?: string
  errorCode?: string
  gasUsed?: string
  gasPrice?: string
  startTime: number
  endTime?: number
  pluralitySessionId?: string
  pluralityUserId?: string
}

/**
 * Hook for tracking blockchain transactions and reporting analytics
 */
export function useTransactionTracker() {
  // Initialize analytics hooks
  const walletAnalytics = useWalletAnalytics()
  const pluralityAnalytics = usePluralityAnalytics()
  
  /**
   * Initialize a transaction
   */
  const initiateTransaction = useCallback((
    transactionType: TransactionType,
    walletType: WalletType,
    address: string,
    chainId: number,
    amount?: string,
    asset?: string,
    pluralityData?: { sessionId?: string, userId?: string }
  ) => {
    const startTime = Date.now()
    
    // Create transaction state
    const transactionState: TransactionState = {
      status: 'initiated',
      type: transactionType,
      walletType,
      address,
      chainId,
      amount,
      asset,
      startTime,
      pluralitySessionId: pluralityData?.sessionId,
      pluralityUserId: pluralityData?.userId
    }
    
    // Track in wallet analytics
    const tracker = walletAnalytics.trackTransactionInitiated({
      walletType,
      address,
      chainId,
      transactionType,
      amount,
      asset,
      plurality: pluralityData
    })
    
    // Track in Plurality analytics if we have session data
    if (pluralityData?.sessionId && pluralityData?.userId) {
      pluralityAnalytics.trackTransactionInitiated(
        pluralityData.sessionId,
        pluralityData.userId,
        address,
        transactionType,
        { amount, asset, chainId }
      )
    }
    
    // Return transaction state and tracking methods
    return {
      transactionState,
      
      // Handle transaction signing
      signed: () => {
        // Update transaction state
        const updatedState: TransactionState = {
          ...transactionState,
          status: 'signed'
        }
        
        // Track in wallet analytics
        const submittedTracker = tracker.signed()
        
        // Return updated state and tracking methods
        return {
          transactionState: updatedState,
          
          // Handle transaction submission
          submitted: (transactionHash: string) => {
            // Update transaction state
            const submittedState: TransactionState = {
              ...updatedState,
              hash: transactionHash,
              status: 'submitted'
            }
            
            // Track in wallet analytics
            const confirmationTracker = submittedTracker.submitted(transactionHash)
            
            // Return updated state and tracking methods
            return {
              transactionState: submittedState,
              
              // Handle transaction confirmation
              confirmed: (gasUsed?: string, gasPrice?: string) => {
                // Update transaction state
                const confirmedState: TransactionState = {
                  ...submittedState,
                  status: 'confirmed',
                  gasUsed,
                  gasPrice,
                  endTime: Date.now()
                }
                
                // Track in wallet analytics
                confirmationTracker.success(gasUsed, gasPrice)
                
                // Track in Plurality analytics if we have session data
                if (pluralityData?.sessionId && pluralityData?.userId) {
                  pluralityAnalytics.trackTransactionInitiated(
                    pluralityData.sessionId,
                    pluralityData.userId,
                    address,
                    transactionType,
                    { amount, asset, chainId }
                  ).completed(transactionHash, { gasUsed, gasPrice })
                }
                
                return confirmedState
              },
              
              // Handle transaction failure after submission
              failed: (error: string, errorCode?: string) => {
                // Update transaction state
                const failedState: TransactionState = {
                  ...submittedState,
                  status: 'failed',
                  error,
                  errorCode,
                  endTime: Date.now()
                }
                
                // Track in wallet analytics
                confirmationTracker.failure(error, errorCode)
                
                // Track in Plurality analytics if we have session data
                if (pluralityData?.sessionId && pluralityData?.userId) {
                  pluralityAnalytics.trackTransactionInitiated(
                    pluralityData.sessionId,
                    pluralityData.userId,
                    address,
                    transactionType,
                    { amount, asset, chainId }
                  ).failed(error, errorCode, { transactionHash })
                }
                
                return failedState
              }
            }
          }
        }
      },
      
      // Handle transaction failure before submission
      failed: (error: string, errorCode?: string) => {
        // Update transaction state
        const failedState: TransactionState = {
          ...transactionState,
          status: 'failed',
          error,
          errorCode,
          endTime: Date.now()
        }
        
        // Track in wallet analytics
        tracker.failure(error, errorCode)
        
        // Track in Plurality analytics if we have session data
        if (pluralityData?.sessionId && pluralityData?.userId) {
          pluralityAnalytics.trackTransactionInitiated(
            pluralityData.sessionId,
            pluralityData.userId,
            address,
            transactionType,
            { amount, asset, chainId }
          ).failed(error, errorCode)
        }
        
        return failedState
      }
    }
  }, [pluralityAnalytics, walletAnalytics])
  
  // Return transaction tracker API
  return {
    initiateTransaction,
    // Analytics hooks for direct access
    walletAnalytics,
    pluralityAnalytics
  }
}

