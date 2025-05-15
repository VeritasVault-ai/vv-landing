"use client"

import { track } from '@vercel/analytics'

type LoginEventType = 
  | 'page_view'
  | 'login_attempt'
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'signup_attempt'
  | 'signup_success'
  | 'signup_failure'
  | 'password_reset_request'
  | 'password_reset_success'

interface LoginEventProperties {
  flag?: string
  method?: string
  returnUrl?: string
  error?: string
  email_domain?: string
  [key: string]: any
}

/**
 * Tracks authentication-related events using Vercel Web Analytics
 * Includes support for login flags to track different login sources
 * 
 * @param eventType The type of login event
 * @param properties Additional properties to include with the event
 */
export function trackLoginEvent(eventType: LoginEventType, properties: LoginEventProperties = {}) {
  try {
    // Create the event name with proper formatting for Vercel Analytics
    const eventName = `auth_${eventType}`;
    
    // Add timestamp to properties
    const enrichedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Auth Analytics] ${eventName}:`, enrichedProperties);
    }
    
    // Send to Vercel Web Analytics
    track(eventName, enrichedProperties);
    
    // If this is a login_success event, set user properties
    if (eventType === 'login_success' && properties.email_domain) {
      // Note: Vercel Analytics doesn't have built-in user properties like some other
      // analytics platforms, but we can track this as a separate event if needed
      track('auth_user_identified', {
        email_domain: properties.email_domain,
        login_method: properties.method || 'unknown'
      });
    }
  } catch (error) {
    // Don't let analytics errors affect the application
    console.error('Error tracking login event:', error);
  }
}

/**
 * Tracks a login page view with the specified flag
 * 
 * @param flag The login flag to track
 * @param returnUrl The URL to return to after login
 */
export function trackLoginPageView(flag: string, returnUrl?: string) {
  trackLoginEvent('page_view', { flag, returnUrl });
}

/**
 * Tracks a login attempt with the specified flag and method
 * 
 * @param flag The login flag to track
 * @param method The login method (credentials, github, google, etc.)
 * @param emailDomain The domain of the email address used for login
 */
export function trackLoginAttempt(flag: string, method: string, emailDomain?: string) {
  trackLoginEvent('login_attempt', { flag, method, email_domain: emailDomain });
}

/**
 * Tracks a successful login with the specified flag and method
 * 
 * @param flag The login flag to track
 * @param method The login method (credentials, github, google, etc.)
 * @param emailDomain The domain of the email address used for login
 */
export function trackLoginSuccess(flag: string, method: string, emailDomain?: string) {
  trackLoginEvent('login_success', { flag, method, email_domain: emailDomain });
}

/**
 * Tracks a failed login with the specified flag, method, and error
 * 
 * @param flag The login flag to track
 * @param method The login method (credentials, github, google, etc.)
 * @param error The error message
 */
export function trackLoginFailure(flag: string, method: string, error: string) {
  trackLoginEvent('login_failure', { flag, method, error });
}