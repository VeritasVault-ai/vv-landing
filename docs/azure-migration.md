# Vercel → Azure Container Apps migration

**Status: prepared, not cut over.** `veritasvault.net` is still served by Vercel.
Everything in this repo is additive and inert until someone runs the workflow and
flips DNS.

Companion plan: `neuralliquid/veritasvault/docs/planning/estate-consolidation-spike.md` §5a.

---

## Why Container Apps, not Static Web Apps

Static Web Apps was ruled out on evidence, not preference:

| Coupling | Present here | Consequence |
|---|---|---|
| `middleware.ts` (62 lines) | yes, at repo root | Next middleware needs a real Node server. **SWA cannot run it properly.** |
| API routes | **45** under `app/api/**` | Needs a long-running runtime, not managed functions |
| `next-auth` + `force-dynamic` | 3 routes | Same |
| `runtime = "edge"` | 2 routes (`app/api/og/*`) | **Edge runtime does not exist on any Azure target** — changed to `nodejs` |

Container Apps runs `next start` unmodified, supports middleware and all 45 routes,
and the org already has Container Apps precedent in `phoenixvc/sluice`. App Service
(Node) would also work but has a lower ceiling.

## Ownership boundary

Per `neuralliquid-org` ADR 0001, product repos are the workload plane:

- **This repo** owns the Container App, ACR, Key Vault, App Insights, hostname
  bindings and certificates — `infra/terraform/`.
- **`neuralliquid-org`** owns `veritasvault.net` DNS records —
  `infra/terraform/dns/`. This module publishes its target via
  `terraform output container_app_fqdn` for that module to consume.

---

## What changed in the app

| Change | Why | Production impact today |
|---|---|---|
| `next.config.mjs` — `output: "standalone"` gated behind `BUILD_STANDALONE` | Lean container image | **None.** Vercel builds are unchanged because the flag is only set in the Dockerfile |
| `app/api/og/{corporate,standard}/route.tsx` — `edge` → `nodejs` | No edge runtime on Azure | **Behaviour change on Vercel.** These two OG-image routes now run as Node functions instead of edge. `next/og` supports Node on Next 15, but verify both render before cutover |
| `lib/analytics/provider.ts` (new) | Provider-agnostic sink | None. Vercel Analytics still fires while `VERCEL`/`NEXT_PUBLIC_VERCEL_ENV` is set; App Insights activates only when its connection string is present. **No analytics gap at cutover, and no code change needed to switch** |
| `lib/analytics/auth-analytics.ts` | Imports the shim instead of `@vercel/analytics` | None — same event names and properties |
| `components/analytics/analytics-scripts.tsx` (new) | Mounts the Vercel beacon only on Vercel | None on Vercel; stops shipping dead script on Azure |
| `package-lock.json` deleted | The repo declares `packageManager: pnpm@10.11.0`, so **pnpm is authoritative**. Two lockfiles meant the resolved tree depended on which one the builder picked | Vercel already resolves via pnpm; removing the unused npm lockfile makes that explicit rather than incidental |

`@vercel/analytics` is deliberately **still a dependency**. It self-disables off-platform,
so keeping it means the cutover needs no code change and no analytics gap. Remove it,
along with `components/analytics/analytics-scripts.tsx`, once Azure is serving
production and App Insights is confirmed receiving events.

---

## Runtime configuration: 36 env vars

Derived by grepping `process.env.*` across the source. **This list is complete as of
this commit; the VALUES exist only in the Vercel dashboard.**

### Build-time — inlined into the client bundle (`NEXT_PUBLIC_*`)

Next inlines these at build time, so they are **Docker build args**, not Container
App env vars. Setting one on the Container App has no effect. Anything here is
public by definition — never put a real secret in this group.

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`,
`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_WS_BASE_URL`,
`NEXT_PUBLIC_ENV`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_MODEL_WS`,
`NEXT_PUBLIC_API_MOCKING`, `NEXT_PUBLIC_USE_MOCK_DATA`, `NEXT_PUBLIC_AI_SERVER_LOGGING`,
`NEXT_PUBLIC_AI_TRACKING_ENABLED`, `NEXT_PUBLIC_COINGECKO_API_KEY`,
`NEXT_PUBLIC_AZURE_EVENT_GRID_KEY`

> `NEXT_PUBLIC_COINGECKO_API_KEY` and `NEXT_PUBLIC_AZURE_EVENT_GRID_KEY` are API keys
> exposed to the browser. That predates this migration, but it is worth fixing —
> proxy them through a route handler and drop the `NEXT_PUBLIC_` prefix.

Two known-bad defaults, also predating this work:
- `config/api-config.ts:9` — `WS_BASE_URL` falls back to the literal placeholder
  `wss://api.yourdomain.com`.
- `NEXT_PUBLIC_API_BASE_URL` defaults to `/api`, i.e. the app's own routes. Correct
  today, since there is no external backend.

### Runtime — server-side secrets, held in Key Vault

Terraform creates each as an **empty** Key Vault secret and wires the Container App
to reference it by managed identity. Values are set out of band, so no secret ever
enters Terraform state or git.

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `TOKEN_SECRET`,
`CRON_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_CLIENT_ID`, `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET`, `OPENAI_API_KEY`, `SENDGRID_API_KEY`, `COINGECKO_API_KEY`,
`FAL_KEY`, `GOLDSKY_API_URL`, `NEURALLIQUID_GOLDSKY_API_KEY`, `ANALYTICS_API_ENDPOINT`,
`ANALYTICS_API_KEY`, `EMAIL_FROM`

Set by the platform, not by you: `NODE_ENV`, `PORT`, `USE_MOCK_DATA`,
`APPLICATIONINSIGHTS_CONNECTION_STRING`.

Populate after the first apply:

```bash
az keyvault secret set --vault-name nl-prod-veritasvault-kv --name supabase-service-role-key --value "<value>"
```

---

## ⚠ The thing most likely to be lost

**There is no `vercel.json` in this repo.** Every build setting, every env var value,
and **the Vercel Cron schedule** exist only in the Vercel dashboard.

Env vars can be recovered with `vercel env pull`. **The cron schedule cannot** — there
is no export for it. `infra/terraform/main.tf` therefore ships a placeholder
(`0 * * * *`) on `azurerm_container_app_job.sync`. If the real schedule is not read off
the dashboard before cutover, `app/api/cron/sync` silently runs at the wrong cadence
and **nothing fails loudly**.

Capture, before touching the Vercel project: cron schedule, env vars, Root Directory,
build command, Node version, install command.

---

## Cutover sequence

Each step is reversible until step 8.

1. **Capture from Vercel** — cron schedule, `vercel env pull`, project settings. Hard
   precondition; do not skip.
2. **`terraform apply`** with `custom_domains = []`. Creates RG, ACR, Key Vault,
   App Insights, Container App environment, Container App, sync job. Binds no
   hostname, touches no DNS, affects production in no way.
3. **Populate Key Vault** with the real values from step 1.
4. **Set the repo/environment variables** the workflow reads: `AZURE_CLIENT_ID`,
   `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`, and the `NEXT_PUBLIC_*` build args
   including `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING` (from
   `terraform output app_insights_connection_string`).
5. **Run `deploy-azure.yml` with `build-and-deploy`.** Its smoke check polls the
   ingress FQDN for a 200 and fails the run if the revision never becomes healthy.
6. **Verify on the FQDN, not the domain** — exercise login (next-auth), a Supabase
   read, both OG image routes, and confirm App Insights is receiving events. This is
   where the `edge` → `nodejs` change gets proven.
7. **Correct the cron schedule** in `main.tf` from step 1 and re-apply.
8. **Flip DNS** — the point of no easy return:
   - Add `asuid.www` TXT = `terraform output custom_domain_verification_id` in
     `neuralliquid-org/infra/terraform/dns`
   - Set `custom_domains = ["www.veritasvault.net"]` here and apply to bind the
     hostname and issue the managed certificate
   - Only then repoint the `www` CNAME from `cname.vercel-dns.com` to
     `terraform output container_app_fqdn`
   - Lower the DNS TTL ≥24h beforehand so rollback propagates in minutes
9. **Keep the Vercel project** for at least one week. It is the rollback: restore the
   CNAME and traffic returns. Do not delete it — its env vars are unrecoverable.

## Rollback

Before step 8: nothing to roll back — production never moved.

After step 8: repoint the `www` CNAME back to `cname.vercel-dns.com`. Bounded by the
TTL set in step 8, which is the only reason that step exists.

## Out of scope

`games.veritasvault.net` (`vv-game-suite`) is a separate live Vercel project. Static
WebGL/Phaser with no middleware and no API routes, so it is a genuinely easy Static
Web Apps candidate later — but it moves deliberately, on its own, not as a side effect
of this.

`test.veritasvault.net` is a live, previously undocumented Vercel surface on the
production domain. Resolve what it is before cutover; it shares cookie scope with
`www`.
