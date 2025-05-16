import { http, HttpResponse } from 'msw'
import { VotingData } from '@/lib/services/websocket-simulations/useVotingWebsocketSimulation'
import { mockVotingOverview } from '@/components/corporate/voting/voting-overview.mock'
import { initialVotingData } from '../data/voting'

export const votingHandlers = [
  // Handler for fetching voting overview data
  http.get('/api/voting/overview', () => {
    return HttpResponse.json(mockVotingOverview)
  }),
  
  // Handler for voting power changes
  http.post('/api/voting/delegate', async ({ request }) => {
    try {
      const { address, amount } = await request.json()
      
      // Validate input data
      if (!address || typeof address !== 'string' || !amount || isNaN(amount) || amount <= 0) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid input data' }),
          { status: 400 }
        )
      }
      
      // You could modify the mock data based on the request
      const updatedMock = {
        ...mockVotingOverview,
        votingPower: {
          ...mockVotingOverview.votingPower,
          votes: mockVotingOverview.votingPower.votes + amount,
          percentage: Number(((mockVotingOverview.votingPower.votes + amount) / 
                      mockVotingOverview.votingPower.totalVotes * 100).toFixed(1))
        },
        delegations: [
          { address, timeAgo: "just now", votes: amount },
          ...mockVotingOverview.delegations
]
      }
      
      return HttpResponse.json({ success: true, overview: updatedMock })
    } catch (error) {
      // Handle JSON parsing errors
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid request format' }),
        { status: 400 }
      )
    }
  }),
  
  // Handler for WebSocket initial data
  http.get('/api/voting/websocket-data', () => {
    return HttpResponse.json(initialVotingData)
  }),
  
  // Handler for submitting a vote
  http.post('/api/voting/vote', async ({ request }) => {
    try {
      const { proposalId, vote, weight } = await request.json()
      
      // Validate input data
      if (!proposalId || typeof proposalId !== 'string' || 
          !vote || !['for', 'against', 'abstain'].includes(vote) ||
          !weight || isNaN(weight) || weight <= 0) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid vote data' }),
          { status: 400 }
        )
      }
      
      // Return success response
      return HttpResponse.json({ 
        success: true, 
        message: `Successfully voted ${vote} with ${weight} votes on proposal ${proposalId}` 
      })
    } catch (error) {
      // Handle JSON parsing errors
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid request format' }),
        { status: 400 }
      )
    }
  })
]