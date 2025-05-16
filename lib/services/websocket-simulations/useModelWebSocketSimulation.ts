import { ModelData, WebSocketStatus } from '@/types/websocket-data';
import { useCallback } from 'react';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';

/**
 * Custom hook for simulating WebSocket connections for model data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useModelWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Create initial data function
  const getInitialData = useCallback((): ModelData => {
    return {
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
  }, []);

  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated, setData } = useBaseWebSocketSimulation<ModelData>({
    endpoint: 'wss://your-api.com/model',
    onStatusChange,
    getInitialData,
    updateInterval: 10000,
    fetchInitialData: false
  });

  // Simulate a model run with progress updates
  const simulateModelRun = useCallback((modelId: string) => {
    if (!isSimulated) return;
    
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
  }, [isSimulated, setData]);

  // Handle command to start a model run
  const sendCommand = useCallback((command: string, params: any) => {
    if (command === 'start-simulation') {
      simulateModelRun(params.modelId);
    }
  }, [simulateModelRun]);

  return { 
    data, 
    reconnect, 
    isSimulated, 
    sendCommand
  };
}
