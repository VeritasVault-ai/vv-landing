# Supabase API route privilege audit

This audit covers the ten API routes that imported the former mixed browser/server
Supabase module. The module selected the service-role key whenever it ran on the
server, even when a route was public or did not use Supabase at all.

| Route | Access after this change | Supabase client | Follow-up |
| --- | --- | --- | --- |
| `GET /api/settings` | Supabase session and admin role required | Request-scoped anonymous client, subject to RLS | Replace the temporary Supabase identity authority with Mystira OIDC in Alpha Phase 2. |
| `GET /api/settings/{key}` | Supabase session and admin role required | Request-scoped anonymous client, subject to RLS | Same as above. |
| `PUT /api/settings/{key}` | Supabase session and admin role required | Request-scoped anonymous client, subject to RLS | Same as above; unauthenticated requests are rejected before the body or settings table is accessed. |
| `POST /api/ai/risk-assessment` | Supabase session and admin role required | Service role only after authorization | Reassess product scope, model governance, and spend controls before exposing it to alpha users. |
| `GET /api/content` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/content/{id}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/content/page/{page}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/liquidity-pools/{id}/performance` | Supabase session required | Request-scoped anonymous client, subject to ownership RLS | Replace the temporary Supabase identity authority with Mystira OIDC before alpha. |
| `POST /api/liquidity-pools/{id}/performance` | Supabase session and admin role required | Service role only after authorization | Replace the temporary Supabase identity authority with Mystira OIDC before alpha. |
| `GET /api/navigation` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/navigation/group/{group}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET`, `PUT /api/profiles/me` | Validated Supabase user required | Request-scoped anonymous client, subject to RLS | Retire this competing Supabase Auth path in Alpha Phase 1; do not treat it as the approved Mystira session contract. |

The privileged client now lives in a server-only module and has no default or
public credential fallback. The browser module exposes only the anonymous browser
client. Request-scoped clients validate active Supabase users with `getUser()` and
defer data authorization to RLS. JWT verification used by other legacy routes also
fails closed when `JWT_SECRET` is absent or shorter than 32 characters; the previous
checked-in fallback secret is no longer accepted.

This source audit is not deployment or runtime evidence. It does not authorize
credentials, Supabase policy changes, data mutation, deployment, or production
activation.
