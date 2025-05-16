import { http, HttpResponse } from 'msw';
import { mockProtocolAllocations } from '../data/protocols';

export const protocolHandlers = [
  // Handler for fetching protocol allocation data
  http.get('/api/goldsky/protocols', () => {
    return HttpResponse.json(mockProtocolAllocations);
  })
];