"use client"

import { useDashboardData } from "@/lib/hooks/useDashboardData"
import { ProposalsList } from "@/components/corporate/dashboard/proposals-list"

/**
 * Dashboard voting component that shows governance proposals and voting activity
 */
export function DashboardVoting() {
  const { votingData, isVotingSimulated } = useDashboardData()
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Governance</h2>
      
      {/* Voting stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Voting Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Total Proposals</div>
            <div className="text-xl font-semibold">{votingData?.votingStats?.totalProposals || 0}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Active Proposals</div>
            <div className="text-xl font-semibold">{votingData?.votingStats?.activeProposals || 0}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Participation Rate</div>
            <div className="text-xl font-semibold">
              {votingData?.votingStats?.participationRate 
                ? `${(votingData.votingStats.participationRate * 100).toFixed(1)}%` 
                : '0%'}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Average Turnout</div>
            <div className="text-xl font-semibold">
              {votingData?.votingStats?.averageTurnout 
                ? `${(votingData.votingStats.averageTurnout * 100).toFixed(1)}%` 
                : '0%'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active proposals */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Active Proposals</h3>
        {votingData?.activeProposals && votingData.activeProposals.length > 0 ? (
          <ProposalsList proposals={votingData.activeProposals} />
        ) : (
          <div className="flex items-center justify-center h-32 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <p className="text-slate-500">No active proposals</p>
          </div>
        )}
      </div>
      
      {/* Recent votes */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Recent Votes</h3>
        {votingData?.recentVotes && votingData.recentVotes.length > 0 ? (
          <div className="space-y-4">
            {votingData.recentVotes.map((vote, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Proposal #{vote.proposalId}</div>
                  <div className="text-sm text-slate-500">
                    {vote.anonymous ? 'Anonymous' : vote.voter || 'Unknown voter'}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-sm font-medium ${
                    vote.vote === 'for' ? 'text-green-600' : 
                    vote.vote === 'against' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {vote.vote.toUpperCase()}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(vote.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <p className="text-slate-500">No recent votes</p>
          </div>
        )}
      </div>
      
      {isVotingSimulated && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1">
          <span>⚠️</span>
          <span>Using simulated voting data</span>
        </div>
      )}
    </div>
  )
}