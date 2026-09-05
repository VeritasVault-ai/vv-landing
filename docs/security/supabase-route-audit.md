# Supabase API route privilege audit

This audit covers the ten API routes that imported the former mixed browser/server
Supabase module. The module selected the service-role key whenever it ran on the
server, even when a route was public or did not use Supabase at all.

| Route | Access after this change | Supabase client | Follow-up |
| --- | --- | --- | --- |
| `GET /api/settings` | Admin JWT required | Service role after authorization | Replace the temporary JWT authority with Mystira OIDC in Alpha Phase 2. |
| `GET /api/settings/{key}` | Admin JWT required | Service role after authorization | Same as above. |
| `PUT /api/settings/{key}` | Admin JWT required | Service role after authorization | Same as above; unauthenticated requests are rejected before the body or client is accessed. |
| `POST /api/ai/risk-assessment` | Admin JWT required | Service role after authorization | Reassess product scope, model governance, and spend controls before exposing it to alpha users. |
| `GET /api/content` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/content/{id}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/content/page/{page}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/liquidity-pools/{id}/performance` | Public read | Anonymous client, subject to RLS | Verify the retained table policy in the Alpha Phase 1 database/RLS audit. |
| `POST /api/liquidity-pools/{id}/performance` | Admin JWT required | Service role after authorization | Replace temporary JWT authority with Mystira OIDC before alpha. |
| `GET /api/navigation` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET /api/navigation/group/{group}` | Public static response | None | Remove the placeholder route if the alpha journey does not use it. |
| `GET`, `PUT /api/profiles/me` | Existing Supabase session check; currently fail-closed for the server client | Service role only after client construction | Retire this competing Supabase Auth path in Alpha Phase 1; do not treat it as the approved Mystira session contract. |

The privileged client now lives in a server-only module and has no default or
public credential fallback. The browser module exposes only the anonymous browser
client. JWT verification also fails closed when `JWT_SECRET` is absent or shorter
than 32 characters; the previous checked-in fallback secret is no longer accepted.

This source audit is not deployment or runtime evidence. It does not authorize
credentials, Supabase policy changes, data mutation, deployment, or production
activation.
