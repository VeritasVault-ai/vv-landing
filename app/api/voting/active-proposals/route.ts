import { NextResponse } from 'next/server';
import { votingRepository } from '@/lib/repositories/voting-repository';

export async function GET() {
  try {
    const data = await votingRepository.getActiveProposals();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active proposals data' },
      { status: 500 }
    );
  }
}