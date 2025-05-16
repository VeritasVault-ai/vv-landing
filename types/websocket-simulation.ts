import { WebSocketStatus } from './websocket-data';

/**
 * Options for configuring a WebSocket simulation
 */
export interface WebSocketSimulationOptions<T> {
  // WebSocket endpoint URL
  endpoint: string;
  
  // Status change handler
  onStatusChange?: (status: WebSocketStatus) => void;
  
  // Initial data generator function
  getInitialData: () => T | Promise<T>;
  
  // Data update function (optional)
  updateDataPeriodically?: (prevData: T) => T;
  
  // Update interval in milliseconds (default: 10000)
  updateInterval?: number;
  
  // Whether to fetch initial data from an API endpoint
  fetchInitialData?: boolean;
  
  // API endpoint for fetching initial data
  initialDataEndpoint?: string;
}

/**
 * Common interface for all WebSocket simulation hooks
 */
export interface WebSocketSimulationResult<T> {
  // Current data from the WebSocket
  data: T | null;
  
  // Function to manually reconnect the WebSocket
  reconnect: () => void;
  
  // Whether the data is being simulated (vs. real WebSocket)
  isSimulated: boolean;
  
  // Function to manually update the data
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Extended result for model WebSocket simulation
 */
export interface ModelWebSocketSimulationResult extends WebSocketSimulationResult<import('./websocket-data').ModelData> {
  // Send a command to the model WebSocket
  sendCommand: (command: string, params: any) => void;
}

/**
 * Extended result for voting WebSocket simulation
 */
export interface VotingWebSocketSimulationResult extends WebSocketSimulationResult<import('./websocket-data').VotingData> {
  // Submit a vote to the voting system
  submitVote: (vote: {
    proposalId: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
  }) => Promise<void>;
}

/**
 * Extended result for allocation WebSocket simulation
 */
export interface AllocationWebSocketSimulationResult extends WebSocketSimulationResult<import('./websocket-data').AllocationData> {
  // Update asset allocations
  updateAllocations: (newAllocations: import('./websocket-data').AssetAllocation[]) => void;
}