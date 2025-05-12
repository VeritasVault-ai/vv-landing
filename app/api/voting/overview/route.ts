import { NextResponse } from 'next/server';
import { votingRepository } from '@/lib/repositories/voting-repository';

/**
 * Handles GET requests for the voting overview API route.
 *
 * Retrieves voting overview data and returns it as a JSON response. If data retrieval fails, responds with an error message and a 500 status code.
 *
 * @returns A JSON response containing voting overview data or an error message with a 500 status code on failure.
 */
export async function GET() {
  try {
    const data = await votingRepository.getVotingOverview();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voting overview data' },
      { status: 500 }
    );
  }
}