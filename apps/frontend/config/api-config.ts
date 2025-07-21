/**
 * API configuration for different environments
 */
export const API_CONFIG = {
  // Base URL for REST API endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  
  // Base URL for WebSocket connections
  WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL || 'wss://api.yourdomain.com',
  
  // Default request timeout in milliseconds
  REQUEST_TIMEOUT: 30000,
  
  // Whether to use mock data instead of real API calls
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
};