/**
 * Initialize Mock Service Worker for development environment
 * This will intercept API requests and respond with mock data
 */
async function initMocks() {
  if (typeof window === 'undefined') {
    return;
  }
  
  if (process.env.NODE_ENV === 'development') {
    // Only load MSW in development
    const { worker } = await import('./browser');
    
    // Start the worker with custom options
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests (like static assets)
      serviceWorker: {
        url: '/mockServiceWorker.js', // The service worker to use
      },
    });
    
    console.log('[MSW] Mock Service Worker started');
  }
}

export default initMocks;