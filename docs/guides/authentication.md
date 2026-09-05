# Authentication

Authentication is intentionally unavailable in the Phase 1 alpha source.

The approved target is Mystira-only identity using a confidential OIDC client and S256 PKCE. Registration, credentials, production activation, callback/session validation, and cohort authorization belong to the separately gated Phase 2 work.

Phase 1 behavior:

- `/auth/login` explains that sign-in is unavailable and contains no credential form.
- Legacy password, GitHub, NextAuth, and Supabase callback endpoints return `410 Gone` without issuing a token, cookie, or redirect.
- Legacy Standard login routes lead to `/auth/login`.
- Corporate routes lead to the approved Standard landing.
- Protected browser routes fail closed to `/auth/login`.
- User-scoped endpoints retain their own request-user controls, and the old voting-session bridge always returns no session.

See [the alpha route inventory](../security/alpha-route-inventory.md) for current classifications and the Phase 2 boundary.
