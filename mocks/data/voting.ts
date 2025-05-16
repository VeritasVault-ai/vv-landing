import { VotingData } from '../../lib/services/websocket-simulations/useVotingWebsocketSimulation';

// Initial WebSocket voting data
export const initialVotingData: VotingData = {
  status: 'active',
  activeProposals: [
    {
      id: 'prop-2023-05',
      title: 'Treasury Reallocation',
      description: 'Proposal to reallocate 5% of treasury to new liquidity pools',
      startTime: new Date(Date.now() - 86400000).toISOString(),
      endTime: new Date(Date.now() + 172800000).toISOString(),
      votes: {
        for: 1250000,
        against: 450000,
        abstain: 120000
      },
      quorum: 2000000,
      requiredMajority: 0.66
    },
    {
      id: 'prop-2023-06',
      title: 'Protocol Upgrade',
      description: 'Upgrade core protocol to v2.5 with enhanced security features',
      startTime: new Date(Date.now() - 172800000).toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      votes: {
        for: 1820000,
        against: 230000,
        abstain: 50000
      },
      quorum: 1500000,
      requiredMajority: 0.75
    }
  ],
  recentVotes: [
    {
      proposalId: 'prop-2023-05',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      vote: 'for',
      weight: 50000,
      anonymous: true
    },
    {
      proposalId: 'prop-2023-06',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      vote: 'against',
      weight: 25000,
      anonymous: false,
      voter: '0x1a2b...3c4d'
    }
  ],
  userVotingPower: 75000,
  userVotesCast: 1,
  votingStats: {
    totalProposals: 12,
    activeProposals: 2,
    participationRate: 0.68,
    averageTurnout: 0.72
  }
};