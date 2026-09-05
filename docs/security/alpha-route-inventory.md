# Alpha route inventory

Date: 2026-09-05

This inventory records the source-level route policy for the approved Standard-only alpha. It does not claim that Mystira OIDC is registered, activated, or deployed.

## Public browser routes

| Route family | Purpose | Phase 1 behavior |
| --- | --- | --- |
| `/`, `/standard` | Standard landing and alpha entry | Public; no Corporate selection |
| `/auth/login` | Stable authentication status | Public; contains no credential form |
| `/brand`, `/whitepaper`, `/how-it-works`, `/contact`, `/compare`, `/ai-features` | Marketing and documentation | Public |
| `/demo*`, `/standard-demo*`, `/hero-showcase` | Non-authenticated product demonstrations | Public prototype surface |
| `/corporate*`, `/corporate-version*` | Retired Corporate prototype | Redirected to `/standard` |

## Protected browser routes

The middleware fail-closes these route families to `/auth/login` until the separately approved Mystira OIDC integration supplies and validates a cohort session:

- `/admin*`
- `/dashboard*`
- `/settings*`, `/profile*`
- `/analytics*`, `/strategies*`, `/pools*`
- `/flash-loans*`, `/risk-assessment*`
- `/standard-version/dashboard*`

## API routes

| Classification | Routes | Current control |
| --- | --- | --- |
| Public health/rendering | `/api/health`, `/api/og/*` | Public by design |
| Machine-only | `/api/cron/sync` | Bearer secret plus distributed lease |
| User-scoped | `/api/settings*`, `/api/profiles/me` | Validated request user and RLS-preserving request client |
| Temporarily fail-closed | `/api/voting/active-proposals`, `/api/voting/past-proposals` | Session bridge always returns no session until Mystira |
| Retired authentication | `/api/auth/login`, `/api/auth/github*`, `/api/auth/[...nextauth]`, `/auth/callback` | `410 Gone`, `Cache-Control: no-store`, no redirect, token, or cookie |
| Public alpha/demo data | Remaining `/api/*` routes | No identity claim; must be reclassified before accepting user-specific data |

## Follow-up boundary

Phase 2 owns confidential-client Mystira OIDC with S256 PKCE, cohort authorization, callback/session validation, and enforcement for user-scoped APIs. Phase 1 does not create credentials, register a relying party, activate production identity, deploy, change DNS, or mutate infrastructure.

## Type-check boundary

`pnpm typecheck` and the Web Quality workflow compile the retained application route graph with strict TypeScript settings. The retired Corporate implementation and isolated duplicate `src` feature/config trees have been removed, and the Next.js build no longer bypasses TypeScript failures.

ESLint is installed with the Next.js Core Web Vitals configuration and runs in the Web Quality workflow. Lint errors fail the workflow; existing hook and image optimization advisories remain visible as warnings for targeted follow-up rather than being hidden by a build-wide suppression.
