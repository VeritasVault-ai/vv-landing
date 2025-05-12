// src/lib/services/useVotingWebSocketSimulation.ts
'use client'

import { useEffect } from 'react'
import { votingEvents } from '@/lib/events/voting-events'
import {
  ActiveProposal,
  PastProposal,
  VotingOverview,
} from '@/lib/repositories/voting-repository'
import { votingService } from './voting-service'

/** Parses `"7 days 5 hours"` → total hours (e.g. 173) */
function parseHours(timeStr: string): number {
  const m = timeStr.match(/(\d+)\s*days?\s*(\d+)\s*hours?/)
  if (!m) return 0
  const days = parseInt(m[1], 10)
  const hours = parseInt(m[2], 10)
  return days * 24 + hours
}

/** Formats hours → `"X days Y hours"` */
function formatHours(totalHours: number): string {
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  return `${days} days ${hours} hours`
}

export function useVotingWebSocketSimulation() {
  useEffect(() => {
    let isActive = true
    let votingPower: VotingOverview | null = null
    let activeProposals: ActiveProposal[] = []

    // Fetch initial data
    async function fetchInitialData() {
      try {
        votingPower = await votingService.getVotingOverview()
        activeProposals = await votingService.getActiveProposals()
      } catch (err) {
        console.error('Failed to fetch initial data:', err)
      }
    }
    fetchInitialData()

    // Every 15s: simulate vote activity & tick down timeRemaining
    const tickInterval = setInterval(() => {
      if (!isActive || activeProposals.length === 0) return

      activeProposals = activeProposals.flatMap((proposal) => {
        // 1) Apply random vote bump
        const isVoteFor = Math.random() > 0.5
        const bump = Math.floor(Math.random() * 50_000) + 10_000
        const votesFor   = isVoteFor ? proposal.votesFor + bump   : proposal.votesFor
        const votesAgainst = !isVoteFor ? proposal.votesAgainst + bump : proposal.votesAgainst
        const totalVotes = votesFor + votesAgainst

        // 2) Tick down timeRemaining by 1 hour
        const remainingHrs = Math.max(parseHours(proposal.timeRemaining) - 1, 0)
        const newTimeRem = formatHours(remainingHrs)

        const updated: ActiveProposal = {
          ...proposal,
          votesFor,
          votesAgainst,
          totalVotes,
          timeRemaining: newTimeRem,
        }

        // Emit the update
        votingEvents.emit('proposal-updated', { proposal: updated })

        // Check deterministic closure: either ran out of time or reached quorum
        const reachedQuorum = totalVotes >= proposal.quorum
        const timeUp = remainingHrs <= 0

        if (timeUp || reachedQuorum) {
          const passed = votesFor > votesAgainst
          const past: PastProposal = {
            id:        updated.id,
            title:     updated.title,
            result:    passed ? 'passed' : 'failed',
            date:      new Date().toISOString().split('T')[0],
            votesFor:  votesFor,
            votesAgainst: votesAgainst,
            yourVote:  updated.yourVote,
            category:  ['treasury','governance','technical','security'][Math.floor(Math.random() * 4)],
          }

          votingEvents.emit('proposal-closed', {
            proposalId: updated.id,
            result:     passed ? 'passed' : 'failed',
            pastProposal: past,
          })
          // Filter out closed proposal
          return []
        }

        return [updated]
      })
    }, 15_000)

    // Voting-power simulation unchanged…
    const powerInterval = setInterval(() => {
      if (!isActive || !votingPower) return

      const change = (Math.random() * 0.4) - 0.2
      const newPct = Math.min(100, Math.max(0, votingPower.votingPower.percentage + change))
      const newVotes = Math.round((newPct / 100) * votingPower.votingPower.totalVotes)

      const updated: VotingOverview = {
        ...votingPower,
        votingPower: { ...votingPower.votingPower, percentage: newPct, votes: newVotes },
        votingPowerDistribution: [
          { name: 'Your Voting Power', value: newPct },
          { name: 'Other Delegates',  value: Math.max(0, 100 - newPct - votingPower.votingPowerDistribution[2].value) },
          { name: 'Undelegated',      value: votingPower.votingPowerDistribution[2].value },
        ],
      }
      votingPower = updated
      votingEvents.emit('voting-power-changed', { overview: updated })
    }, 30_000)

    // New proposals simulation unchanged…
    const newPropInterval = setInterval(() => {
      if (!isActive || Math.random() > 0.1) return

      const lastId = activeProposals[0]?.id.match(/-(\d+)$/)?.[1]
        ? parseInt(activeProposals[0]!.id.split('-')[1], 10)
        : 25
      const idNum = lastId + 1
      const newProp: ActiveProposal = {
        id:            `VIP-${idNum}`,
        title:         `New ${['Treasury','Protocol','Security','Governance'][Math.floor(Math.random()*4)]} Proposal`,
        description:   'Fresh governance proposal.',
        status:        'active',
        timeRemaining: '7 days 0 hours',
        votesFor:      0,
        votesAgainst:  0,
        totalVotes:    0,
        quorum:        3_000_000,
        yourVote:      null,
      }

      activeProposals.unshift(newProp)
      votingEvents.emit('new-proposal', { proposal: newProp })
    }, 120_000)

    return () => {
      isActive = false
      clearInterval(tickInterval)
      clearInterval(powerInterval)
      clearInterval(newPropInterval)
    }
  }, [])
}
