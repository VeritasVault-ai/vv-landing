"use client"

import { useEffect } from "react"
import { votingEvents } from "@/lib/events/voting-events"
import { ActiveProposal, PastProposal, VotingOverview } from "@/lib/repositories/voting-repository"
import { votingService } from "./voting-service"

/**
 * This service simulates WebSocket events for demonstration purposes.
 * In a real application, this would be replaced with an actual WebSocket connection.
 */
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
      } catch (error) {
        console.error("Failed to fetch initial data for simulation:", error)
      }
    }

    fetchInitialData()

    // Simulate proposal updates
    const proposalUpdateInterval = setInterval(() => {
      if (!isActive || !activeProposals.length) return

      // Randomly select a proposal to update
      const randomIndex = Math.floor(Math.random() * activeProposals.length)
      const proposalToUpdate = activeProposals[randomIndex]

      // Randomly decide whether to add votes for or against
      const isVoteFor = Math.random() > 0.5
      const voteAmount = Math.floor(Math.random() * 50000) + 10000 // Random votes between 10k and 60k

      // Create updated proposal
      const updatedProposal: ActiveProposal = {
        ...proposalToUpdate,
        votesFor: isVoteFor ? proposalToUpdate.votesFor + voteAmount : proposalToUpdate.votesFor,
        votesAgainst: !isVoteFor ? proposalToUpdate.votesAgainst + voteAmount : proposalToUpdate.votesAgainst
      }

      // Update our local cache
      activeProposals[randomIndex] = updatedProposal

      // Emit the update event
      votingEvents.emit('proposal-updated', { proposal: updatedProposal })

      // Check if proposal has reached conclusion (30% chance after quorum)
      const totalVotes = updatedProposal.votesFor + updatedProposal.votesAgainst
      if (totalVotes >= updatedProposal.quorum && Math.random() < 0.05) {
        // Convert to past proposal
        const pastProposal: PastProposal = {
          id: updatedProposal.id,
          title: updatedProposal.title,
          result: updatedProposal.votesFor > updatedProposal.votesAgainst ? 'passed' : 'failed',
          date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
          votesFor: updatedProposal.votesFor,
          votesAgainst: updatedProposal.votesAgainst,
          yourVote: updatedProposal.yourVote,
          category: ['treasury', 'governance', 'technical', 'security'][Math.floor(Math.random() * 4)]
        }

        // Emit proposal closed event
        votingEvents.emit('proposal-closed', {
          proposalId: updatedProposal.id,
          result: pastProposal.result,
          pastProposal
        })

        // Remove from our local cache
        activeProposals = activeProposals.filter(p => p.id !== updatedProposal.id)
      }
    }, 15000) // Update every 15 seconds

    // Simulate voting power changes
    const votingPowerInterval = setInterval(() => {
      if (!isActive || !votingPower) return

      // Small random change to voting power (±0.2%)
      const change = (Math.random() * 0.4) - 0.2
      const newPercentage = Math.max(0, Math.min(100, votingPower.votingPower.percentage + change))
      
      // Calculate new vote count based on percentage
      const newVotes = Math.round((newPercentage / 100) * votingPower.votingPower.totalVotes)
      
      // Create updated voting power data
      const updatedVotingPower: VotingOverview = {
        ...votingPower,
        votingPower: {
          ...votingPower.votingPower,
          percentage: newPercentage,
          votes: newVotes
        },
        votingPowerDistribution: [
          { name: "Your Voting Power", value: newPercentage },
          { name: "Other Delegates", value: Math.max(0, 100 - newPercentage - votingPower.votingPowerDistribution[2].value) },
          { name: "Undelegated", value: votingPower.votingPowerDistribution[2].value }
        ]
      }

      // Update our local cache
      votingPower = updatedVotingPower

      // Emit the update event
      votingEvents.emit('voting-power-changed', { overview: updatedVotingPower })
    }, 30000) // Update every 30 seconds

    // Simulate new proposals (every 2 minutes, 10% chance)
    const newProposalInterval = setInterval(() => {
      if (!isActive || Math.random() > 0.1) return

      // Generate a new proposal ID
      const lastId = activeProposals.length > 0 
        ? parseInt(activeProposals[0].id.split('-')[1]) 
        : 25
      const newId = `VIP-${lastId + 1}`

      // Create a new proposal
      const newProposal: ActiveProposal = {
        id: newId,
        title: `New ${['Treasury', 'Protocol', 'Security', 'Governance'][Math.floor(Math.random() * 4)]} Proposal`,
        description: `This is a newly created proposal that was just submitted to the governance system.`,
        status: "active",
        timeRemaining: "7 days 0 hours",
        votesFor: 0,
        votesAgainst: 0,
        totalVotes: 10000000,
        quorum: 3000000,
        yourVote: null
      }

      // Add to our local cache
      activeProposals = [newProposal, ...activeProposals]

      // Emit the new proposal event
      votingEvents.emit('new-proposal', { proposal: newProposal })
    }, 120000) // Check every 2 minutes

    // Clean up intervals when component unmounts
    return () => {
      isActive = false
      clearInterval(proposalUpdateInterval)
      clearInterval(votingPowerInterval)
      clearInterval(newProposalInterval)
    }
  }, [])
}