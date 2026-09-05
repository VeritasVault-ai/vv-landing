import { describe, expect, it } from "vitest"
import { GET as legacyGitHubStart } from "./github/route"
import { GET as legacyGitHubCallback } from "./github/callback/route"
import { POST as legacyPasswordLogin } from "./login/route"
import { GET as legacyNextAuthGet, POST as legacyNextAuthPost } from "./[...nextauth]/route"
import { GET as legacySupabaseCallback } from "../../auth/callback/route"

describe("retired authentication routes", () => {
  it.each([
    ["password login", legacyPasswordLogin],
    ["GitHub start", legacyGitHubStart],
    ["GitHub callback", legacyGitHubCallback],
    ["NextAuth GET", legacyNextAuthGet],
    ["NextAuth POST", legacyNextAuthPost],
    ["Supabase callback", legacySupabaseCallback],
  ])("fails closed for %s", async (_name, handler) => {
    const response = handler()

    expect(response.status).toBe(410)
    expect(response.headers.get("cache-control")).toBe("no-store")
    expect(response.headers.get("set-cookie")).toBeNull()
    expect(response.headers.get("location")).toBeNull()
    await expect(response.json()).resolves.toMatchObject({
      error: "authentication_unavailable",
    })
  })
})
