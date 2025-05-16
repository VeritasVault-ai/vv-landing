/**
 * Voting domain types
 * Contains all types related to governance proposals and voting
 */
import { BaseWebSocketData } from './websocket-infrastructure';

// Proposal type - core domain entity
export interface Proposal {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number;
  requiredMajority: number;
}

// Vote record type - core domain entity
export interface VoteRecord {
  proposalId: string;
  timestamp: string;
  vote: 'for' | 'against' | 'abstain';
  weight: number;
  anonymous: boolean;
  voter?: string;
}

// Voting statistics - domain value object
export interface VotingStatistics {
  totalProposals: number;
  activeProposals: number;
  participationRate: number;
  averageTurnout: number;
}

// WebSocket data payload for voting domain
export interface VotingData extends BaseWebSocketData {
  activeProposals?: Proposal[];
  recentVotes?: VoteRecord[];
  userVotingPower?: number;
  userVotesCast?: number;
  votingStats?: VotingStatistics;
}