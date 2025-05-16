"use client"

/**
 * Enhanced client-side analytics with IP tracking
 * This module extends the basic client analytics with IP information
 */

interface EnhancedAnalyticsEvent {
  event_type: string
  page?: string
  component?: string
  action?: string
  value?: string | number
  metadata?: Record<string, any>
}

/**
 * Tracks an event with enhanced analytics including IP information
 * This function sends the event to our server-side API which logs the IP address
 * 
 * @param event The analytics event to track
 */
export async function trackEnhancedEvent(event: EnhancedAnalyticsEvent): Promise<void> {
  try {
    // Get the current page URL
    const currentPage = window.location.pathname
    
    // Create the full event object
    const fullEvent = {
      ...event,
      page: event.page || currentPage,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
      // The IP will be captured server-side
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Enhanced analytics event:', fullEvent)
    }
    
    // Send to our server-side API endpoint
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullEvent),
      // Don't cache analytics requests
      cache: 'no-store'
    })
    
    if (!response.ok) {
      // If we get an auth error, log it specifically
      if (response.status === 401) {
        console.error('Authentication denied for analytics API. Check API keys.')
        
        // Try to get more information about the auth failure
        const errorData = await response.json().catch(() => ({ error: 'Unknown auth error' }))
        console.error('Auth error details:', errorData)
      } else {
        console.error('Failed to send enhanced analytics event:', await response.text())
      }
    }
  } catch (error) {
    // Don't let analytics errors affect the application
    console.error('Error sending enhanced analytics event:', error)
  }
}

/**
 * Tracks a page view with enhanced analytics
 * Automatically captures the current page and sends it to the analytics API
 */
export function trackPageView(): void {
  trackEnhancedEvent({
    event_type: 'page_view',
    page: window.location.pathname,
  })
}

/**
 * Tracks a user interaction with enhanced analytics
 * 
 * @param component The component where the interaction occurred
 * @param action The action that was performed
 * @param value Optional value associated with the action
 * @param metadata Optional additional data
 */
export function trackInteraction(
  component: string,
  action: string,
  value?: string | number,
  metadata?: Record<string, any>
): void {
  trackEnhancedEvent({
    event_type: 'interaction',
    component,
    action,
    value: value?.toString(),
    metadata
  })
}

/**
 * Tracks an error with enhanced analytics
 * 
 * @param errorType The type of error
 * @param errorMessage The error message
 * @param component Optional component where the error occurred
 * @param metadata Optional additional data
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  component?: string,
  metadata?: Record<string, any>
): void {
  trackEnhancedEvent({
    event_type: 'error',
    component,
    action: errorType,
    value: errorMessage,
    metadata
  })
}

/**
 * Tracks authentication events with enhanced analytics
 * 
 * @param status The authentication status (success, failure, etc.)
 * @param method The authentication method used
 * @param metadata Optional additional data
 */
export function trackAuth(
  status: 'success' | 'failure' | 'attempt' | 'logout',
  method: string,
  metadata?: Record<string, any>
): void {
  trackEnhancedEvent({
    event_type: 'auth',
    action: status,
    value: method,
    metadata
  })
}