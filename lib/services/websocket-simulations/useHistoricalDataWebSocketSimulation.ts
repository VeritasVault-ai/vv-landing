import { useBaseWebSocketSimulation } from '@/lib/services/websocket-simulations/useBaseWebSocketSimulation';
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
  const { data, reconnect, isSimulated, status } = useBaseWebSocketSimulation<HistoricalDataPoint[]>({
    endpoint: `wss://your-api.com/historical-data/${strategyId}/${timeframe}`,
    onStatusChange,
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