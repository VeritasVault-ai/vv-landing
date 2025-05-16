import { NextRequest, NextResponse } from 'next/server'

/**
 * API route for handling analytics events
 * This endpoint receives analytics data including IP addresses and logs it securely
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const apiKey = process.env.ANALYTICS_API_KEY
    
    // If API key is configured, verify the request is authenticated
    if (apiKey && (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== apiKey)) {
      console.warn('Unauthorized analytics API request')
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Parse the analytics event data
    const eventData = await request.json()
    
    // Sanitize any potentially sensitive data before logging  
    const sanitizedData = { ...eventData }  
    if (sanitizedData.user_email) sanitizedData.user_email = '***@***.com'  
    if (sanitizedData.ip_address) sanitizedData.ip_address = '***.***.***.**'  

    // Log the event data (in production, you'd store this in a database or send to a service)
    console.log('Analytics event received:', {  
      ...sanitizedData, 
      timestamp: eventData.timestamp || new Date().toISOString(),
      received_at: new Date().toISOString()
    })
    
    // In a real implementation, you would:
    // 1. Validate the data
    // 2. Store it in a database
    // 3. Forward it to an analytics service
    
    // For now, we'll just acknowledge receipt
    return new NextResponse(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error processing analytics event:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}