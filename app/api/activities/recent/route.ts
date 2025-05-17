import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock data for recent activities
  const mockData = {
    activities: [
      {
        id: '1',
        type: 'transaction',
        title: 'Liquidity Added',
        description: 'Added liquidity to XTZ/USDT pool',
        amount: 25000,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'completed',
      },
      {
        id: '2',
        type: 'governance',
        title: 'Vote Cast',
        description: 'Voted on proposal XP-23',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
      },
      {
        id: '3',
        type: 'transaction',
        title: 'Rewards Claimed',
        description: 'Claimed staking rewards',
        amount: 1250,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        status: 'completed',
      },
      {
        id: '4',
        type: 'transaction',
        title: 'Strategy Deployed',
        description: 'Deployed funds to yield farming strategy',
        amount: 50000,
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        status: 'completed',
      },
    ]
  };
  
  return NextResponse.json(mockData);
}