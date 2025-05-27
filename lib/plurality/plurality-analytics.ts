"use client"

import { useAnalytics, AnalyticsEvent } from "@/hooks/use-analytics"

// Define Plurality event types
export enum PluralityEventType {
  SESSION_CREATED = 'plurality_session_created',
  SESSION_EXPIRED = 'plurality_session_expired',
  AUTHENTICATION_SUCCESS = 'plurality_authentication_success',
  AUTHENTICATION_FAILURE = 'plurality_authentication_failure',
  WALLET_CONNECTED = 'plurality_wallet_connected',
  WALLET_DISCONNECTED = 'plurality_wallet_disconnected',
  TRANSACTION_INITIATED = 'plurality_transaction_initiated',
  TRANSACTION_COMPLETED = 'plurality_transaction_completed',
  TRANSACTION_FAILED = 'plurality_transaction_failed',
  GOVERNANCE_VOTE_CAST = 'plurality_governance_vote_cast',
}

// Define Plurality event data
export interface PluralityEventData {
  sessionId?: string;
  userId?: string;
  walletAddress?: string;
  walletType?: string;
  chainId?: number;
  transactionHash?: string;
  transactionType?: string;
  error?: string;
  errorCode?: string;
  duration?: number;
  [key: string]: any;
}

/**
 * Track Plurality-related events
 */
export function trackPluralityEvent(
  eventType: PluralityEventType,
  data: PluralityEventData
) {
  const { trackEvent } = useAnalytics();
  
  const event: AnalyticsEvent = {
    action: eventType,
    category: 'plurality',
    label: data.transactionType || data.walletType || 'session',
    ...data,
  };
  
  trackEvent(event);
  
  // Log events in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('Plurality Event:', { eventType, ...data });
  }
}

/**
 * Hook for tracking Plurality-related analytics events
 */
export function usePluralityAnalytics() {
  const { trackEvent } = useAnalytics();
  
  /**
   * Track a Plurality session creation
   */
  const trackSessionCreated = (sessionId: string, userId?: string, metadata?: any) => {
    trackEvent({
      action: PluralityEventType.SESSION_CREATED,
      category: 'plurality',
      label: 'session',
      sessionId,
      userId,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality session expiration
   */
  const trackSessionExpired = (sessionId: string, userId?: string, metadata?: any) => {
    trackEvent({
      action: PluralityEventType.SESSION_EXPIRED,
      category: 'plurality',
      label: 'session',
      sessionId,
      userId,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality authentication success
   */
  const trackAuthenticationSuccess = (sessionId: string, userId: string, walletAddress: string, metadata?: any) => {
    trackEvent({
      action: PluralityEventType.AUTHENTICATION_SUCCESS,
      category: 'plurality',
      label: 'authentication',
      sessionId,
      userId,
      walletAddress,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality authentication failure
   */
  const trackAuthenticationFailure = (sessionId: string, error: string, errorCode?: string, metadata?: any) => {
    trackEvent({
      action: PluralityEventType.AUTHENTICATION_FAILURE,
      category: 'plurality',
      label: 'authentication',
      sessionId,
      error,
      errorCode,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality wallet connection
   */
  const trackWalletConnected = (
    sessionId: string, 
    userId: string, 
    walletAddress: string, 
    walletType: string,
    chainId: number,
    metadata?: any
  ) => {
    trackEvent({
      action: PluralityEventType.WALLET_CONNECTED,
      category: 'plurality',
      label: walletType,
      sessionId,
      userId,
      walletAddress,
      walletType,
      chainId,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality wallet disconnection
   */
  const trackWalletDisconnected = (
    sessionId: string, 
    userId: string, 
    walletAddress: string,
    walletType: string,
    metadata?: any
  ) => {
    trackEvent({
      action: PluralityEventType.WALLET_DISCONNECTED,
      category: 'plurality',
      label: walletType,
      sessionId,
      userId,
      walletAddress,
      walletType,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  /**
   * Track a Plurality transaction initiation
   */
  const trackTransactionInitiated = (
    sessionId: string,
    userId: string,
    walletAddress: string,
    transactionType: string,
    metadata?: any
  ) => {
    const startTime = Date.now();
    
    trackEvent({
      action: PluralityEventType.TRANSACTION_INITIATED,
      category: 'plurality',
      label: transactionType,
      sessionId,
      userId,
      walletAddress,
      transactionType,
      timestamp: startTime,
      ...metadata,
    });
    
    return {
      completed: (transactionHash: string, additionalData?: any) => {
        trackEvent({
          action: PluralityEventType.TRANSACTION_COMPLETED,
          category: 'plurality',
          label: transactionType,
          sessionId,
          userId,
          walletAddress,
          transactionType,
          transactionHash,
          duration: Date.now() - startTime,
          timestamp: Date.now(),
          ...metadata,
          ...additionalData,
        });
      },
      failed: (error: string, errorCode?: string, additionalData?: any) => {
        trackEvent({
          action: PluralityEventType.TRANSACTION_FAILED,
          category: 'plurality',
          label: transactionType,
          sessionId,
          userId,
          walletAddress,
          transactionType,
          error,
          errorCode,
          duration: Date.now() - startTime,
          timestamp: Date.now(),
          ...metadata,
          ...additionalData,
        });
      }
    };
  };
  
  /**
   * Track a Plurality governance vote
   */
  const trackGovernanceVote = (
    sessionId: string,
    userId: string,
    walletAddress: string,
    proposalId: string,
    vote: string,
    metadata?: any
  ) => {
    trackEvent({
      action: PluralityEventType.GOVERNANCE_VOTE_CAST,
      category: 'plurality',
      label: 'governance',
      sessionId,
      userId,
      walletAddress,
      proposalId,
      vote,
      timestamp: Date.now(),
      ...metadata,
    });
  };
  
  return {
    trackSessionCreated,
    trackSessionExpired,
    trackAuthenticationSuccess,
    trackAuthenticationFailure,
    trackWalletConnected,
    trackWalletDisconnected,
    trackTransactionInitiated,
    trackGovernanceVote,
    PluralityEventType,
  };
}

