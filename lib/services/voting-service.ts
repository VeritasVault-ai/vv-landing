import { 
  VotingOverview,
  ActiveProposal,
  PastProposal
} from '@/lib/repositories/voting-repository';
import { VotingData } from './websocket-simulations/useVotingWebsocketSimulation';

/**
 * Service layer for interacting with the voting API
 */
class VotingService {
  /**
   * Fetch voting overview data
   */
  async getVotingOverview(): Promise<VotingOverview> {
    // This endpoint will be intercepted by MSW when enabled
    const response = await fetch('/api/voting/overview')
      
    if (!response.ok) {
      throw new Error('Failed to fetch voting overview')
    }
    
    return response.json()
  }
  /**
   * Fetch active proposals
   */
  async getActiveProposals(): Promise<ActiveProposal[]> {
    const response = await fetch('/api/voting/active-proposals');
    if (!response.ok) {
      throw new Error(`Failed to fetch active proposals: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Fetch past proposals
   */
  async getPastProposals(): Promise<PastProposal[]> {
    const response = await fetch('/api/voting/past-proposals');
    if (!response.ok) {
      throw new Error(`Failed to fetch past proposals: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Submit a vote on a proposal
   */
  async submitVote(
    proposalId: string, 
    vote: 'for' | 'against' | 'abstain' | null,
    weight?: number
  ): Promise<{
    success: boolean;
    message: string;
    proposals?: ActiveProposal[];
  }> {
    const payload: any = { proposalId, vote };
    
    // Add weight if provided
    if (weight !== undefined) {
      payload.weight = weight;
    }
    const response = await fetch('/api/voting/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit vote: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Delegate voting power to an address
   */
  async delegateVotes(address: string, amount: number): Promise<{ 
    success: boolean, 
    overview?: VotingOverview 
  }> {
    // This endpoint will be intercepted by MSW when enabled
    const response = await fetch('/api/voting/delegate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, amount })
    })
    
    if (!response.ok) {
      throw new Error('Failed to delegate votes')
    }

    return response.json()
  }

  /**
   * Get initial WebSocket data
   */
  async getWebSocketData(): Promise<VotingData> {
    const response = await fetch('/api/voting/websocket-data');
    if (!response.ok) {
      throw new Error('Failed to fetch WebSocket data');
    }
    return response.json();
  }
}
// Export a singleton instance
export const votingService = new VotingService();