import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// Define types for our data
export interface VotingPower {
  percentage: number;
  votes: number;
  totalVotes: number;
}

export interface Participation {
  participated: number;
  totalProposals: number;
  rate: number;
  comparedToAverage: number;
}

export interface VotingPowerDistribution {
  name: string;
  value: number;
}

export interface Delegation {
  address: string;
  timeAgo: string;
  votes: number;
}

export interface VotingOverview {
  votingPower: VotingPower;
  participation: Participation;
  votingPowerDistribution: VotingPowerDistribution[];
  delegations: Delegation[];
}

export interface PastProposal {
  id: string;
  title: string;
  result: 'passed' | 'failed';
  date: string;
  votesFor: number;
  votesAgainst: number;
  yourVote: 'for' | 'against' | null;
  category: string;
}

export interface ActiveProposal {
  id: string;
  title: string;
  description: string;
  status: string;
  timeRemaining: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  yourVote: 'for' | 'against' | null;
}

export interface ProposalsData {
  pastProposals: PastProposal[];
  activeProposals: ActiveProposal[];
}

class VotingRepository {
  private basePath: string;

  constructor() {
    this.basePath = path.join(process.cwd(), 'data', 'voting');
  }

  /**
   * Get voting overview data
   */
  async getVotingOverview(): Promise<VotingOverview> {
    try {
      const data = await fsPromises.readFile(path.join(this.basePath, 'overview.json'), 'utf8');
      return JSON.parse(data) as VotingOverview;
    } catch (error) {
      console.error('Error reading voting overview data:', error);
      throw new Error('Failed to fetch voting overview data');
    }
  }

  /**
   * Get all proposals data (both active and past)
   */
  async getAllProposals(): Promise<ProposalsData> {
    try {
      const data = await fsPromises.readFile(path.join(this.basePath, 'proposals.json'), 'utf8');
      return JSON.parse(data) as ProposalsData;
    } catch (error) {
      console.error('Error reading proposals data:', error);
      throw new Error('Failed to fetch proposals data');
    }
  }

  /**
   * Get active proposals only
   */
  async getActiveProposals(): Promise<ActiveProposal[]> {
    try {
      const allData = await this.getAllProposals();
      return allData.activeProposals;
    } catch (error) {
      console.error('Error reading active proposals data:', error);
      throw new Error('Failed to fetch active proposals data');
    }
  }

  /**
   * Get past proposals only
   */
  async getPastProposals(): Promise<PastProposal[]> {
    try {
      const allData = await this.getAllProposals();
      return allData.pastProposals;
    } catch (error) {
      console.error('Error reading past proposals data:', error);
      throw new Error('Failed to fetch past proposals data');
    }
  }

  /**
   * Update a vote on an active proposal
   */
  async updateVote(proposalId: string, vote: 'for' | 'against' | null): Promise<ActiveProposal[]> {
    try {
      const allData = await this.getAllProposals();
      
      // Find and update the specific proposal
      const updatedActiveProposals = allData.activeProposals.map(proposal => {
        if (proposal.id === proposalId) {
          return { ...proposal, yourVote: vote };
        }
        return proposal;
      });
      
      // Update the file with new data
      const updatedData = {
        ...allData,
        activeProposals: updatedActiveProposals
      };
      
      await fsPromises.writeFile(
        path.join(this.basePath, 'proposals.json'),
        JSON.stringify(updatedData, null, 2),
        'utf8'
      );
      
      return updatedActiveProposals;
    } catch (error) {
      console.error('Error updating vote:', error);
      throw new Error('Failed to update vote');
    }
  }
}

// Export a singleton instance
export const votingRepository = new VotingRepository();