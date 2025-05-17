import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock data for upcoming events
  const mockData = {
    events: [
      {
        id: '1',
        title: 'Quarterly Treasury Review',
        description: 'Review of Q2 treasury performance and allocation strategy',
        date: new Date(Date.now() + 86400000).toISOString(),
        type: 'meeting',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Governance Proposal Deadline',
        description: 'Last day to submit proposals for next voting round',
        date: new Date(Date.now() + 259200000).toISOString(),
        type: 'deadline',
        priority: 'medium',
      },
      {
        id: '3',
        title: 'New Liquidity Pool Launch',
        description: 'Launch of ETH/XTZ liquidity pool with boosted rewards',
        date: new Date(Date.now() + 432000000).toISOString(),
        type: 'launch',
        priority: 'high',
      },
      {
        id: '4',
        title: 'Risk Assessment Report',
        description: 'Monthly risk assessment of all active strategies',
        date: new Date(Date.now() + 604800000).toISOString(),
        type: 'report',
        priority: 'medium',
      },
    ]
  };
  
  return NextResponse.json(mockData);
}