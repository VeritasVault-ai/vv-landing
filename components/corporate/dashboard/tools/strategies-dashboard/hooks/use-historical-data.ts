import { useCallback } from 'react';
import { useBaseWebSocketSimulation } from '@/lib/services/websocket-simulations/useBaseWebSocketSimulation';
import { WebSocketStatus } from '@/types/websocket-data';
import { HistoricalDataPoint } from '@/types/historical-data';

/**
 * Hook to fetch and manage historical performance data for strategies
 * 
 * This hook follows the WebSocket simulation pattern established in the project
 * 
 * @param strategyId - The ID of the strategy to fetch data for
 * @param timeframe - Time period for the data (e.g., '1d', '1w', '1m', '3m', '1y', 'all')
 * @param onStatusChange - Optional callback invoked when the WebSocket connection status changes
 * @returns Object containing the historical data and loading state
 */
export function useHistoricalData(
  strategyId: string, 
  timeframe: string = '1y',
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Create initial data function
  const getInitialData = useCallback((): HistoricalDataPoint[] => {
    return getMockHistoricalData(strategyId, timeframe);
  }, [strategyId, timeframe]);

  // Create update function for periodic updates
  const updateDataPeriodically = useCallback((prevData: HistoricalDataPoint[]): HistoricalDataPoint[] => {
    // For historical data, we don't need to update it frequently
    // Just return the existing data with minor variations
    return prevData.map(item => ({
      ...item,
      value: item.value * (1 + (Math.random() * 0.01 - 0.005)), // Small random change
      return: item.return * (1 + (Math.random() * 0.02 - 0.01)), // Small random change
      drawdown: Math.min(0, item.drawdown * (1 + (Math.random() * 0.01 - 0.005))) // Small random change
    }));
  }, []);

  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated } = useBaseWebSocketSimulation<HistoricalDataPoint[]>({
    endpoint: `wss://your-api.com/historical-data/${strategyId}/${timeframe}`,
    getInitialData,
    updateDataPeriodically,
    updateInterval: 60000, // Update less frequently for historical data
    fetchInitialData: true,
    initialDataEndpoint: `/api/goldsky/historical-data?protocol=${strategyId}&days=${getDaysFromTimeframe(timeframe)}`
  });

  // Return data in formats expected by the different components
  return {
    data,
    growthData: data,
    drawdownData: data,
    returnsData: data,
    tableData: data,
    isLoading: !data,
    error: null,
    isSimulated,
    reconnect
  };
}

/**
 * Convert timeframe string to number of days for API request
 */
function getDaysFromTimeframe(timeframe: string): number {
  switch (timeframe) {
    case '1d': return 1;
    case '1w': return 7;
    case '1m': return 30;
    case '3m': return 90;
    case '6m': return 180;
    case '1y': return 365;
    case 'all': return 730;
    default: return 30;
  }
}

/**
 * Generate mock historical data following the pattern in the Goldsky API route
 */
function getMockHistoricalData(strategyId: string, timeframe: string): HistoricalDataPoint[] {
  const days = getDaysFromTimeframe(timeframe);
  const data: HistoricalDataPoint[] = [];
  
  // Use strategy ID to create different patterns for different strategies
  const seed = parseInt(strategyId.replace(/\D/g, '')) || 1;
  const volatility = (seed % 3) + 1;
  const trend = ((seed % 5) - 2) / 100;
  
  let value = 100;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Calculate change with randomness influenced by strategy ID
    const change = ((Math.random() - 0.5) * volatility) + trend;
    value = value * (1 + change);
    
    // Calculate metrics
    const returnValue = change * 100;
    const drawdown = Math.min(0, ((value / 100) - 1) * 100);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(2)),
      return: parseFloat(returnValue.toFixed(2)),
      drawdown: parseFloat(drawdown.toFixed(2))
    });
  }
  
  return data;
}