-import { BaseService, ApiResponse } from './base-service';
+import { BaseService, ApiResponse } from './base-service-secure';
import { 
  VotingOverview,
  ActiveProposal,
  PastProposal
} from '@/lib/repositories/voting-repository';

/**
 * Type definitions for voting service responses
 */
export type VotingOverviewResponse = ApiResponse<VotingOverview>;
export type ActiveProposalsResponse = ApiResponse<ActiveProposal[]>;
export type PastProposalsResponse = ApiResponse<PastProposal[]>;
export type VoteSubmissionResponse = ApiResponse<{
  success: boolean;
  message: string;
  proposals: ActiveProposal[];
}>;

/**
 * Service layer for interacting with the voting API
 */
class VotingService extends BaseService {
  /**
   * Fetch voting overview data
   */
  async getVotingOverview(): Promise<VotingOverview> {
    const response = await this.get<VotingOverview>('/api/voting/overview');
    return response.data;
  }

  /**
   * Fetch active proposals
   */
  async getActiveProposals(): Promise<ActiveProposal[]> {
    const response = await this.get<ActiveProposal[]>('/api/voting/active-proposals');
    return response.data;
  }

  /**
   * Fetch past proposals
   */
  async getPastProposals(): Promise<PastProposal[]> {
    const response = await this.get<PastProposal[]>('/api/voting/past-proposals');
    return response.data;
  }

  /**
   * Submit a vote on a proposal
   */
  async submitVote(proposalId: string, vote: 'for' | 'against' | null): Promise<{
    success: boolean;
    message: string;
    proposals: ActiveProposal[];
  }> {
    const response = await this.post<{
      success: boolean;
      message: string;
      proposals: ActiveProposal[];
    }>('/api/voting/vote', { proposalId, vote });
    
    return response.data;
  }
  
  /**
   * Get voting power for a specific address
   */
  async getVotingPower(address: string): Promise<{
    address: string;
    votingPower: number;
    percentage: number;
  }> {
    const response = await this.get<{
      address: string;
      votingPower: number;
      percentage: number;
    }>(`/api/voting/power?address=${address}`);
    
    return response.data;
  }
}

// Export a singleton instance
export const votingService = new VotingService();