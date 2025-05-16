import { http, HttpResponse } from 'msw'

// Define mock data for various API endpoints
const performanceData = {
  totalReturn: 12.8,
  annualizedReturn: 8.4,
  volatility: 14.2,
  sharpeRatio: 1.2,
  maxDrawdown: -18.5,
  periods: [
    { period: 'YTD', return: 8.2 },
    { period: '1Y', return: 12.8 },
    { period: '3Y', return: 42.5 },
    { period: '5Y', return: 76.3 },
    { period: 'Max', return: 128.7 }
  ],
  monthlyReturns: [
    { month: 'Jan', return: 2.1 },
    { month: 'Feb', return: -1.2 },
    { month: 'Mar', return: 3.4 },
    { month: 'Apr', return: 1.8 },
    { month: 'May', return: -0.5 },
    { month: 'Jun', return: 2.2 },
    { month: 'Jul', return: 1.9 },
    { month: 'Aug', return: -0.8 },
    { month: 'Sep', return: 1.1 },
    { month: 'Oct', return: -1.5 },
    { month: 'Nov', return: 3.2 },
    { month: 'Dec', return: 1.6 }
  ],
  isSimulated: true
}

const portfolioData = {
  totalValue: 1250000,
  cashBalance: 125000,
  allocation: [
    { category: 'Equities', value: 625000, percentage: 50 },
    { category: 'Fixed Income', value: 250000, percentage: 20 },
    { category: 'Alternatives', value: 187500, percentage: 15 },
    { category: 'Cash', value: 125000, percentage: 10 },
    { category: 'Commodities', value: 62500, percentage: 5 }
  ],
  topHoldings: [
    { name: 'AAPL', value: 125000, change: 2.5 },
    { name: 'MSFT', value: 112500, change: 1.8 },
    { name: 'AMZN', value: 87500, change: -0.7 },
    { name: 'GOOGL', value: 75000, change: 1.2 },
    { name: 'BRK.B', value: 62500, change: 0.5 }
  ],
  isSimulated: true
}

const marketData = {
  indices: [
    { name: 'S&P 500', value: 4782.82, change: 0.28 },
    { name: 'NASDAQ', value: 16943.12, change: 0.43 },
    { name: 'DOW', value: 38150.68, change: 0.12 },
    { name: 'Russell 2000', value: 2018.56, change: -0.15 }
  ],
  sectors: [
    { name: 'Technology', change: 0.72 },
    { name: 'Healthcare', change: 0.38 },
    { name: 'Financials', change: -0.12 },
    { name: 'Consumer Cyclical', change: 0.25 },
    { name: 'Industrials', change: 0.18 },
    { name: 'Energy', change: -0.45 }
  ],
  crypto: [
    { name: 'BTC', value: 68432.15, change: 2.35 },
    { name: 'ETH', value: 3821.47, change: 1.87 },
    { name: 'SOL', value: 142.83, change: 3.65 }
  ],
  isSimulated: true
}

const votingData = {
  status: 'active',
  activeProposals: [
    {
      id: 'prop-2023-05',
      title: 'Treasury Reallocation',
      description: 'Proposal to reallocate 5% of treasury to new liquidity pools',
      startTime: new Date(Date.now() - 86400000).toISOString(),
      endTime: new Date(Date.now() + 172800000).toISOString(),
      votes: {
        for: 1250000,
        against: 450000,
        abstain: 120000
      },
      quorum: 2000000,
      requiredMajority: 0.66
    },
    {
      id: 'prop-2023-06',
      title: 'Protocol Upgrade',
      description: 'Upgrade core protocol to v2.5 with enhanced security features',
      startTime: new Date(Date.now() - 172800000).toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      votes: {
        for: 1820000,
        against: 230000,
        abstain: 50000
      },
      quorum: 1500000,
      requiredMajority: 0.75
    }
  ],
  recentVotes: [
    {
      proposalId: 'prop-2023-05',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      vote: 'for',
      weight: 50000,
      anonymous: true
    },
    {
      proposalId: 'prop-2023-06',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      vote: 'against',
      weight: 25000,
      anonymous: false,
      voter: '0x1a2b...3c4d'
    }
  ],
  userVotingPower: 75000,
  userVotesCast: 1,
  votingStats: {
    totalProposals: 12,
    activeProposals: 2,
    participationRate: 0.68,
    averageTurnout: 0.72
  },
  isSimulated: true
}

/**
 * Type for API responses
 */
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

/**
 * Helper function to wrap data in the expected API response format
 * @param data The data to wrap in the API response format
 * @returns A properly formatted API response object
 */
function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 'success',
    message: 'Mock data retrieved successfully'
  }
}

// Define HTTP API handlers for MSW v2
export const handlers = [
  // Performance data endpoint
  http.get('/api/dashboard/performance', () => {
    return HttpResponse.json(createApiResponse(performanceData))
  }),
  
  // Portfolio data endpoint
  http.get('/api/dashboard/portfolio', () => {
    return HttpResponse.json(createApiResponse(portfolioData))
  }),
  
  // Market data endpoint
  http.get('/api/dashboard/market', () => {
    return HttpResponse.json(createApiResponse(marketData))
  }),
  
  // Voting data endpoint
  http.get('/api/dashboard/voting', () => {
    return HttpResponse.json(createApiResponse(votingData))
  }),
  
  // Generic API fallback for unhandled routes
  http.get('/api/*', ({ request }) => {
    console.warn(`No mock handler for ${request.url}`)
    return new HttpResponse(
      JSON.stringify({
        status: 'error',
        message: 'API endpoint not found',
        data: null
      } as ApiResponse<null>),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })
]