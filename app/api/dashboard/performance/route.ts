import { NextResponse } from 'next/server';
import { dashboardRepository } from '@/lib/repositories/dashboard-repository';

export async function GET() {
  try {
    const data = await dashboardRepository.getDashboardPerformance();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard performance data' },
      { status: 500 }
    );
  }
}