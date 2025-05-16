import { http, HttpResponse } from 'msw';
import { mockProtocolAllocations } from '@/components/corporate/protocols/protocol-allocation.mock';

export const protocolHandlers = [
  // Handler for fetching protocol allocation data
  http.get('/api/goldsky/protocols', () => {
    return HttpResponse.json(mockProtocolAllocations);
  }),
  
  // You can add more protocol-related handlers here
];