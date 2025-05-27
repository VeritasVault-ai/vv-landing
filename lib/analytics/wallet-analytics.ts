"use client"

import { useAnalytics, AnalyticsEvent } from "@/hooks/use-analytics"

// Define wallet connection event types
export enum WalletConnectionEventType {
  CONNECT_ATTEMPT = 'wallet_connect_attempt',
  CONNECT_SUCCESS = 'wallet_connect_success',
  CONNECT_FAILURE = 'wallet_connect_failure',
  DISCONNECT = 'wallet_disconnect',
  ACCOUNT_CHANGED = 'wallet_account_changed',
  NETWORK_CHANGED = 'wallet_network_changed',
}

// Define transaction event types
export enum WalletTransactionEventType {
  TRANSACTION_INITIATED = 'transaction_initiated',
  TRANSACTION_SIGNED = 'transaction_signed',
  TRANSACTION_SUBMITTED = 'transaction_submitted',
  TRANSACTION_SUCCESS = 'transaction_success',
  TRANSACTION_FAILURE = 'transaction_failure',
}

// Define wallet types
export enum WalletType {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'wallet_connect',
  COINBASE = 'coinbase',
  OTHER = 'other',
}

// Define wallet connection event data
export interface WalletConnectionEventData {
  walletType: WalletType;
  address?: string;
  chainId?: number;
  error?: string;
  errorCode?: string;
  duration?: number; // Time taken to connect in ms
  plurality?: {
    sessionId?: string;
    userId?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Define transaction event data
export interface WalletTransactionEventData {
  walletType: WalletType;
  address: string;
  chainId: number;
  transactionHash?: string;
  transactionType: 'deposit' | 'withdrawal' | 'governance' | 'other';
  amount?: string;
  asset?: string;
  error?: string;
  errorCode?: string;
  gasUsed?: string;
  gasPrice?: string;
  plurality?: {
    sessionId?: string;
    userId?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Track wallet connection events
 */
export function trackWalletConnectionEvent(
  eventType: WalletConnectionEventType,
  data: WalletConnectionEventData
) {
  const { trackEvent } = useAnalytics();
  
  const event: AnalyticsEvent = {
    action: eventType,
    category: 'wallet_connection',
    label: data.walletType,
    ...data,
  };
  
  trackEvent(event);
  
  // Log events in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('Wallet Connection Event:', { eventType, ...data });
  }
}

/**
 * Track wallet transaction events
 */
export function trackWalletTransactionEvent(
  eventType: WalletTransactionEventType,
  data: WalletTransactionEventData
) {
  const { trackEvent } = useAnalytics();
  
  const event: AnalyticsEvent = {
    action: eventType,
    category: 'wallet_transaction',
    label: data.transactionType,
    ...data,
  };
  
  trackEvent(event);
  
  // Log events in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('Wallet Transaction Event:', { eventType, ...data });
  }
}

