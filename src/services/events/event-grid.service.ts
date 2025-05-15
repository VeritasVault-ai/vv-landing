import type {
  EventGridEvent,
  EventGridSubscription,
  EventGridTopic,
  EventGridFilter,
  EventHandlerConfig,
} from "@/types/event-grid"

class EventGridService {
  private apiKey: string | null
  private eventHandlers: Map<string, EventHandlerConfig[]>
  private eventCache: Map<string, EventGridEvent[]>
  private maxCacheSize: number
  
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_AZURE_EVENT_GRID_KEY || null
    this.eventHandlers = new Map()
    this.eventCache = new Map()
    this.maxCacheSize = 100 // Maximum number of events to cache per topic
  }
  
  /**
   * Subscribe to an Event Grid topic
   */
  async subscribeToTopic(
    topicName: string,
    endpoint: string,
    filters?: EventGridFilter[],
  ): Promise<EventGridSubscription> {
    try {
      // In a real implementation, this would make an API call to Azure to create a subscription
      // For this demo, we'll simulate the subscription process
      const subscriptionId = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      
      const subscription: EventGridSubscription = {
        id: subscriptionId,
        topicName,
        endpoint,
        filters: filters || [],
        status: "active",
        createdAt: new Date().toISOString(),
      }
      
      console.log(`Subscribed to Event Grid topic: ${topicName}`, subscription)
      return subscription
    } catch (error) {
      console.error("Error subscribing to Event Grid topic:", error)
      throw new Error(
        `Failed to subscribe to Event Grid topic: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
  
  /**
   * Unsubscribe from an Event Grid topic
   */
  async unsubscribeFromTopic(subscriptionId: string): Promise<boolean> {
    try {
      // In a real implementation, this would make an API call to Azure to delete a subscription
      // For this demo, we'll simulate the unsubscription process
      console.log(`Unsubscribed from Event Grid subscription: ${subscriptionId}`)
      return true
    } catch (error) {
      console.error("Error unsubscribing from Event Grid topic:", error)
      throw new Error(
        `Failed to unsubscribe from Event Grid topic: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
  
  /**
   * Process an incoming Event Grid event
   */
  processEvent(event: EventGridEvent): void {
    try {
      // Cache the event
      this.cacheEvent(event.topic, event)
      
      // Process the event with registered handlers
      const handlers = this.eventHandlers.get(event.topic) || []
      const matchingHandlers = handlers.filter((handler) => this.eventMatchesFilter(event, handler.filter))
      
      matchingHandlers.forEach((handler) => {
        try {
          handler.callback(event)
        } catch (handlerError) {
          console.error(`Error in event handler for topic ${event.topic}:`, handlerError)
        }
      })
    } catch (error) {
      console.error("Error processing Event Grid event:", error)
    }
  }
  
  /**
   * Register an event handler for a specific topic
   */
  registerEventHandler(topic: string, callback: (event: EventGridEvent) => void, filter?: EventGridFilter): string {
    const handlerId = `handler-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const handlers = this.eventHandlers.get(topic) || []
    
    handlers.push({
      id: handlerId,
      callback,
      filter,
    })
    
    this.eventHandlers.set(topic, handlers)
    return handlerId
  }
  
  /**
   * Unregister an event handler
   */
  unregisterEventHandler(topic: string, handlerId: string): boolean {
    const handlers = this.eventHandlers.get(topic) || []
    const filteredHandlers = handlers.filter((handler) => handler.id !== handlerId)
    
    if (filteredHandlers.length !== handlers.length) {
      this.eventHandlers.set(topic, filteredHandlers)
      return true
    }
    
    return false
  }
  
  /**
   * Get cached events for a topic
   */
  getCachedEvents(topic: string): EventGridEvent[] {
    return this.eventCache.get(topic) || []
  }
  
  /**
   * Clear cached events for a topic
   */
  clearCachedEvents(topic: string): void {
    this.eventCache.delete(topic)
  }
  
  /**
   * Validate an Event Grid webhook request
   * This is used to validate subscription handshake
   */
  validateWebhookRequest(request: { headers: Record<string, string>; body: any }): {
    isValid: boolean
    response?: any
  } {
    // Check if this is a validation request
    if (
      request.body &&
      Array.isArray(request.body) &&
      request.body.length > 0 &&
      request.body[0].eventType === "Microsoft.EventGrid.SubscriptionValidationEvent"
    ) {
      const validationEvent = request.body[0]
      const validationCode = validationEvent.data?.validationCode
      
      if (validationCode) {
        // Return the validation response
        return {
          isValid: true,
          response: {
            validationResponse: validationCode,
          },
        }
      }
    }
    
    // For non-validation requests, check for the aeg-subscription-name header
    const subscriptionName = request.headers["aeg-subscription-name"]
    if (!subscriptionName) {
      return { isValid: false }
    }
    
    return { isValid: true }
  }
  
  /**
   * List available Event Grid topics
   */
  async listTopics(): Promise<EventGridTopic[]> {
    try {
      // In a real implementation, this would make an API call to Azure to list topics
      // For this demo, we'll return some sample topics
      return [
        {
          id: "blockchain-events",
          name: "Blockchain Events",
          description: "Events from blockchain networks including transactions and block confirmations",
          region: "eastus",
        },
        {
          id: "defi-protocol-events",
          name: "DeFi Protocol Events",
          description: "Events from DeFi protocols including swaps, liquidity changes, and governance actions",
          region: "westeurope",
        },
        {
          id: "market-data-events",
          name: "Market Data Events",
          description: "Events for significant market data changes including price movements and volume spikes",
          region: "eastus2",
        },
        {
          id: "security-alerts",
          name: "Security Alerts",
          description: "Security-related events and alerts for blockchain networks and protocols",
          region: "westus2",
        },
      ]
    } catch (error) {
      console.error("Error listing Event Grid topics:", error)
      throw new Error(`Failed to list Event Grid topics: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Private helper methods
  private cacheEvent(topic: string, event: EventGridEvent): void {
    const events = this.eventCache.get(topic) || []
    
    // Add the new event
    events.unshift(event)
    
    // Trim the cache if it exceeds the maximum size
    if (events.length > this.maxCacheSize) {
      events.length = this.maxCacheSize
    }
    
    this.eventCache.set(topic, events)
  }
  
  private eventMatchesFilter(event: EventGridEvent, filter?: EventGridFilter): boolean {
    if (!filter) {
      return true
    }
    
    // Check event type filter
    if (filter.eventType && event.eventType !== filter.eventType) {
      return false
    }
    
    // Check subject filter (prefix match)
    if (filter.subjectBeginsWith && !event.subject.startsWith(filter.subjectBeginsWith)) {
      return false
    }
    
    // Check subject filter (suffix match)
    if (filter.subjectEndsWith && !event.subject.endsWith(filter.subjectEndsWith)) {
      return false
    }
    
    // Check data filter if specified
    if (filter.dataFilter) {
      const { key, value } = filter.dataFilter
      
      // Navigate to the nested property using the key path
      const keyParts = key.split(".")
      let dataValue: any = event.data
      
      for (const part of keyParts) {
        if (dataValue === undefined || dataValue === null) {
          return false
        }
        dataValue = dataValue[part]
      }
      
      // Check if the value matches
      if (dataValue !== value) {
        return false
      }
    }
    
    return true
  }
}

export const eventGridService = new EventGridService()