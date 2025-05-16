import { useCallback } from 'react';
import { WebSocketStatus, VotingData } from '@/types/websocket-data';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';
/**
 * Custom hook for simulating WebSocket connections for voting data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useVotingWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Create initial data function
  const getInitialData = useCallback(async (): Promise<VotingData> => {
    // For simulation, we'll return an empty structure
    // The actual data will be fetched from the API endpoint
    return {
      status: 'active',
      activeProposals: [],
      recentVotes: [],
      userVotingPower: 0,
      userVotesCast: 0,
      votingStats: {
        totalProposals: 0,
        activeProposals: 0,
        participationRate: 0,
        averageTurnout: 0
      }
    };
  }, []);

  // Submit a vote to our API endpoint - memoized to prevent stale closures
  const submitVote = useCallback(async (vote: {
    proposalId: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
  }) => {
    try {
      await fetch('/api/voting/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
      });
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  }, []);

  // Create update function for periodic updates
  const updateDataPeriodically = useCallback((prevData: VotingData): VotingData => {
    // Deep clone the previous data to avoid mutation
    const updatedData = JSON.parse(JSON.stringify(prevData)) as VotingData;
    
    // Update vote counts randomly
    if (updatedData.activeProposals) {
      updatedData.activeProposals.forEach(proposal => {
        // Random vote changes
        const forChange = Math.floor(Math.random() * 15000);
        const againstChange = Math.floor(Math.random() * 8000);
        const abstainChange = Math.floor(Math.random() * 2000);
        
        proposal.votes.for += forChange;
        proposal.votes.against += againstChange;
        proposal.votes.abstain += abstainChange;
        
        // Add a new recent vote
        if (updatedData.recentVotes && Math.random() > 0.5) {
          const voteType = Math.random() > 0.6 ? 'for' : 
                          Math.random() > 0.3 ? 'against' : 'abstain';
          const weight = Math.floor(Math.random() * 30000) + 5000;
          const anonymous = Math.random() > 0.5;
          
          // Create a new vote
          const newVote = {
            proposalId: proposal.id,
            timestamp: new Date().toISOString(),
            vote: voteType as 'for' | 'against' | 'abstain',
            weight,
            anonymous,
            voter: anonymous
              ? undefined
              : `0x${Math.random().toString(16).substring(2, 10)}...`
          };
          
          // Submit only the payload fields the API accepts
          submitVote({
            proposalId: newVote.proposalId,
            vote: newVote.vote,
            weight: newVote.weight
          });
          updatedData.recentVotes.unshift(newVote);
        }
          
          // Keep only the 5 most recent votes
          if (updatedData.recentVotes.length > 5) {
            updatedData.recentVotes = updatedData.recentVotes.slice(0, 5);
          }
        }
      });
    }
    
    // Update voting stats
    if (updatedData.votingStats) {
      updatedData.votingStats.participationRate = Math.min(
        1, 
        updatedData.votingStats.participationRate + (Math.random() * 0.02 - 0.01)
      );
    }
    
    return updatedData;
  }, [submitVote]); // Include submitVote in dependencies

  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated, setData } = useBaseWebSocketSimulation<VotingData>({
    endpoint: 'wss://your-api.com/voting',
    onStatusChange,
    getInitialData,
    updateDataPeriodically,
    updateInterval: 15000, // Update every 15 seconds
    fetchInitialData: true,
    initialDataEndpoint: '/api/voting/websocket-data'
  });

  // Enhanced submitVote function that also updates local state
  const submitUserVote = useCallback(async (vote: {
    proposalId: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
  }) => {
    try {
      await submitVote(vote);
      
      // Update local data to reflect the vote
      setData(prevData => {
        if (!prevData) return null;
        
        // Deep clone the previous data to avoid mutation
        const updatedData = JSON.parse(JSON.stringify(prevData)) as VotingData;
        
        // Find the proposal and update its votes
        const proposal = updatedData.activeProposals?.find(p => p.id === vote.proposalId);
        if (proposal) {
          proposal.votes[vote.vote] += vote.weight;
        }
        
        // Add to recent votes
        if (updatedData.recentVotes) {
          const newVote = {
            proposalId: vote.proposalId,
            timestamp: new Date().toISOString(),
            vote: vote.vote,
            weight: vote.weight,
            anonymous: false,
            voter: `You` // Indicate this was the user's vote
          };
          
          updatedData.recentVotes.unshift(newVote);
          
          // Keep only the 5 most recent votes
          if (updatedData.recentVotes.length > 5) {
            updatedData.recentVotes = updatedData.recentVotes.slice(0, 5);
          }
        }
        
        // Update user votes cast
        if (updatedData.userVotesCast !== undefined) {
          updatedData.userVotesCast += 1;
        }
        
        return updatedData;
      });
      
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  }, [submitVote, setData]);

  return { 
    data, 
    reconnect,
    isSimulated,
    submitVote: submitUserVote // Export the enhanced submitVote function for direct use
  };
}
