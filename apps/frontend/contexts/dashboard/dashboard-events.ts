import { 
  PortfolioValueUpdatedEvent, 
  RiskScoreChangedEvent, 
  PerformanceDataUpdatedEvent, 
  AssetPerformanceChangedEvent 
} from './types';

type EventMap = {
  'portfolio-value-updated': PortfolioValueUpdatedEvent;
  'risk-score-changed': RiskScoreChangedEvent;
  'performance-data-updated': PerformanceDataUpdatedEvent;
  'asset-performance-changed': AssetPerformanceChangedEvent;
};

type EventCallback<T extends keyof EventMap> = (data: EventMap[T]) => void;

/**
 * Simple event system for dashboard updates
 */
class DashboardEvents {
  private listeners: {
    [K in keyof EventMap]?: Array<EventCallback<K>>;
  } = {};

  /**
   * Subscribe to a dashboard event
   * @param eventName The event to subscribe to
   * @param callback Function to call when event occurs
   * @returns Unsubscribe function
   */
  subscribe<T extends keyof EventMap>(
    eventName: T,
    callback: EventCallback<T>
  ): () => void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    
    // Add the callback to listeners
    (this.listeners[eventName] as EventCallback<T>[]).push(callback);
    
    // Return unsubscribe function
    return () => {
      if (this.listeners[eventName]) {
        this.listeners[eventName] = (this.listeners[eventName] as EventCallback<T>[])
          .filter(cb => cb !== callback);
      }
    };
  }

  /**
   * Emit an event with data
   * @param eventName The event to emit
   * @param data Data to pass to subscribers
   */
  emit<T extends keyof EventMap>(eventName: T, data: EventMap[T]): void {
    if (this.listeners[eventName]) {
      (this.listeners[eventName] as EventCallback<T>[]).forEach(callback => {
        callback(data);
      });
    }
  }
}

// Export singleton instance
export const dashboardEvents = new DashboardEvents();