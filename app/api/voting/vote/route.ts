import { NextRequest, NextResponse } from 'next/server';
import { votingRepository } from '@/lib/repositories/voting-repository';

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