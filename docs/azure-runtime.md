# Azure Container Apps runtime

**Status: source prepared; not deployed.** A source merge does not prove that
Terraform was applied, an image was published, the origin is healthy, DNS routes
to it, secrets exist, or a real user journey succeeds.

Companion plan: `.azure/plan.md`.

## Why Container Apps

This Next.js application has root middleware and API route handlers that require
a persistent Node.js server. The container build emits Next's standalone server,
runs as an unprivileged user, and exposes port 3000. `/api/health` is the platform
liveness/readiness endpoint.

## Ownership boundaries

- This repository owns the Container App, scheduled job, ACR, Key Vault,
  Application Insights, Log Analytics, managed identities, and related runtime
  Terraform.
- The organization control-plane repository owns public DNS records.
- Mystira Identity relying-party registration, callback approval, and production
  activation are cross-repository gated work and are not performed here.

## Runtime design

The production-alpha footprint is intentionally small:

- one externally reachable Container App with one warm replica and bounded
  HTTP scale-out;
- one hourly Container Apps Job, represented as manual-only unless
  `sync_job_enabled` is explicitly approved and set;
- one Basic ACR;
- one workspace-based Application Insights resource;
- one RBAC-enabled Key Vault;
- separate managed identities for the web app and scheduled job; and
- a VNet-integrated Container Apps environment whose delegated subnet has a
  Key Vault service endpoint.

The Key Vault public endpoint is enabled only so the service endpoint can be
used. Its firewall remains deny-by-default and admits the delegated subnet.

## Configuration inventory

### Build-time public values

Next.js inlines these values into the browser bundle. They are Docker build
arguments, not Container App runtime settings, and must never contain secrets:

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_BASE_URL`,
`NEXT_PUBLIC_WS_BASE_URL`, `NEXT_PUBLIC_ENV`,
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_MODEL_WS`,
`NEXT_PUBLIC_API_MOCKING`, `NEXT_PUBLIC_USE_MOCK_DATA`,
`NEXT_PUBLIC_AI_SERVER_LOGGING`, `NEXT_PUBLIC_AI_TRACKING_ENABLED`,
`NEXT_PUBLIC_COINGECKO_API_KEY`, `NEXT_PUBLIC_AZURE_EVENT_GRID_KEY`, and
`NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING`.

`NEXT_PUBLIC_COINGECKO_API_KEY` and `NEXT_PUBLIC_AZURE_EVENT_GRID_KEY` are
client-visible by definition. They should be replaced with server-side proxy
routes before sensitive credentials are assigned.

### Server-side Key Vault secrets

Terraform defines references to these names but does not create, read, or store
their values. References and the sync job remain absent while
`runtime_secret_references_enabled` is false:

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `TOKEN_SECRET`,
`CRON_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_CLIENT_ID`,
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OPENAI_API_KEY`,
`SENDGRID_API_KEY`, `COINGECKO_API_KEY`, `FAL_KEY`, `GOLDSKY_API_URL`,
`NEURALLIQUID_GOLDSKY_API_KEY`, `ANALYTICS_API_ENDPOINT`, `ANALYTICS_API_KEY`,
and `EMAIL_FROM`.

Every secret must be provisioned through an approved process, have an owner and
expiry/rotation policy, and exist before a Container App revision references it.
Secret values must not be passed as Terraform variables.

The platform supplies `NODE_ENV`, `PORT`, and
`APPLICATIONINSIGHTS_CONNECTION_STRING`.

## Scheduled synchronization

The job calls `POST /api/cron/sync` with a bearer credential in the
`Authorization` header and `{ "type": "all" }` in the request body. The route:

- fails closed when `CRON_SECRET` is missing;
- compares credentials using fixed-length SHA-256 digests and a timing-safe
  comparison;
- accepts only a bounded set of synchronization types;
- acquires an atomic, expiring Supabase lease before mutation so overlapping
  runs are rejected across all serving replicas; and
- never returns internal exception details.

The Container Apps Job has parallelism and completion count fixed at one,
bounded retries, and a ten-minute timeout. It runs the same application image by
immutable digest and uses a dedicated identity with ACR pull plus access only to
the scheduler secret.

Migration `14_create_scheduled_sync_lease.sql` must be applied before activating
the application. The lease RPCs are executable only by Supabase's `service_role`;
the backing table is not accessible to anonymous or authenticated browser roles.
The 30-minute expiry recovers from a terminated server while remaining longer
than the job's retry and request timeout window.

The approved cadence is hourly in UTC. The schedule remains inactive until an
explicit production approval sets `sync_job_enabled = true`.

## Preparation and release gates

1. Validate source and Terraform without a backend.
2. Review the first Terraform plan with `application_enabled = false` and
   `runtime_secret_references_enabled = false` using the confirmed
   `neuralliquid-sub` and West Europe context; recheck policy and quota using a
   credential issued by the subscription tenant.
3. Obtain production approval for the first apply, which creates the vault and
   runtime shell without secret references or a sync job.
4. Provision secrets separately, with expiry and rotation metadata.
5. Apply the scheduled-sync lease migration through the approved database
   migration process.
6. Build and publish the application image, record its commit tag and digest,
   and supply them as `image_tag` and `sync_image_digest`.
7. Review a second plan with `application_enabled = true` and
   `runtime_secret_references_enabled = true`; obtain a separate approval before
   creating the app, secret references, and manual job.
8. Verify the direct origin: health, logs, secret resolution, scheduler
   authentication, and representative application routes.
9. Obtain a separate DNS/Cloudflare approval and restrict direct-origin access.
10. Verify public health after routing changes.
11. Verify Mystira Identity through an authentic signed-in user journey only
   after its separate relying-party gate is complete.

## Rollback

Before deployment, rollback is source-only: revert the preparation commits. For
a deployed revision, retain the previous healthy Container Apps revision and
image digest until the new revision, telemetry, scheduler, and authentic user
journeys are proven. DNS rollback is controlled by the organization
control-plane repository and must be planned before any routing mutation.
