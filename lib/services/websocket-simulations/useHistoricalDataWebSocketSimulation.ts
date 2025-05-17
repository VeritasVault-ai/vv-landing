import { API_CONFIG } from '@/config/api-config';
import { useBaseWebSocketSimulation } from '@/lib/services/websocket-simulations/useBaseWebSocketSimulation';
import { getMockHistoricalDataForStrategy } from '@/mocks/data/historical-data';
import { HistoricalDataPoint } from '@/src/types/historical-data';
import { WebSocketStatus } from '@/types/websocket-data';

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
  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated } = useBaseWebSocketSimulation<HistoricalDataPoint[]>({
    // Use configurable endpoint from API_CONFIG
    endpoint: `${API_CONFIG.WS_BASE_URL}/historical-data/${strategyId}/${timeframe}`,
    onStatusChange,
    fetchInitialData: true,
    // Add the required getInitialData function to fetch mock data
    getInitialData: async () => {
      try {
        // In development or test environments, use mock data
        if (process.env.NODE_ENV !== 'production' || process.env.USE_MOCK_DATA === 'true') {
          return getMockHistoricalDataForStrategy(strategyId, timeframe);
        }
        
        // In production, fetch from the API
        const days = getDaysFromTimeframe(timeframe);
        const response = await fetch(
          `${API_CONFIG.API_BASE_URL}/historical-data?protocol=${strategyId}&days=${days}`
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
        // Fallback to mock data if API request fails
        return getMockHistoricalDataForStrategy(strategyId, timeframe);
      }
    }
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