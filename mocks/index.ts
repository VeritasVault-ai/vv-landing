/**
 * Initializes Mock Service Worker (MSW) for API mocking in development environments.
 *
 * Dynamically starts the MSW server or worker based on the runtime environment if API mocking is enabled via the {@link process.env.NEXT_PUBLIC_API_MOCKING} environment variable.
 *
 * @remark
 * Has no effect unless {@link process.env.NEXT_PUBLIC_API_MOCKING} is set to `'enabled'`.
 */
async function initMocks() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window === 'undefined') {
      // For server-side (SSR)
      const { server } = await import('./server')
      server.listen({
        onUnhandledRequest: 'bypass',
        // Optionally, you can log any unhandled requests
        // onUnhandledRequest(req) {
        //   console.warn('Found an unhandled %s request to %s', req.method, req.url.href)
        // }
      })
      console.log('🔶 [MSW] Server listening')
    } else {
      // For client-side
      const { worker } = await import('./browser')
      
      // Start the worker
      await worker?.start({
        onUnhandledRequest: 'bypass',
        // Same as above, you can log unhandled requests
        // onUnhandledRequest(req) {
        //   console.warn('Found an unhandled %s request to %s', req.method, req.url.href)
        // }
      })
      console.log('🔶 [MSW] Worker started')
    }
  }
}

// Call the async function
initMocks().catch(err => {
  console.error('Error starting MSW:', err)
})
export {}