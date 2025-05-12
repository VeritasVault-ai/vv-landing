"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ActiveProposal } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"
import { ProposalCard } from "./proposals/proposal-card"
import { EmptyState } from "@/components/ui/empty-state"

/**
 * Displays a real-time list of active voting proposals with automatic updates.
 *
 * Fetches active proposals on mount and subscribes to voting-related events to keep the list current. Handles loading and error states, and renders a message if no proposals are available.
 */
export function ActiveProposals() {
  const [proposals, setProposals] = useState<ActiveProposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await votingService.getActiveProposals()
        setProposals(data)
      } catch (err) {
        console.error('Error fetching active proposals:', err)
        setError('Failed to load active proposals. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to vote-submitted events to update proposals in real-time
    const voteSubscription = votingEvents.subscribe('vote-submitted', ({ updatedProposals }) => {
      setProposals(updatedProposals)
    })

    // Subscribe to proposal-updated events
    const updateSubscription = votingEvents.subscribe('proposal-updated', ({ proposal }) => {
      setProposals(prevProposals => 
        prevProposals.map(p => p.id === proposal.id ? proposal : p)
      )
    })

    // Subscribe to new-proposal events
    const newProposalSubscription = votingEvents.subscribe('new-proposal', ({ proposal }) => {
      setProposals(prevProposals => [proposal, ...prevProposals])
    })

    // Subscribe to proposal-closed events to remove closed proposals
    const closedSubscription = votingEvents.subscribe('proposal-closed', ({ proposalId }) => {
      setProposals(prevProposals => prevProposals.filter(p => p.id !== proposalId))
    })

    // Clean up subscriptions when component unmounts
    return () => {
      voteSubscription()
      updateSubscription()
      newProposalSubscription()
      closedSubscription()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-slate-600 dark:text-slate-400">Loading active proposals...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    )
  }

  if (proposals.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2">No Active Proposals</h3>
        <p className="text-slate-600 dark:text-slate-400">There are currently no active proposals to vote on.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  )
}