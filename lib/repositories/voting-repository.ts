// src/lib/repositories/voting-repository.ts
import path from 'path';
import { promises as fs } from 'fs';

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
  private cache: {
    overview?: { data: VotingOverview; timestamp: number };
    proposals?: { data: ProposalsData; timestamp: number };
  } = {};
  private readonly CACHE_TTL = 60_000; // 1 minute

  constructor() {
    this.basePath = path.join(process.cwd(), 'data', 'voting');
  }

  private isCacheValid(key: 'overview' | 'proposals'): boolean {
    const entry = this.cache[key];
    return !!entry && (Date.now() - entry.timestamp < this.CACHE_TTL);
  }

  async getVotingOverview(): Promise<VotingOverview> {
    if (this.isCacheValid('overview')) {
      return this.cache.overview!.data;
    }
    try {
      const raw = await fs.readFile(
        path.join(this.basePath, 'overview.json'),
        'utf8'
      );
      const data = JSON.parse(raw) as VotingOverview;
      this.cache.overview = { data, timestamp: Date.now() };
      return data;
    } catch (err) {
      console.error('Error reading voting overview data:', err);
      throw new Error('Failed to fetch voting overview data');
    }
  }

  async getAllProposals(): Promise<ProposalsData> {
    if (this.isCacheValid('proposals')) {
      return this.cache.proposals!.data;
    }
    try {
      const raw = await fs.readFile(
        path.join(this.basePath, 'proposals.json'),
        'utf8'
      );
      const data = JSON.parse(raw) as ProposalsData;
      this.cache.proposals = { data, timestamp: Date.now() };
      return data;
    } catch (err) {
      console.error('Error reading proposals data:', err);
      throw new Error('Failed to fetch proposals data');
    }
  }

  async getActiveProposals(): Promise<ActiveProposal[]> {
    try {
      const { activeProposals } = await this.getAllProposals();
      return activeProposals;
    } catch (err) {
      console.error('Error reading active proposals data:', err);
      throw new Error('Failed to fetch active proposals data');
    }
  }

  async getPastProposals(): Promise<PastProposal[]> {
    try {
      const { pastProposals } = await this.getAllProposals();
      return pastProposals;
    } catch (err) {
      console.error('Error reading past proposals data:', err);
      throw new Error('Failed to fetch past proposals data');
    }
  }

  async updateVote(
    proposalId: string,
    newVote: 'for' | 'against' | null
  ): Promise<ActiveProposal[]> {
    try {
      const allData = await this.getAllProposals();
      const updatedActive = allData.activeProposals.map((p) => {
        if (p.id !== proposalId) return p;
        let { votesFor, votesAgainst, yourVote } = p;
        if (yourVote === 'for') votesFor = Math.max(votesFor - 1, 0);
        if (yourVote === 'against') votesAgainst = Math.max(votesAgainst - 1, 0);
        if (newVote === 'for') votesFor++;
        if (newVote === 'against') votesAgainst++;
        const totalVotes = votesFor + votesAgainst;
        return { ...p, votesFor, votesAgainst, totalVotes, yourVote: newVote };
      });
      const updatedData: ProposalsData = {
        ...allData,
        activeProposals: updatedActive,
      };
      const file = path.join(this.basePath, 'proposals.json');
      await fs.writeFile(file, JSON.stringify(updatedData, null, 2), 'utf8');
      this.cache.proposals = { data: updatedData, timestamp: Date.now() };
      return updatedActive;
    } catch (err) {
      console.error('Error updating vote:', err);
      throw new Error('Failed to update vote');
    }
  }
}

export const votingRepository = new VotingRepository();