import { http, HttpResponse } from 'msw';
import { getMockHistoricalDataForStrategy } from '../data/historical-data';

export const historicalDataHandlers = [
  // Handler for fetching historical data
  http.get('/api/goldsky/historical-data', ({ request }) => {
    // Parse query parameters
    const url = new URL(request.url);
    const protocol = url.searchParams.get('protocol');
    const daysParam = url.searchParams.get('days');
    
    // Convert days to a number, default to 30 if not provided or invalid
    const days = daysParam ? parseInt(daysParam, 10) : 30;
    
    // If protocol is missing, return an error
    if (!protocol) {
      return new HttpResponse(
        JSON.stringify({ error: 'Protocol parameter is required' }),
        { status: 400 }
      );
    }
    
    // Determine timeframe from days
    let timeframe = '1m'; // Default to 1 month
    if (days <= 1) timeframe = '1d';
    else if (days <= 7) timeframe = '1w';
    else if (days <= 30) timeframe = '1m';
    else if (days <= 90) timeframe = '3m';
    else if (days <= 180) timeframe = '6m';
    else if (days <= 365) timeframe = '1y';
    else timeframe = 'all';
    
    // Generate mock data for the requested protocol and timeframe
    const data = getMockHistoricalDataForStrategy(protocol, timeframe);
    
    return HttpResponse.json(data);
  })
];