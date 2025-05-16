/**
 * This file initializes the Mock Service Worker (MSW) for development mode
 * It should be imported in your app's entry point
 */
export async function initializeMockServiceWorker() {
  // Only run in browser environment and in development mode
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  try {
    // Dynamically import MSW to avoid issues with SSR
    const { worker } = await import('@/lib/mocks/browser');
    
    // Start the worker
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests like static assets
      serviceWorker: {
        url: '/mockServiceWorker.js', // The service worker file path
      },
    });
    
    console.log('[MSW] Mock Service Worker started');
  } catch (error) {
    console.error('[MSW] Failed to initialize Mock Service Worker:', error);
  }
}