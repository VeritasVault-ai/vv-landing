"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { ActiveProposal } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"
import { VoteProgress } from "./vote-progress"
import { toast } from "@/components/ui/use-toast"

interface ProposalCardProps {
  proposal: ActiveProposal
}

/**
 * Renders a card interface for an active proposal, allowing users to view details and submit or change their vote.
 *
 * Displays the proposal's title, description, ID, remaining time, and current voting progress. Users can vote "for," "against," or remove their vote, with real-time feedback and notifications on submission status.
 *
 * @param proposal - The active proposal to display and interact with.
 */
export function ProposalCard({ proposal }: ProposalCardProps) {
  const [isVoting, setIsVoting] = useState(false)
  
  const handleVote = async (vote: 'for' | 'against' | null) => {
    try {
      setIsVoting(true)
      
      const result = await votingService.submitVote(proposal.id, vote)
      
      // Emit event for real-time updates
      votingEvents.emit('vote-submitted', {
        proposalId: proposal.id,
        vote,
        updatedProposals: result.proposals
      })
      
      // Show success message
      toast({
        title: "Vote recorded",
        description: vote === null 
          ? "Your vote has been removed." 
          : `You voted ${vote} this proposal.`,
        variant: "default",
      })
    } catch (err) {
      console.error('Error voting on proposal:', err)
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Card className={proposal.yourVote ? "border-l-4 border-l-blue-500" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{proposal.title}</CardTitle>
              <Badge variant="outline">{proposal.id}</Badge>
            </div>
            <CardDescription className="mt-1">{proposal.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {proposal.timeRemaining} left
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <VoteProgress proposal={proposal} />

          {proposal.yourVote && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
              <span className="font-medium">Your vote:</span>{" "}
              {proposal.yourVote === "for" ? (
                <span className="text-green-600 dark:text-green-500">For</span>
              ) : (
                <span className="text-red-600 dark:text-red-500">Against</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2">
        {!proposal.yourVote ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleVote("against")}
              className="flex items-center gap-1"
              disabled={isVoting}
            >
              <XCircle className="h-4 w-4" />
              <span>{isVoting ? "Processing..." : "Vote Against"}</span>
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleVote("for")}
              className="flex items-center gap-1"
              disabled={isVoting}
            >
              <CheckCircle className="h-4 w-4" />
              <span>{isVoting ? "Processing..." : "Vote For"}</span>
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleVote(null)}
            disabled={isVoting}
          >
            {isVoting ? "Processing..." : "Change Vote"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}