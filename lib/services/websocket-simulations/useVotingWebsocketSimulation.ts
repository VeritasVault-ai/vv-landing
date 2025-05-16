import { VotingData, WebSocketStatus } from '@/types/websocket-data';
import { useCallback, useEffect, useRef } from 'react';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';

/**
 * Type for vote submission parameters
 */
interface VoteSubmission {
  proposalId: string;
  vote: 'for' | 'against' | 'abstain';
  weight: number;
}

/**
 * React hook that simulates a WebSocket connection for voting data, providing live updates, optimistic vote submission, and automatic reconnection.
 *
 * Periodically updates voting data with simulated changes and recent votes. Optimistically updates local state when a vote is submitted, then attempts to persist the vote via an API call. All in-flight vote submissions are aborted on unmount.
 *
 * @param onStatusChange - Optional callback invoked when the WebSocket connection status changes.
 * @returns An object containing the current voting data, a function to manually reconnect, a flag indicating simulation mode, and a function to submit votes.
 */
export function useVotingWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Ref to store abort controllers for in-flight requests
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  
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
  const submitVote = useCallback(async (vote: VoteSubmission): Promise<boolean> => {
    // Generate a unique ID for this request
    const requestId = `vote-${vote.proposalId}-${Date.now()}`;
    
    // Create a new AbortController for this request
    const abortController = new AbortController();
    abortControllersRef.current.set(requestId, abortController);
    
    try {
      const response = await fetch('/api/voting/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
        signal: abortController.signal
      });
      
      // Clean up the abort controller
      abortControllersRef.current.delete(requestId);
      
      if (!response.ok) {
        throw new Error(`Failed to submit vote: ${response.status} ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      // Don't log aborted requests as errors
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Vote submission aborted');
      } else {
        console.error('Error submitting vote:', error);
      }
      
      // Clean up the abort controller
      abortControllersRef.current.delete(requestId);
      
      return false;
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
          
          // Submit only the payload fields the API accepts - fixed type mismatch
          submitVote({
            proposalId: newVote.proposalId,
            vote: newVote.vote,
            weight: newVote.weight
          });
          
          updatedData.recentVotes.unshift(newVote);
          
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
  const submitUserVote = useCallback(async (vote: VoteSubmission): Promise<boolean> => {
    try {
      // Optimistically update UI
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
      
      // Submit the vote to the API
      const success = await submitVote(vote);
      
      // If submission failed, we could revert the optimistic update here
      if (!success) {
        console.warn('Vote submission failed, but optimistic UI update was not reverted');
        // Implement rollback logic if needed
      }
      
      return success;
    } catch (error) {
      console.error('Error submitting vote:', error);
      return false;
    }
  }, [submitVote, setData]);

  // Cancel all in-flight requests when component unmounts
  useEffect(() => {
    return () => {
      // Abort all in-flight requests
      abortControllersRef.current.forEach((controller, key) => {
        controller.abort();
        abortControllersRef.current.delete(key);
      });
    };
  }, []);

  return { 
    data, 
    reconnect,
    isSimulated,
    submitVote: submitUserVote // Export the enhanced submitVote function for direct use
  };
}