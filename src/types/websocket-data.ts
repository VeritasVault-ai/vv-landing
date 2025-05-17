/**
 * Types for WebSocket data and status
 */

export enum WebSocketStatus {
  CONNECTING = 'connecting',
  OPEN = 'open',
  CLOSED = 'closed',
  ERROR = 'error',
  SIMULATED = 'simulated'
}

export interface WebSocketMessage<T> {
  type: string;
  data: T;
  timestamp: string;
}

export interface WebSocketOptions {
  reconnectOnClose?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}