import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { activityRepository } from "@/lib/repository/activity-repository"

export async function GET(request: NextRequest) {
  // Get filter from query params
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';

  // Mock data for activities
  const allActivities = [
    {
      id: '1',
      type: 'deposit',
      description: 'Added liquidity to XTZ/USDT pool',
      amount: 25000,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed',
    },
    {
      id: '2',
      type: 'governance',
      description: 'Voted on proposal XP-23',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdrawal',
      description: 'Claimed staking rewards',
      amount: 1250,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      status: 'completed',
    },
    {
      id: '4',
      type: 'swap',
      description: 'Swapped ETH for XTZ',
      amount: 5000,
      timestamp: new Date(Date.now() - 200000000).toISOString(),
      status: 'completed',
    },
    {
      id: '5',
      type: 'stake',
      description: 'Staked XTZ in baker pool',
      amount: 10000,
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      status: 'completed',
    },
  ];

  // Filter activities if needed
  let filteredActivities;
  if (filter !== 'all') {
    filteredActivities = allActivities.filter(activity => activity.type.toLowerCase() === filter.toLowerCase());
  } else {
    filteredActivities = allActivities;
  }

  return NextResponse.json(filteredActivities);
}
