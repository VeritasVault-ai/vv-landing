/**
 * Server-side analytics logging functions
 * These functions run on the server to log analytics events with sensitive data like IP addresses
 */

interface AnalyticsEvent {
  event_type: string
  page: string
  ip_address: string
  user_agent: string
  timestamp: string
  [key: string]: any // Allow additional properties
}

/**
 * Logs an analytics event to the server, including IP address information
 * This function runs server-side to ensure sensitive data like IP addresses are handled securely
 * 
 * @param event The analytics event to log
 */
export async function logAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  try {
    // Log the event to the console during development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event:', {
        ...event,
        ip_address: event.ip_address.includes(',') 
          ? event.ip_address.split(',')[0].trim() // Get the first IP if multiple are provided
          : event.ip_address
      })
    }

    // In production, you would typically send this to your analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to an analytics API endpoint
      // This could be your own API or a third-party service
      try {
        const response = await fetch(process.env.ANALYTICS_API_ENDPOINT || '/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY || ''}`
          },
          body: JSON.stringify(event),
          // Set a reasonable timeout
          cache: 'no-store'
        })

        if (!response.ok) {
          console.error('Failed to log analytics event:', await response.text())
        }
      } catch (error) {
        // Don't let analytics errors affect the application
        console.error('Error logging analytics event:', error)
      }
    }
  } catch (error) {
    // Ensure analytics errors don't crash the application
    console.error('Unexpected error in analytics logging:', error)
  }
}