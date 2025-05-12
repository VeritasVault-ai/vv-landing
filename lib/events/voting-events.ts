import { ActiveProposal, PastProposal, VotingOverview } from "@/lib/repositories/voting-repository";

// Define event types
export type VotingEventType = 
  | 'vote-submitted'
  | 'proposal-updated'
  | 'new-proposal'
  | 'proposal-closed'
  | 'voting-power-changed';

// Define event payload types
export type VotingEventPayload = {
  'vote-submitted': {
    proposalId: string;
    vote: 'for' | 'against' | null;
    updatedProposals: ActiveProposal[];
  };
  'proposal-updated': {
    proposal: ActiveProposal;
  };
  'new-proposal': {
    proposal: ActiveProposal;
  };
  'proposal-closed': {
    proposalId: string;
    result: 'passed' | 'failed';
    pastProposal: PastProposal;
  };
  'voting-power-changed': {
    overview: VotingOverview;
  };
};

// Define event listener type
export type VotingEventListener<T extends VotingEventType> = (
  payload: VotingEventPayload[T]
) => void;

/**
 * Voting event emitter for real-time updates across components
 */
class VotingEventEmitter {
  private listeners: {
    [K in VotingEventType]?: VotingEventListener<K>[];
  } = {};

  /**
   * Subscribe to a voting event
   */
  subscribe<T extends VotingEventType>(
    eventType: T,
    listener: VotingEventListener<T>
  ): () => void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    
    // Add the listener
    (this.listeners[eventType] as VotingEventListener<T>[]).push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners[eventType] = (this.listeners[eventType] as VotingEventListener<T>[])
        .filter(l => l !== listener);
    };
  }

  /**
   * Emit a voting event to all subscribers
   */
  emit<T extends VotingEventType>(
    eventType: T,
    payload: VotingEventPayload[T]
  ): void {
    if (!this.listeners[eventType]) {
      return;
    }
    
    (this.listeners[eventType] as VotingEventListener<T>[]).forEach(listener => {
      listener(payload);
    });
  }
}

// Export a singleton instance
export const votingEvents = new VotingEventEmitter();