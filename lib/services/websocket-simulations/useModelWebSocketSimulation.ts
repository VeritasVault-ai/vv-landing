import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

export function useModelWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  const [data, setData] = useState(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const simulationRunningRef = useRef<boolean>(false);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Create new WebSocket connection
      const ws = new WebSocket('wss://your-api.com/model');
      wsRef.current = ws;
      
      ws.onopen = () => {
        onStatusChange?.('connected');
        
        // For simulation, send initial data
        setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.dispatchEvent(new MessageEvent('message', {
              data: JSON.stringify({
                modelStatus: 'idle',
                availableModels: [
                  { id: 'price-prediction', name: 'Price Prediction Model', status: 'ready' },
                  { id: 'risk-assessment', name: 'Risk Assessment Model', status: 'ready' },
                  { id: 'liquidity-forecast', name: 'Liquidity Forecast Model', status: 'ready' }
                ],
                lastRun: {
                  modelId: 'price-prediction',
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                  duration: '45.2s',
                  status: 'completed'
                },
                computeResources: {
                  available: true,
                  queueLength: 0
                }
              })
            }));
          }
        }, 1000);
      };
      
      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);
          
          // If this is a simulation start message, begin the progress updates
          if (parsedData.command === 'start-simulation') {
            simulateModelRun(parsedData.modelId);
          }
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

  // Simulate a model run with progress updates
  const simulateModelRun = useCallback((modelId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    
    simulationRunningRef.current = true;
    let progress = 0;
    
    // Send initial status
    wsRef.current.dispatchEvent(new MessageEvent('message', {
      data: JSON.stringify({
        modelStatus: 'running',
        activeModel: modelId,
        progress: 0,
        estimatedTimeRemaining: '120s',
        startTime: new Date().toISOString()
      })
    }));
    
    // Update progress periodically
    const progressInterval = setInterval(() => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        clearInterval(progressInterval);
        return;
      }
      
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        simulationRunningRef.current = false;
        
        // Send completion message
        wsRef.current.dispatchEvent(new MessageEvent('message', {
          data: JSON.stringify({
            modelStatus: 'completed',
            activeModel: modelId,
            progress: 100,
            results: {
              accuracy: 0.87 + Math.random() * 0.1,
              predictions: [
                { timestamp: new Date(Date.now() + 86400000).toISOString(), value: 42.5 + Math.random() * 5 },
                { timestamp: new Date(Date.now() + 172800000).toISOString(), value: 43.2 + Math.random() * 5 },
                { timestamp: new Date(Date.now() + 259200000).toISOString(), value: 44.1 + Math.random() * 5 }
              ],
              confidence: 0.92,
              executionTime: '118.5s'
            },
            completionTime: new Date().toISOString()
          })
        }));
        
        // Reset to idle after a delay
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.dispatchEvent(new MessageEvent('message', {
              data: JSON.stringify({
                modelStatus: 'idle',
                availableModels: [
                  { id: 'price-prediction', name: 'Price Prediction Model', status: 'ready' },
                  { id: 'risk-assessment', name: 'Risk Assessment Model', status: 'ready' },
                  { id: 'liquidity-forecast', name: 'Liquidity Forecast Model', status: 'ready' }
                ],
                lastRun: {
                  modelId: modelId,
                  timestamp: new Date().toISOString(),
                  duration: '118.5s',
                  status: 'completed'
                },
                computeResources: {
                  available: true,
                  queueLength: 0
                }
              })
            }));
          }
        }, 3000);
      } else {
        // Send progress update
        wsRef.current.dispatchEvent(new MessageEvent('message', {
          data: JSON.stringify({
            modelStatus: 'running',
            activeModel: modelId,
            progress: Math.floor(progress),
            estimatedTimeRemaining: `${Math.ceil((100 - progress) * 1.2)}s`,
            currentStage: progress < 30 ? 'data-preparation' : 
                          progress < 60 ? 'model-training' : 
                          progress < 90 ? 'prediction-generation' : 'result-validation'
          })
        }));
      }
    }, 2000);
    
    return () => clearInterval(progressInterval);
  }, []);

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