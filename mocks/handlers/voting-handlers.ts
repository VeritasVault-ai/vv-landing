import { http, HttpResponse } from 'msw'
import { mockVotingOverview } from '@/components/corporate/voting/voting-overview/voting-overview.mock'

export const votingHandlers = [
  // Handler for fetching voting overview data
  http.get('/api/voting/overview', () => {
    return HttpResponse.json(mockVotingOverview)
  }),
  
  // Handler for voting power changes (could be used for WebSocket simulation)
  http.post('/api/voting/delegate', async ({ request }) => {
    const { address, amount } = await request.json()
    
    // You could modify the mock data based on the request
    const updatedMock = {
      ...mockVotingOverview,
      votingPower: {
        ...mockVotingOverview.votingPower,
        votes: mockVotingOverview.votingPower.votes + amount,
        percentage: ((mockVotingOverview.votingPower.votes + amount) / 
                    mockVotingOverview.votingPower.totalVotes * 100).toFixed(1)
      },
      delegations: [
        { address, timeAgo: "just now", votes: amount },
        ...mockVotingOverview.delegations
      ]
    }
    
    return HttpResponse.json({ success: true, overview: updatedMock })
  }),
  
  // Add more handlers for other voting-related endpoints
]