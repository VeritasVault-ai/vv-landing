import { NextRequest, NextResponse } from 'next/server';
import { votingRepository } from '@/lib/repositories/voting-repository';

/**
 * Handles POST requests to update or remove a user's vote on a proposal.
 *
 * Validates the presence and correctness of `proposalId` and `vote` in the request body. Accepts votes of "for", "against", or `null` (to remove a vote). Updates the vote using the voting repository and returns the updated proposals data.
 *
 * @returns A JSON response indicating success or failure, with an appropriate message and the updated proposals data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, vote } = body;
    
    // Validate required fields
    if (!proposalId || vote === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: proposalId and vote' },
        { status: 400 }
      );
    }
    
    // Validate vote value
    if (vote !== 'for' && vote !== 'against' && vote !== null) {
      return NextResponse.json(
        { error: 'Vote must be "for", "against", or null' },
        { status: 400 }
      );
    }
    
    // Update the vote
    const updatedProposals = await votingRepository.updateVote(proposalId, vote);
    
    return NextResponse.json({
      success: true,
      message: `Vote ${vote === null ? 'removed' : 'recorded'} successfully`,
      proposals: updatedProposals
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update vote' },
      { status: 500 }
    );
  }
}