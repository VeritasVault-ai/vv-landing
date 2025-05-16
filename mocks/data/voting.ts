import { VotingData } from '../../lib/services/websocket-simulations/useVotingWebsocketSimulation';
import { VotingOverview } from "@/lib/repositories/voting-repository";

/**
 * Initial WebSocket voting data
 */
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

/**
 * Mock data for voting overview
 */
export const MOCK_VOTING_OVERVIEW: VotingOverview = {
  votingPower: {
    percentage: 5.2,
    votes: 52000,
    totalVotes: 1000000
  },
  participation: {
    participated: 12,
    totalProposals: 15,
    rate: 80,
    comparedToAverage: 15
  },
  votingPowerDistribution: [
    { name: "Core Team", value: 15 },
    { name: "Community", value: 45 },
    { name: "Treasury", value: 40 }
  ],
  delegations: [
    { address: "0x1a2...3b4c", timeAgo: "2 days ago", votes: 12000 },
    { address: "0x5d6...7e8f", timeAgo: "1 week ago", votes: 8000 },
    { address: "0x9a0...1b2c", timeAgo: "3 weeks ago", votes: 5000 }
  ]
};

/**
 * Chart colors for voting-related visualizations
 */
export const VOTING_CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

/**
 * Mock voting history data
 */
export const MOCK_VOTING_HISTORY = [
  {
    id: 'prop-2023-04',
    title: 'Parameter Adjustment',
    description: 'Adjust interest rate parameters for stability',
    result: 'passed',
    votedOption: 'for',
    votingPower: 52000,
    endDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    votes: {
      for: 1650000,
      against: 350000,
      abstain: 75000
    }
  },
  {
    id: 'prop-2023-03',
    title: 'New Collateral Types',
    description: 'Add support for new collateral assets',
    result: 'passed',
    votedOption: 'abstain',
    votingPower: 52000,
    endDate: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    votes: {
      for: 1850000,
      against: 150000,
      abstain: 200000
    }
  },
  {
    id: 'prop-2023-02',
    title: 'Governance Process Update',
    description: 'Update the governance process for more efficiency',
    result: 'failed',
    votedOption: 'against',
    votingPower: 52000,
    endDate: new Date(Date.now() - 1814400000).toISOString(), // 3 weeks ago
    votes: {
      for: 950000,
      against: 1050000,
      abstain: 100000
    }
  }
];

/**
 * Mock proposal templates
 */
export const MOCK_PROPOSAL_TEMPLATES = [
  {
    id: 'template-1',
    name: 'Parameter Change',
    description: 'Template for proposing parameter changes to the protocol',
    fields: [
      { name: 'parameterName', label: 'Parameter Name', type: 'text', required: true },
      { name: 'currentValue', label: 'Current Value', type: 'text', required: true },
      { name: 'proposedValue', label: 'Proposed Value', type: 'text', required: true },
      { name: 'justification', label: 'Justification', type: 'textarea', required: true }
    ]
  },
  {
    id: 'template-2',
    name: 'Treasury Allocation',
    description: 'Template for proposing treasury fund allocations',
    fields: [
      { name: 'amount', label: 'Amount (USD)', type: 'number', required: true },
      { name: 'recipient', label: 'Recipient Address', type: 'text', required: true },
      { name: 'purpose', label: 'Purpose', type: 'textarea', required: true },
      { name: 'timeline', label: 'Timeline', type: 'text', required: true }
    ]
  },
  {
    id: 'template-3',
    name: 'Protocol Upgrade',
    description: 'Template for proposing protocol upgrades',
    fields: [
      { name: 'version', label: 'New Version', type: 'text', required: true },
      { name: 'changes', label: 'Key Changes', type: 'textarea', required: true },
      { name: 'securityAudit', label: 'Security Audit Link', type: 'text', required: true },
      { name: 'deploymentPlan', label: 'Deployment Plan', type: 'textarea', required: true }
    ]
  }
];