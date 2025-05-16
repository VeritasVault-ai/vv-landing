import { 
  VotingOverview,
  ActiveProposal,
  PastProposal
} from '@/lib/repositories/voting-repository';

/**
 * Service layer for interacting with the voting API
 */
class VotingService {
  /**
   * Fetch voting overview data
   */
  async getVotingOverview(): Promise<VotingOverview> {
    try {
      console.log('Fetching voting overview from API...');
      const response = await fetch('/api/voting/overview');
      
      console.log('API response status:', response.status, response.statusText);
      if (!response.ok) {
        // Try to get more details about the error
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (e) {
          // If we can't parse JSON, try to get text
          try {
            errorDetails = await response.text();
          } catch (e2) {
            errorDetails = 'Could not extract error details';
          }
        }

        throw new Error(`Failed to fetch voting overview: ${response.statusText}. Details: ${errorDetails}`);
      }
      
      const data = await response.json();
      console.log('Successfully fetched voting overview data');
      return data;
    } catch (error) {
      console.error('Error in getVotingOverview:', error);
      throw error;
    }
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
  async submitVote(proposalId: string, vote: 'for' | 'against' | null): Promise<{
    success: boolean;
    message: string;
    proposals: ActiveProposal[];
  }> {
    const response = await fetch('/api/voting/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ proposalId, vote }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit vote: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Export a singleton instance
export const votingService = new VotingService();