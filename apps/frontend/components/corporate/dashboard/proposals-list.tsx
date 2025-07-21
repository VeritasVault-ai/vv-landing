import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui";
import { Proposal } from "@/types/voting";
import { useState } from "react";
import styles from "./proposals-list.module.css";

interface ProposalsListProps {
  proposals: Proposal[];
  onVote?: (proposalId: string, voteType: 'for' | 'against' | 'abstain') => Promise<boolean>;
}

/**
 * Displays a list of active proposals with interactive voting controls and visual vote distribution.
 *
 * Renders each proposal with its title, description, vote counts, end date, and a progress bar showing vote percentages. If an `onVote` handler is provided, users can cast votes for each proposal, with voting state managed to prevent concurrent votes on the same proposal. Shows a loading overlay while a vote is being processed.
 *
 * @param proposals - Array of proposals to display.
 * @param onVote - Optional callback invoked when a user casts a vote on a proposal.
 *
 * @returns A card containing the proposals list, or `null` if no proposals are provided.
 *
 * @remark Prevents concurrent voting on the same proposal by disabling voting controls while a vote is in progress.
 */
export function ProposalsList({ proposals, onVote }: ProposalsListProps) {
  // Track proposals that are currently being voted on to prevent concurrent votes
  const [votingInProgress, setVotingInProgress] = useState<Record<string, boolean>>({});
  
  if (!proposals || proposals.length === 0) {
    return null;
  }
  
  // Handle voting with race condition protection
  const handleVote = async (proposalId: string, voteType: 'for' | 'against' | 'abstain') => {
    // If already voting on this proposal, prevent concurrent votes
    if (votingInProgress[proposalId]) {
      return;
    }
    
    try {
      // Lock this proposal for voting
      setVotingInProgress(prev => ({ ...prev, [proposalId]: true }));
      
      // If onVote handler is provided, call it
      if (onVote) {
        await onVote(proposalId, voteType);
      }
    } finally {
      // Always unlock the proposal when done, regardless of success/failure
      setVotingInProgress(prev => ({ ...prev, [proposalId]: false }));
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.container}>
          {proposals.map(proposal => {
            const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
            const safeTotal = totalVotes === 0 ? 1 : totalVotes; // prevent ÷0
            const forPercentage = (proposal.votes.for / safeTotal) * 100;
            const againstPercentage = (proposal.votes.against / safeTotal) * 100;
            const abstainPercentage = (proposal.votes.abstain / safeTotal) * 100;
            
            // Check if voting is in progress for this proposal
            const isVoting = votingInProgress[proposal.id] || false;
            
            return (
              <div key={proposal.id} className={styles.item}>
                <h3 className={styles.title}>{proposal.title}</h3>
                <p className={styles.description}>{proposal.description}</p>
                <div className={styles.stats}>
                  <div className={styles.voteCounts}>
                    <span 
                      className={`${styles.voteFor} ${onVote ? styles.clickable : ''}`}
                      onClick={() => onVote && handleVote(proposal.id, 'for')}
                      role={onVote ? "button" : undefined}
                      aria-disabled={isVoting}
                    >
                      For: {proposal.votes.for.toLocaleString()}
                    </span>
                    <span 
                      className={`${styles.voteAgainst} ${onVote ? styles.clickable : ''}`}
                      onClick={() => onVote && handleVote(proposal.id, 'against')}
                      role={onVote ? "button" : undefined}
                      aria-disabled={isVoting}
                    >
                      Against: {proposal.votes.against.toLocaleString()}
                    </span>
                    <span 
                      className={`${styles.voteAbstain} ${onVote ? styles.clickable : ''}`}
                      onClick={() => onVote && handleVote(proposal.id, 'abstain')}
                      role={onVote ? "button" : undefined}
                      aria-disabled={isVoting}
                    >
                      Abstain: {proposal.votes.abstain.toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.endDate}>
                    Ends: {new Date(proposal.endTime).toLocaleDateString()}
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFor} 
                    style={{ width: `${forPercentage}%` }}
                  ></div>
                  <div 
                    className={styles.progressAgainst} 
                    style={{ width: `${againstPercentage}%` }}
                  ></div>
                  <div 
                    className={styles.progressAbstain} 
                    style={{ width: `${abstainPercentage}%` }}
                  ></div>
                </div>
                
                {/* Show loading indicator when voting is in progress */}
                {isVoting && (
                  <div className={styles.votingOverlay}>
                    <span className={styles.votingSpinner}></span>
                    <span>Processing vote...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}