import { mockVotingOverview } from '@/components/corporate/voting/voting-overview.mock'
import { VotingOverview } from '@/lib/repositories/voting-repository'
import { http, HttpResponse } from 'msw'
import { initialVotingData } from '../data/voting'

// Define types for request payloads
interface DelegateVotesRequest {
  address: string;
  amount: number;
}

interface SubmitVoteRequest {
  proposalId: string;
  vote: 'for' | 'against' | 'abstain';
  weight: number;
}

export const votingHandlers = [
  // Handler for fetching voting overview data
  http.get('/api/voting/overview', () => {
    return HttpResponse.json(mockVotingOverview)
  }),
  
  // Handler for voting power changes
  http.post('/api/voting/delegate', async ({ request }) => {
    try {
      const { address, amount } = await request.json() as DelegateVotesRequest
      
      // Validate input data
      if (!address || typeof address !== 'string' || !amount || isNaN(amount) || amount <= 0) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid input data' }),
          { status: 400 }
        )
      }
      
      // Create a deep clone of the mock data to avoid mutation
      const updatedMock: VotingOverview = JSON.parse(JSON.stringify(mockVotingOverview));
      
      // Calculate new values
      const newVotes = updatedMock.votingPower.votes + amount;
      const newPercentage = Number(
        ((newVotes / updatedMock.votingPower.totalVotes) * 100).toFixed(1)
      );
      
      // Update the mock data
      updatedMock.votingPower = {
        ...updatedMock.votingPower,
        votes: newVotes,
        percentage: newPercentage
      };
      
      // Add new delegation to the list
      updatedMock.delegations = [
        { address, timeAgo: "just now", votes: amount },
        ...updatedMock.delegations
      ];
      return HttpResponse.json({ 
        success: true, 
        overview: updatedMock 
  })
    } catch (error) {
      console.error('Error processing delegation request:', error);
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
      const { proposalId, vote, weight } = await request.json() as SubmitVoteRequest
      
      // Validate input data
      if (!proposalId || typeof proposalId !== 'string') {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid proposal ID' }),
          { status: 400 }
        )
      }
      
      if (!vote || !['for', 'against', 'abstain'].includes(vote)) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid vote option' }),
          { status: 400 }
        )
      }
      
      if (!weight || isNaN(weight) || weight <= 0) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid vote weight' }),
          { status: 400 }
        )
      }
      
      // Return success response
      return HttpResponse.json({ 
        success: true, 
        message: `Successfully voted ${vote} with ${weight.toLocaleString()} votes on proposal ${proposalId}` 
      })
    } catch (error) {
      console.error('Error processing vote request:', error);
      // Handle JSON parsing errors
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid request format' }),
        { status: 400 }
      )
    }
  })
]