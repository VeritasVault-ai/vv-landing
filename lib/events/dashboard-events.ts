import { DashboardOverview, DashboardPerformance, Holding, AssetPerformance } from "@/lib/repositories/dashboard-repository";

// Define event types
export type DashboardEventType = 
  | 'portfolio-value-updated'
  | 'risk-score-changed'
  | 'holdings-updated'
  | 'performance-data-updated'
  | 'asset-performance-changed';

// Define event payload types
export type DashboardEventPayload = {
  'portfolio-value-updated': {
    portfolioValue: number;
    percentageChange: number;
    lastUpdated: string;
  };
  'risk-score-changed': {
    level: string;
    status: string;
    description: string;
  };
  'holdings-updated': {
    holdings: Holding[];
    assetAllocation: { name: string; value: number }[];
  };
  'performance-data-updated': {
    historicalPerformance: DashboardPerformance['historicalPerformance'];
  };
  'asset-performance-changed': {
    topPerformers: AssetPerformance[];
    underperformers: AssetPerformance[];
  };
};

// Define event listener type
export type DashboardEventListener<T extends DashboardEventType> = (
  payload: DashboardEventPayload[T]
) => void;

/**
 * Dashboard event emitter for real-time updates across components
 */
class DashboardEventEmitter {
  private listeners: {
    [K in DashboardEventType]?: DashboardEventListener<K>[];
  } = {};

  /**
   * Subscribe to a dashboard event
   */
  subscribe<T extends DashboardEventType>(
    eventType: T,
    listener: DashboardEventListener<T>
  ): () => void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    
    // Add the listener
    (this.listeners[eventType] as DashboardEventListener<T>[]).push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners[eventType] = (this.listeners[eventType] as DashboardEventListener<T>[])
        .filter(l => l !== listener);
    };
  }

  /**
   * Emit a dashboard event to all subscribers
   */
  emit<T extends DashboardEventType>(
    eventType: T,
    payload: DashboardEventPayload[T]
  ): void {
    if (!this.listeners[eventType]) {
      return;
    }
    
    (this.listeners[eventType] as DashboardEventListener<T>[]).forEach(listener => {
      listener(payload);
    });
  }
}

// Export a singleton instance
export const dashboardEvents = new DashboardEventEmitter();