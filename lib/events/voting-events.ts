// src/lib/events/voting-event-emitter.ts
import { ActiveProposal, PastProposal, VotingOverview } from '@/lib/repositories/voting-repository';

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
  'proposal-updated': { proposal: ActiveProposal };
  'new-proposal': { proposal: ActiveProposal };
  'proposal-closed': {
    proposalId: string;
    result: 'passed' | 'failed';
    pastProposal: PastProposal;
  };
  'voting-power-changed': { overview: VotingOverview };
};

// Listener signature
export type VotingEventListener<T extends VotingEventType> = (
  payload: VotingEventPayload[T]
) => void;

/**
 * Voting event emitter for real-time updates across components
 */
export class VotingEventEmitter {
  // Use a Map to avoid key-indexing issues
  private listeners = new Map<VotingEventType, VotingEventListener<any>[]>();

  /**
   * Subscribe to a voting event
   */
  subscribe<T extends VotingEventType>(
    eventType: T,
    listener: VotingEventListener<T>
  ): () => void {
    const existing = this.listeners.get(eventType) ?? [];
    this.listeners.set(eventType, existing.concat(listener as VotingEventListener<any>));

    // Unsubscribe
    return () => {
      const updated = (this.listeners.get(eventType) ?? [])
        .filter(l => l !== listener);
      this.listeners.set(eventType, updated);
    };
  }

  /**
   * Emit a voting event to all subscribers, isolating failures
   */
  emit<T extends VotingEventType>(
    eventType: T,
    payload: VotingEventPayload[T]
  ): void {
    const listeners = (this.listeners.get(eventType) ?? []) as VotingEventListener<T>[];
    for (const listener of listeners) {
      try {
        listener(payload);
      } catch (error) {
        console.error(`Error in listener for event "${eventType}":`, error);
      }
    }
  }
}

// Export a singleton instance
export const votingEvents = new VotingEventEmitter();