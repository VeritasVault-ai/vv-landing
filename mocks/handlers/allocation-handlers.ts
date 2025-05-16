import { http, HttpResponse } from 'msw'
import { DEFAULT_ALLOCATIONS } from '@/mocks/data/allocations'

// Initial WebSocket allocation data
const initialWebSocketData = {
  status: 'active',
  allocations: DEFAULT_ALLOCATIONS,
  timestamp: new Date().toISOString(),
  totalValue: 100000,
  changePercentage: 0.5
};

export const allocationHandlers = [
  // Handler for fetching allocation data
  http.get('/api/portfolio/allocations', () => {
    return HttpResponse.json(DEFAULT_ALLOCATIONS)
  }),
  
  // Handler for updating allocations
  http.post('/api/portfolio/allocations', async ({ request }) => {
    try {
      const updatedAllocations = await request.json()
      
      // Validate input data (basic validation)
      if (!Array.isArray(updatedAllocations)) {
        return new HttpResponse(
          JSON.stringify({ success: false, message: 'Invalid allocations data' }),
          { status: 400 }
        )
      }
      
      // In a real implementation, you would save this data
      // For now, just return success
      return HttpResponse.json({ 
        success: true, 
        allocations: updatedAllocations 
      })
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid request format' }),
        { status: 400 }
      )
    }
  }),
  
  // Handler for WebSocket initial data
  http.get('/api/portfolio/allocations/websocket-data', () => {
    return HttpResponse.json(initialWebSocketData)
  })
]