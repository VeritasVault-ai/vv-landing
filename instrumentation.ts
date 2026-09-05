/** Initializes server-side Azure Monitor telemetry before handling requests. */
export async function register() {
  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
  if (process.env.NEXT_RUNTIME !== "nodejs" || !connectionString) return

  try {
    const { registerAzureMonitor } = await import("./instrumentation-node")
    registerAzureMonitor(connectionString)
  } catch (error) {
    console.error("Could not initialize Azure Monitor telemetry:", error)
  }
}
