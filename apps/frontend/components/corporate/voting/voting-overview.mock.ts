import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"

/**
 * Mock data for the VotingOverview component.
 * Used as fallback when API calls fail or during development.
 */
export const mockVotingOverview: VotingOverviewType = {
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
}