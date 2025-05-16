import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./proposals-list.module.css";

interface ProposalVotes {
  for: number;
  against: number;
  abstain: number;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  endTime: string;
  votes: ProposalVotes;
}

interface ProposalsListProps {
  proposals: Proposal[];
}

export function ProposalsList({ proposals }: ProposalsListProps) {
  if (!proposals || proposals.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.container}>
          {proposals.map(proposal => {
            const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
            const forPercentage = (proposal.votes.for / totalVotes) * 100;
            const againstPercentage = (proposal.votes.against / totalVotes) * 100;
            const abstainPercentage = (proposal.votes.abstain / totalVotes) * 100;
            
            return (
              <div key={proposal.id} className={styles.item}>
                <h3 className={styles.title}>{proposal.title}</h3>
                <p className={styles.description}>{proposal.description}</p>
                <div className={styles.stats}>
                  <div className={styles.voteCounts}>
                    <span className={styles.voteFor}>
                      For: {proposal.votes.for.toLocaleString()}
                    </span>
                    <span className={styles.voteAgainst}>
                      Against: {proposal.votes.against.toLocaleString()}
                    </span>
                    <span className={styles.voteAbstain}>
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
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}