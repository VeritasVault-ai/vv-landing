/** Configures Azure Monitor only in Next's Node instrumentation bundle. */
export function registerAzureMonitor(connectionString: string): void {
  // Keep this Node-only SDK as a native require. next.config.mjs externalizes it
  // so webpack never attempts to bundle its gRPC dependencies for Edge.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAzureMonitor } = require("@azure/monitor-opentelemetry") as typeof import("@azure/monitor-opentelemetry")
  useAzureMonitor({
    azureMonitorExporterOptions: { connectionString },
  })
}
