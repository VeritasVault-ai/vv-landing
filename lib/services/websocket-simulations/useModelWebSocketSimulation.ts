import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

// Define types for our model data
export interface ModelData {
  modelStatus: string;
  availableModels?: {
    id: string;
    name: string;
    status: string;
  }[];
  lastRun?: {
    modelId: string;
    timestamp: string;
    duration: string;
    status: string;
  };
  computeResources?: {
    available: boolean;
    queueLength: number;
  };
  activeModel?: string;
  progress?: number;
  estimatedTimeRemaining?: string;
  startTime?: string;
  currentStage?: string;
  results?: {
    accuracy: number;
    predictions: {
      timestamp: string;
      value: number;
    }[];
    confidence: number;
    executionTime: string;
  };
  completionTime?: string;
}

/**
 * Custom hook for simulating WebSocket connections for model data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useModelWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Use proper typing for the data state
  const [data, setData] = useState<ModelData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const simulationRunningRef = useRef<boolean>(false);
  const [isSimulated, setIsSimulated] = useState(true);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      // Always use simulation mode to avoid connection errors
      setIsSimulated(true);
      startSimulation();
      
      // Skip actual WebSocket connection attempt in development
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      
      // In production, we would try to connect to the real WebSocket
      try {
        // Try to connect to the actual WebSocket endpoint
        const ws = new WebSocket('wss://your-api.com/model');
        wsRef.current = ws;
        
        ws.onopen = () => {
          setIsSimulated(false);
          onStatusChange?.('connected');
        };
        
        ws.onmessage = (event) => {
          try {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);
          } catch (error) {
            console.error('Failed to parse WebSocket message');
          }
        };
        
        ws.onclose = (event) => {
          // Don't report error for normal closure
          if (event.code !== 1000) {
            onStatusChange?.('disconnected');
            
            // Fall back to simulation
            setIsSimulated(true);
            startSimulation();
          }
        };
        
        ws.onerror = () => {
          // Instead of logging the error object which can cause circular reference issues
          console.error('WebSocket connection error - falling back to simulation');
          onStatusChange?.('error');
          
          // Fall back to simulation
          setIsSimulated(true);
          if (ws) ws.close();
          startSimulation();
        };
      } catch (error) {
        console.error('WebSocket not available - using simulation instead');
        setIsSimulated(true);
        startSimulation();
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection - using simulation');
      onStatusChange?.('error');
      setIsSimulated(true);
      startSimulation();
    }
  }, [onStatusChange]);

  // Start the WebSocket simulation
  const startSimulation = useCallback(() => {
    onStatusChange?.('connected');
    
    // For simulation, send initial data
    setTimeout(() => {
      // Simulate initial message
      const initialData: ModelData = {
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
      };
      
      setData(initialData);
    }, 1000);
  }, [onStatusChange]);

  // Simulate a model run with progress updates
  const simulateModelRun = useCallback((modelId: string) => {
    if (!isSimulated) return;
    
    simulationRunningRef.current = true;
    let progress = 0;
    
    // Send initial status
    const initialRunData: ModelData = {
      modelStatus: 'running',
      activeModel: modelId,
      progress: 0,
      estimatedTimeRemaining: '120s',
      startTime: new Date().toISOString()
    };
    
    setData(initialRunData);
    
    // Update progress periodically
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        simulationRunningRef.current = false;
        
        // Send completion message
        const completionData: ModelData = {
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
        };
        
        setData(completionData);
        
        // Reset to idle after a delay
        setTimeout(() => {
          const idleData: ModelData = {
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
          };
          
          setData(idleData);
        }, 3000);
      } else {
        // Send progress update
        const progressData: ModelData = {
          modelStatus: 'running',
          activeModel: modelId,
          progress: Math.floor(progress),
          estimatedTimeRemaining: `${Math.ceil((100 - progress) * 1.2)}s`,
          currentStage: progress < 30 ? 'data-preparation' : 
                        progress < 60 ? 'model-training' : 
                        progress < 90 ? 'prediction-generation' : 'result-validation'
        };
        
        setData(progressData);
      }
    }, 2000);
    
    return () => clearInterval(progressInterval);
  }, [isSimulated]);

  // Handle command to start a model run
  const handleCommand = useCallback((command: string, params: any) => {
    if (command === 'start-simulation') {
      simulateModelRun(params.modelId);
    }
  }, [simulateModelRun]);

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
    if (typeof window !== 'undefined') {
      connect();
    }
    
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

  return { 
    data, 
    reconnect, 
    isSimulated, 
    sendCommand: handleCommand 
  };
}