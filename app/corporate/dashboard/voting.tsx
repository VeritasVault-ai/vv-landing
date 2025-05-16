"use client"

import { useDashboardData } from "@/lib/hooks/useDashboardData"
import { ProposalsList } from "@/components/corporate/dashboard/proposals-list"
import styles from "./voting.module.css"

/**
 * Displays governance voting statistics, active proposals, and recent voting activity on the dashboard.
 *
 * Renders sections for voting statistics, a list of active proposals, and recent votes, each with fallback UI if data is unavailable. Shows a warning if simulated voting data is in use.
 *
 * @remark
 * If voting data is simulated, a warning message is displayed to inform users.
 */
export function DashboardVoting() {
  const { votingData, isVotingSimulated } = useDashboardData()
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Governance</h2>
      
      {/* Voting stats */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Voting Statistics</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Total Proposals</div>
            <div className={styles.statValue}>{votingData?.votingStats?.totalProposals || 0}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Active Proposals</div>
            <div className={styles.statValue}>{votingData?.votingStats?.activeProposals || 0}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Participation Rate</div>
            <div className={styles.statValue}>
              {votingData?.votingStats?.participationRate 
                ? `${(votingData.votingStats.participationRate * 100).toFixed(1)}%` 
                : '0%'}
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Average Turnout</div>
            <div className={styles.statValue}>
              {votingData?.votingStats?.averageTurnout 
                ? `${(votingData.votingStats.averageTurnout * 100).toFixed(1)}%` 
                : '0%'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active proposals */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Active Proposals</h3>
        {votingData?.activeProposals && votingData.activeProposals.length > 0 ? (
          <ProposalsList proposals={votingData.activeProposals} />
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No active proposals</p>
          </div>
        )}
      </div>
      
      {/* Recent votes */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Recent Votes</h3>
        {votingData?.recentVotes && votingData.recentVotes.length > 0 ? (
          <div className={styles.votesList}>
            {votingData.recentVotes.map((vote, index) => (
              <div key={`${vote.proposalId}-${vote.timestamp}`} className={styles.voteItem}>
                <div>
                  <div className={styles.voteInfo}>Proposal #{vote.proposalId}</div>
                  <div className={styles.voterInfo}>
                    {vote.anonymous ? 'Anonymous' : vote.voter || 'Unknown voter'}
                  </div>
                </div>
                <div className={styles.voteActions}>
                  <div className={
                    vote.vote === 'for' ? styles.voteTypeFor : 
                    vote.vote === 'against' ? styles.voteTypeAgainst : 
                    styles.voteTypeAbstain
                  }>
                    {vote.vote.toUpperCase()}
                  </div>
                  <div className={styles.voteTimestamp}>
                    {new Date(vote.timestamp).toLocaleString()}
                </div>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No recent votes</p>
      </div>
        )}
        </div>
      
      {isVotingSimulated && (
        <div className={styles.simulationWarning}>
          <span>⚠️</span>
          <span>Using simulated voting data</span>
    </div>
      )}
    </div>
  )
}