/**
 * Common WebSocket status and infrastructure types
 * These types are used across all WebSocket connections regardless of domain
 */

// Common WebSocket status type
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

// Track status for each individual WebSocket
export interface WebSocketState {
  voting: WebSocketStatus;
  model: WebSocketStatus;
  dashboard: WebSocketStatus;
  allocation: WebSocketStatus;
}

// Simulation state for each data source
export interface SimulationState {
  voting: boolean;
  model: boolean;
  dashboard: boolean;
  allocation: boolean;
  any: boolean; // True if any data source is simulated
}

// Base interface for all WebSocket data payloads
export interface BaseWebSocketData {
  status: string;
  timestamp?: string;
}