"use client"

import { CheckCircle, AlertCircle } from "lucide-react"
import { ActiveProposal } from "@/lib/repositories/voting-repository"

interface VoteProgressProps {
  proposal: ActiveProposal
}

/**
 * Displays a visual summary of voting progress for a proposal, including vote percentages, quorum status, and a progress bar.
 *
 * Renders the proportion of votes for and against, indicates whether quorum has been reached, and shows both percentage and absolute counts for each voting option.
 */
export function VoteProgress({ proposal }: VoteProgressProps) {
  const votesForPercentage = (proposal.votesFor / proposal.totalVotes) * 100
  const votesAgainstPercentage = (proposal.votesAgainst / proposal.totalVotes) * 100
  const quorumPercentage = (proposal.quorum / proposal.totalVotes) * 100
  const totalVotesPercentage = ((proposal.votesFor + proposal.votesAgainst) / proposal.totalVotes) * 100
  const quorumReached = (proposal.votesFor + proposal.votesAgainst) >= proposal.quorum

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>Votes</span>
        <span>
          {quorumReached ? (
            <span className="flex items-center text-green-600 dark:text-green-500">
              <CheckCircle className="h-4 w-4 mr-1" />
              Quorum Reached
            </span>
          ) : (
            <span className="flex items-center text-amber-600 dark:text-amber-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              Quorum: {(totalVotesPercentage).toFixed(1)}% of {quorumPercentage.toFixed(1)}% needed
            </span>
          )}
        </span>
      </div>
      
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 rounded-full" 
          style={{ width: `${votesForPercentage}%` }}
        />
        <div 
          className="h-full bg-red-500 rounded-full -mt-2" 
          style={{ width: `${votesAgainstPercentage}%`, marginLeft: `${votesForPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm mt-1">
        <span className="text-green-600 dark:text-green-500">
          For: {votesForPercentage.toFixed(1)}% ({proposal.votesFor.toLocaleString()})
        </span>
        <span className="text-red-600 dark:text-red-500">
          Against: {votesAgainstPercentage.toFixed(1)}% ({proposal.votesAgainst.toLocaleString()})
        </span>
      </div>
    </div>
  )
}