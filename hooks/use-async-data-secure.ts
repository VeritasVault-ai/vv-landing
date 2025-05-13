"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { ApiError } from '@/lib/services/base-service-secure'

interface AsyncDataState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  isRefreshing: boolean
  lastUpdated: Date | null
}

interface UseAsyncDataOptions {
  onError?: (error: Error) => void
  onSuccess?: (data: any) => void
  refreshInterval?: number | null // Auto-refresh interval in milliseconds
  skipInitialFetch?: boolean // Skip the initial fetch on mount
  dependencies?: any[] // Additional dependencies for refetch trigger
}

/**
 * Sanitize error messages to prevent leaking sensitive information
 */
function sanitizeErrorMessage(message: string): string {
  if (!message) return message;
  
  // Remove potential API keys, tokens, or credentials from error messages
  return message.replace(
    /(api[_-]?key|token|key|secret|password|credential|auth)[=:]\s*["']?\w+["']?/gi,
    '$1=[REDACTED]'
  );
}

/**
 * Security-enhanced custom hook for handling async data fetching
 * with consistent loading and error states
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  options: UseAsyncDataOptions = {},
  initialData: T | null = null
) {
  const { 
    onError, 
    onSuccess, 
    refreshInterval = null, 
    skipInitialFetch = false,
    dependencies = [] 
  } = options;
  
  const [state, setState] = useState<AsyncDataState<T>>({
    data: initialData,
    isLoading: !skipInitialFetch,
    error: null,
    isRefreshing: false,
    lastUpdated: null
  });

  // Use refs for callbacks to avoid dependency issues
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);
  
  // Update refs when callbacks change
  useEffect(() => {
    onErrorRef.current = onError;
    onSuccessRef.current = onSuccess;
  }, [onError, onSuccess]);

  // Track if the component is mounted
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async (showRefreshState = false) => {
    try {
      if (!isMountedRef.current) return null;
      
      if (showRefreshState) {
        setState(prev => ({ ...prev, isRefreshing: true, error: null }));
      } else {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
      }

      const result = await fetchFn();
      
      if (!isMountedRef.current) return null;
      
      setState({
        data: result,
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastUpdated: new Date()
      });
      
      // Call onSuccess callback if provided
      if (onSuccessRef.current) {
        onSuccessRef.current(result);
      }
      
      return result;
    } catch (err) {
      if (!isMountedRef.current) return null;
      
      // Sanitize and handle error
      let errorMessage = 'An unknown error occurred';
      
      if (err instanceof ApiError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = sanitizeErrorMessage(err.message);
      }
      
      console.error('Error fetching data:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: errorMessage,
        lastUpdated: prev.lastUpdated // Keep the last successful update timestamp
      }));
      
      // Call onError callback if provided
      if (onErrorRef.current && err instanceof Error) {
        onErrorRef.current(err);
      }
      
      return null;
    }
  }, [fetchFn]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Handle initial fetch and dependency-triggered fetches
  useEffect(() => {
    if (!skipInitialFetch) {
      fetchData();
    }
  }, [...dependencies, fetchFn]);

  // Set up auto-refresh interval if specified
  useEffect(() => {
    if (!refreshInterval) return;
    
    const intervalId = setInterval(() => {
      fetchData(true);
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval, fetchData]);

  return {
    ...state,
    refresh,
    // Add additional utility methods
    clearError: useCallback(() => {
      setState(prev => ({ ...prev, error: null }));
    }, []),
    setData: useCallback((updater: (prevData: T | null) => T) => {
      setState(prev => ({ 
        ...prev, 
        data: updater(prev.data),
        lastUpdated: new Date()
      }));
    }, [])
  };
}