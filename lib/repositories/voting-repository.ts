// src/lib/repositories/voting-repository.ts
import path from 'path';
import { promises as fs } from 'fs';

// Define types for our data
export interface VotingPower { percentage: number; votes: number; totalVotes: number; }
export interface Participation { participated: number; totalProposals: number; rate: number; comparedToAverage: number; }
export interface VotingPowerDistribution { name: string; value: number; }
export interface Delegation { address: string; timeAgo: string; votes: number; }
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
export interface ProposalsData { pastProposals: PastProposal[]; activeProposals: ActiveProposal[]; }

class VotingRepository {
  private basePath: string;
  constructor() {
    this.basePath = path.join(process.cwd(), 'data', 'voting');
  }

  async getVotingOverview(): Promise<VotingOverview> {
    try {
      const data = await fs.readFile(path.join(this.basePath, 'overview.json'), 'utf8');
      return JSON.parse(data) as VotingOverview;
    } catch (error) {
      console.error('Error reading voting overview data:', error);
      throw new Error('Failed to fetch voting overview data');
    }
  }

  async getAllProposals(): Promise<ProposalsData> {
    try {
      const data = await fs.readFile(path.join(this.basePath, 'proposals.json'), 'utf8');
      return JSON.parse(data) as ProposalsData;
    } catch (error) {
      console.error('Error reading proposals data:', error);
      throw new Error('Failed to fetch proposals data');
    }
  }

  async getActiveProposals(): Promise<ActiveProposal[]> {
    try {
      const { activeProposals } = await this.getAllProposals();
      return activeProposals;
    } catch (error) {
      console.error('Error reading active proposals data:', error);
      throw new Error('Failed to fetch active proposals data');
    }
  }

  async getPastProposals(): Promise<PastProposal[]> {
    try {
      const { pastProposals } = await this.getAllProposals();
      return pastProposals;
    } catch (error) {
      console.error('Error reading past proposals data:', error);
      throw new Error('Failed to fetch past proposals data');
    }
  }

  /**
   * Update a vote on an active proposal, adjusting tallies and totalVotes
   */
  async updateVote(
    proposalId: string,
    newVote: 'for' | 'against' | null
  ): Promise<ActiveProposal[]> {
    try {
      const allData = await this.getAllProposals();
      const updatedActive = allData.activeProposals.map((proposal) => {
        if (proposal.id !== proposalId) return proposal;

        // Clone for mutation
        let votesFor = proposal.votesFor;
        let votesAgainst = proposal.votesAgainst;
        const prevVote = proposal.yourVote;

        // Decrement previous vote tally
        if (prevVote === 'for') votesFor = Math.max(votesFor - 1, 0);
        if (prevVote === 'against') votesAgainst = Math.max(votesAgainst - 1, 0);

        // Increment new vote tally
        if (newVote === 'for') votesFor += 1;
        if (newVote === 'against') votesAgainst += 1;

        // Recalculate totalVotes
        const totalVotes = votesFor + votesAgainst;

        return {
          ...proposal,
          votesFor,
          votesAgainst,
          totalVotes,
          yourVote: newVote,
        };
      });

      // Persist updated data
      const updatedData: ProposalsData = {
        ...allData,
        activeProposals: updatedActive,
      };
      await fs.writeFile(
        path.join(this.basePath, 'proposals.json'),
        JSON.stringify(updatedData, null, 2),
        'utf8'
      );

      return updatedActive;
    } catch (error) {
      console.error('Error updating vote:', error);
      throw new Error('Failed to update vote');
    }
  }
}

export const votingRepository = new VotingRepository();
