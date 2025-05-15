"use client"

import { useCallback, useEffect, useState } from "react"
import { eventGridService } from "@/services/events/event-grid.service"
import type { EventGridEvent, EventGridSubscription, EventGridTopic, EventGridFilter } from "@/types/event-grid"

/**
 * Hook for subscribing to Event Grid topics
 */
export const useEventGridSubscription = (topicName: string, endpoint: string, filters?: EventGridFilter[]) => {
  const [subscription, setSubscription] = useState<EventGridSubscription | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  
  const subscribe = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const newSubscription = await eventGridService.subscribeToTopic(topicName, endpoint, filters)
      setSubscription(newSubscription)
      return newSubscription
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to subscribe to Event Grid topic"))
      console.error("Error subscribing to Event Grid topic:", err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [topicName, endpoint, filters])
  
  const unsubscribe = useCallback(async () => {
    if (!subscription) return false
    
    try {
      setIsLoading(true)
      setError(null)
      const result = await eventGridService.unsubscribeFromTopic(subscription.id)
      
      if (result) {
        setSubscription(null)
      }
      
      return result
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to unsubscribe from Event Grid topic"))
      console.error("Error unsubscribing from Event Grid topic:", err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [subscription])
  
  return { subscription, isLoading, error, subscribe, unsubscribe }
}

/**
 * Hook for listing available Event Grid topics
 */
export const useEventGridTopics = () => {
  const [topics, setTopics] = useState<EventGridTopic[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchTopics = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const topicsList = await eventGridService.listTopics()
      setTopics(topicsList)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch Event Grid topics"))
      console.error("Error fetching Event Grid topics:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])
  
  return { topics, isLoading, error, refetch: fetchTopics }
}

/**
 * Hook for listening to Event Grid events
 */
export const useEventGridEvents = (topic: string, filter?: EventGridFilter, initialEvents: EventGridEvent[] = []) => {
  const [events, setEvents] = useState<EventGridEvent[]>(initialEvents)
  const [isListening, setIsListening] = useState<boolean>(false)
  const [handlerId, setHandlerId] = useState<string | null>(null)
  
  // Start listening for events
  const startListening = useCallback(() => {
    if (isListening) return
    
    // Register event handler
    const id = eventGridService.registerEventHandler(
      topic,
      (event) => {
        setEvents((prevEvents) => [event, ...prevEvents])
      },
      filter,
    )
    
    setHandlerId(id)
    setIsListening(true)
    
    // Load cached events
    const cachedEvents = eventGridService.getCachedEvents(topic)
    if (cachedEvents.length > 0) {
      setEvents(cachedEvents)
    }
  }, [topic, filter, isListening])
  
  // Stop listening for events
  const stopListening = useCallback(() => {
    if (!isListening || !handlerId) return
    
    eventGridService.unregisterEventHandler(topic, handlerId)
    setHandlerId(null)
    setIsListening(false)
  }, [topic, handlerId, isListening])
  
  // Clear events
  const clearEvents = useCallback(() => {
    setEvents([])
    eventGridService.clearCachedEvents(topic)
  }, [topic])
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isListening && handlerId) {
        eventGridService.unregisterEventHandler(topic, handlerId)
      }
    }
  }, [topic, handlerId, isListening])
  
  return { events, isListening, startListening, stopListening, clearEvents }
}