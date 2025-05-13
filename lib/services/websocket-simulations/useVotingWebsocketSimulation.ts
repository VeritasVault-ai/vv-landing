import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

export function useVotingWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  const [data, setData] = useState(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Create new WebSocket connection
      const ws = new WebSocket('wss://your-api.com/voting');
      wsRef.current = ws;
      
      ws.onopen = () => {
        onStatusChange?.('connected');
      };
      
      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      ws.onclose = (event) => {
        // Don't report error for normal closure
        if (event.code !== 1000) {
          onStatusChange?.('disconnected');
          
          // Auto-reconnect after delay
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 5000);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onStatusChange?.('error');

        // Force closure so the `onclose` handler handles reconnection logic
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      };
      
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      onStatusChange?.('error');
      
      // Auto-reconnect after delay
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 5000);
    }
  }, [onStatusChange]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    // Clear any pending reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    connect();
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    connect();
    
    // Clean up on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { data, reconnect };
}