const baseUrl = process.env.SYNC_BASE_URL
const secret = process.env.CRON_SECRET

if (!baseUrl || !secret) {
  console.error("SYNC_BASE_URL and CRON_SECRET are required")
  process.exit(1)
}

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 9 * 60 * 1000)

try {
  const response = await fetch(new URL("/api/cron/sync", baseUrl), {
    method: "POST",
    headers: {
      authorization: `Bearer ${secret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ type: "all" }),
    signal: controller.signal,
  })

  if (!response.ok) {
    throw new Error(`Scheduled sync failed with HTTP ${response.status}`)
  }

  console.log("Scheduled sync completed")
} finally {
  clearTimeout(timeout)
}
