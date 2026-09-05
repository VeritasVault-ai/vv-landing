import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import {
  runLeasedSync,
  SYNC_TYPES,
  SyncAlreadyRunningError,
  type SyncType,
} from "../../../../lib/services/leased-sync-service"

function credentialsMatch(provided: string, expected: string): boolean {
  const providedDigest = createHash("sha256").update(provided).digest()
  const expectedDigest = createHash("sha256").update(expected).digest()
  return timingSafeEqual(providedDigest, expectedDigest)
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.CRON_SECRET
  const authorization = req.headers.get("authorization")

  if (!expected || !authorization?.startsWith("Bearer ")) return false
  return credentialsMatch(authorization.slice("Bearer ".length), expected)
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "JSON body must be an object" }, { status: 400 })
    }

    const requestedType = (body as { type?: unknown }).type
    const syncType = requestedType ?? "all"

    if (typeof syncType !== "string" || !SYNC_TYPES.includes(syncType as SyncType)) {
      return NextResponse.json({ error: "Invalid sync type" }, { status: 400 })
    }

    await runLeasedSync(syncType as SyncType, req.signal)

    return NextResponse.json({ success: true, message: `Scheduled sync ${syncType} completed successfully` })
  } catch (error) {
    if (error instanceof SyncAlreadyRunningError) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    console.error("Error in cron sync API:", error)
    return NextResponse.json({ error: "Scheduled sync operation failed" }, { status: 500 })
  }
}
