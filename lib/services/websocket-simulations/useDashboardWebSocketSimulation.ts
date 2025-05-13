import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

export function useDashboardWebSocketSimulation(
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
      const ws = new WebSocket('wss://your-api.com/dashboard');
      wsRef.current = ws;
      
      ws.onopen = () => {
        onStatusChange?.('connected');

        // Cancel any pending auto-reconnect
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }

        // For simulation, send initial data
        setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.dispatchEvent(new MessageEvent('message', {
              data: JSON.stringify({
                activeUsers: 128,
                systemStatus: 'healthy',
                recentTransactions: 24,
                performanceMetrics: {
                  cpu: 42,
                  memory: 68,
                  latency: 230
                },
                lastUpdated: new Date().toISOString()
              })
            }));
          }
        }, 1000);
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
    
    // Simulate periodic data updates
    const updateInterval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.dispatchEvent(new MessageEvent('message', {
          data: JSON.stringify({
            activeUsers: 120 + Math.floor(Math.random() * 20),
            systemStatus: Math.random() > 0.95 ? 'warning' : 'healthy',
            recentTransactions: Math.floor(Math.random() * 30),
            performanceMetrics: {
              cpu: 40 + Math.floor(Math.random() * 15),
              memory: 60 + Math.floor(Math.random() * 20),
              latency: 200 + Math.floor(Math.random() * 100)
            },
            lastUpdated: new Date().toISOString()
          })
        }));
      }
    }, 10000); // Update every 10 seconds
    
    // Clean up on unmount
    return () => {
      clearInterval(updateInterval);
      
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