"use client"

import { useCallback } from "react"

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
}

export function useAnalytics() {
  /**
   * Track an event using available analytics providers
   */
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Track with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        non_interaction: event.nonInteraction,
        ...Object.fromEntries(
          Object.entries(event).filter(([key]) => 
            !['action', 'category', 'label', 'value', 'nonInteraction'].includes(key)
          )
        )
      });
    }
    
    // Track with any other analytics providers here
    // For example, Mixpanel, Segment, etc.
    
    // Log events in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }, []);
  
  /**
   * Track a page view
   */
  const trackPageView = useCallback((url: string, title?: string) => {
    // Track with Google Analytics if available
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (typeof window !== 'undefined' && window.gtag && gaId) {
      window.gtag('config', gaId, {
        page_path: url,
        page_title: title
      });
    }
    
    // Log page views in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Page View:', { url, title });
    }
  }, []);
  
  return { trackEvent, trackPageView };
}

// Add type definition for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}