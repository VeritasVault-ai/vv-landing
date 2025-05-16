import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

// Define types for voting data
export interface VotingData {
  status: string;
  activeProposals?: {
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
  }[];
  recentVotes?: {
    proposalId: string;
    timestamp: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
    anonymous: boolean;
    voter?: string;
  }[];
  userVotingPower?: number;
  userVotesCast?: number;
  votingStats?: {
    totalProposals: number;
    activeProposals: number;
    participationRate: number;
    averageTurnout: number;
  };
}

/**
 * Custom hook for simulating WebSocket connections for voting data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useVotingWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  const [data, setData] = useState<VotingData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSimulated, setIsSimulated] = useState(true);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      // Always use simulation mode in development
      setIsSimulated(true);
      startSimulation();
      
      // Skip actual WebSocket connection attempt in development
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      
      // In production, we would try to connect to the real WebSocket
      try {
        // Try to connect to the actual WebSocket endpoint
        const ws = new WebSocket('wss://your-api.com/voting');
        wsRef.current = ws;
        
        ws.onopen = () => {
          setIsSimulated(false);
          onStatusChange?.('connected');
        };
        
        ws.onmessage = (event) => {
          try {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);
          } catch (error) {
            console.error('Failed to parse WebSocket message');
          }
        };
        
        ws.onclose = (event) => {
          // Don't report error for normal closure
          if (event.code !== 1000) {
            onStatusChange?.('disconnected');
            
            // Fall back to simulation
            setIsSimulated(true);
            startSimulation();
          }
        };
        
        ws.onerror = () => {
          // Instead of logging the error object which can cause circular reference issues
          console.error('WebSocket connection error - falling back to simulation');
          onStatusChange?.('error');
          
          // Fall back to simulation
          setIsSimulated(true);
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
          startSimulation();
        };
      } catch (error) {
        console.error('WebSocket not available - using simulation instead');
        setIsSimulated(true);
        startSimulation();
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection - using simulation');
      onStatusChange?.('error');
      setIsSimulated(true);
      startSimulation();
    }
  }, [onStatusChange]);

  // Start the WebSocket simulation
  const startSimulation = useCallback(() => {
    onStatusChange?.('connected');
    
    // For simulation, fetch initial data from our mock API endpoint
    setTimeout(async () => {
      try {
        // Fetch initial data from our mock API endpoint
        const response = await fetch('/api/voting/websocket-data');
        if (!response.ok) {
          throw new Error('Failed to fetch initial voting data');
        }
        
        const initialData = await response.json();
        setData(initialData);
      
        // Start periodic updates
        startPeriodicUpdates();
      } catch (error) {
        console.error('Error fetching initial voting data:', error);
        // Fallback to empty data structure
        setData({
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
        });
      }
    }, 1000);
  }, [onStatusChange]);

  // Simulate periodic voting updates
  const startPeriodicUpdates = useCallback(() => {
    const updateInterval = setInterval(() => {
      if (!isSimulated) {
        clearInterval(updateInterval);
        return;
      }
      
      setData(prevData => {
        if (!prevData) return null;
        
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
                voter: anonymous ? undefined : `0x${Math.random().toString(16).substring(2, 10)}...`
              };
              
              // Submit the vote to our API endpoint
              submitVote(newVote);
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
      });
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(updateInterval);
  }, [isSimulated]);

  // Submit a vote to our API endpoint
  const submitVote = async (vote: {
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
  };

  // Manual reconnect function
  const reconnect = useCallback(() => {
    // Clear any pending reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    connect();
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect();
}
    
    // Clean up on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { 
    data, 
    reconnect,
    isSimulated,
    submitVote // Export the submitVote function for direct use
  };
}