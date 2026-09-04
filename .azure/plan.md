# VeritasVault Azure replacement preparation plan

**Status:** Validated
**Prepared:** 2026-09-04  
**Mode:** MODIFY an existing Azure-prepared branch  
**Implementation vehicle:** `neuralliquid/veritasvault-web` PR #163 (`feat/azure-container-apps`)  
**Scope:** Source and infrastructure preparation only. No Azure apply, production deployment, DNS change, secret write, approval-gate action, or Mystira OIDC registration is authorized by this plan.

## Goal

Finish the source-only replacement of the repository's active Vercel dependencies with a gated Azure Container Apps design suitable for a small production alpha. The result must be independently buildable and validatable without asserting that it has been deployed or accepted by a real user.

This work is warranted because the owner has confirmed that VeritasVault no longer runs on Vercel, while PR #163 and its branch still contain active Vercel analytics, runtime detection, deployment comments, a Vercel-specific response header, and an unsafe Vercel Cron replacement draft.

## Confirmed decisions

| Decision | Selection |
|---|---|
| Azure subscription | `neuralliquid-sub` (`5a95ddee-dd63-441a-8306-c8b0803dcdd4`) |
| Azure region | West Europe |
| Workload class | Small, cost-optimized, customer-facing production alpha; fewer than 1,000 initial users |
| Data classification | Representative/non-regulated alpha data only; secrets remain in Key Vault |
| Infrastructure workflow | Existing repository-native Terraform and GitHub Actions workflow |
| Web runtime | Next.js SSR/BFF container on Azure Container Apps |
| Scheduled synchronization | Hourly Azure Container Apps Job, disabled by default until an explicit production gate is approved |
| Telemetry | Azure Application Insights only; remove active Vercel Analytics code and dependency |

## Current-state findings

- PR #163 already introduces a Docker build, Terraform, Azure deployment workflows, Application Insights, Key Vault, Azure Container Registry, a Container App, and a scheduled Container Apps Job.
- Its Terraform backend and variable defaults incorrectly target `mystira-sub`, not the confirmed `neuralliquid-sub`.
- The analytics provider still imports and conditionally invokes `@vercel/analytics`; the package remains a production dependency.
- Middleware emits `x-vercel-skip-auth`, and preview detection treats `*.vercel.app` as authoritative.
- The synchronization route currently performs mutations via `GET` and accepts `CRON_SECRET` in the query string.
- The proposed job uses `mcr.microsoft.com/azure-cli:latest`, shares the web app identity, and is immediately schedulable.
- Terraform creates placeholder secret values, which would place those placeholders in Terraform state and does not constitute real secret provisioning.
- PR #163 has an outstanding CodeRabbit changes-requested review. No implementation may land until current-head checks, formal reviews, and actionable threads are green/resolved.

## Target architecture

```text
Cloudflare DNS/proxy
        |
        v
Azure Container Apps environment (West Europe)
  |-- VeritasVault web Container App (external HTTPS ingress)
  |     |-- image from Basic Azure Container Registry
  |     |-- web managed identity
  |     |-- runtime references to pre-provisioned Key Vault secrets
  |     `-- Application Insights via Log Analytics workspace
  |
  `-- VeritasVault sync Container Apps Job (hourly, disabled by default)
        |-- immutable, provenance-checked image digest
        |-- dedicated sync managed identity
        |-- access to the single scheduler credential only
        `-- POST /api/cron/sync with credential in a header
```

Cloudflare origin restriction and public-host cutover are deployment concerns, not source-preparation claims. The direct Container Apps hostname must not be described as production-ready until that control and DNS are separately verified.

## Azure resources to prepare

| Resource | Proposed configuration | Purpose |
|---|---|---|
| Resource group | One dedicated West Europe resource group | Isolation and lifecycle boundary |
| Container Apps managed environment | Consumption profile | Shared web/job runtime |
| Container App | External HTTPS ingress; min/max replicas validated; health probes | Next.js SSR/BFF |
| Container Apps Job | Hourly trigger; disabled by default; bounded retries/timeouts/concurrency | Scheduled synchronization |
| Azure Container Registry | Basic SKU | Private application image storage |
| Key Vault | RBAC authorization; soft delete and purge protection; no secret values in Terraform | Runtime secret boundary |
| Virtual network and delegated subnet | Container Apps infrastructure subnet with Key Vault service endpoint | Deny-by-default Key Vault network path |
| Log Analytics workspace | Cost-conscious retention | Platform logs |
| Application Insights | Workspace based | Browser/server telemetry |
| User-assigned managed identities | Separate web and sync identities | Least privilege |
| Role assignments | ACR pull plus narrowly scoped Key Vault access | Workload authorization |

## Quota and capacity check

All counts below are for `neuralliquid-sub`; regional counts are scoped to West Europe. The standard Azure resource inventory returned zero current West Europe resources. The Microsoft.App quota API returned the environment limit but its usage endpoint encountered a cross-tenant token issuer mismatch, so the zero-use value must be rechecked using the deployment credential context before any apply.

| Resource/quota | Current | Add | Projected | Limit/bound | Result |
|---|---:|---:|---:|---:|---|
| Resource groups per subscription | 6 | 1 | 7 | 980 | Within limit |
| Virtual networks, target resource group | 0 | 1 | 1 | 1,000 per region per subscription | Within limit |
| Subnets in virtual network | 0 | 1 | 1 | 3,000 per virtual network | Within limit |
| Container Apps managed environments, West Europe | 0 | 1 | 1 | 20 | Within limit; usage recheck required before apply |
| Container Apps, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| Container Apps Jobs, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| Container registries, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound; proposed global name is available |
| Key Vaults, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound; proposed global name is available |
| Log Analytics workspaces, target resource group | 0 | 1 | 1 | No non-legacy service count cap; ARM bound 800/type/resource group | Within limit |
| Application Insights components, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| User-assigned managed identities, West Europe | 0 | 2 | 2 | Creation rate 80/subscription/region/20 seconds; ARM bound 800/type/resource group | Within limit |
| Role assignments per subscription | 14 | 5 | 19 | 4,000 | Within limit |
| Key Vault secret creates | 0 by this plan | 0 | 0 | 300 create operations/10 seconds; no object-count restriction | No secret mutation authorized |

No quota increase is required for source preparation. Any changed current usage, SKU constraint, or tenant-context mismatch is a deployment preflight failure, not permission to proceed optimistically.

## Research summary

- Microsoft Container Apps guidance requires health probes for production workloads and recommends one minimum replica for a public web application. The web app therefore uses `/api/health`, one warm replica by default, and bounded HTTP scaling.
- Microsoft Container Apps secret guidance supports versionless Key Vault references with managed identity and automatic rotation pickup. Terraform constructs those references without reading secret values into state.
- Microsoft Key Vault network guidance says services not on the trusted-services list require a virtual-network rule, IP rule, or private endpoint. Container Apps is not a general trusted-service bypass for application secret reads, so the environment is VNet-integrated and its delegated subnet is admitted through a Key Vault service endpoint.
- Microsoft Application Insights guidance requires connection strings rather than instrumentation keys for new applications. Browser telemetry uses `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING`; server runtime receives `APPLICATIONINSIGHTS_CONNECTION_STRING`.
- Azure Terraform best-practice guidance requires AzureRM 4.2 or later, formatting, initialization, and validation before plan. The repository's `~> 4.0` constraint admits current 4.x releases, and the committed lock file controls the selected version.
- The subscription-level policy inventory contains only the enforced `SecurityCenterBuiltIn` assignment. The Azure MCP policy call had a cross-tenant token mismatch; a read-only Azure CLI query against the confirmed subscription supplied this result without changing the caller's default subscription.

## Planned source changes

### Remove active Vercel behavior

- Remove `@vercel/analytics` imports, rendering, environment detection, dependency, and lockfile entries.
- Make the provider use Application Insights only while retaining the non-throwing analytics contract.
- Remove `x-vercel-skip-auth` from middleware.
- Replace `vercel.app` preview detection with explicit local/development behavior.
- Remove active Vercel migration/cutover language from workflows, configuration, and operational documentation.
- Keep historical record archival as Baton task `9267bc17`; do not rewrite external organizational history in this repository change.

### Harden the scheduled synchronization replacement

- Change `/api/cron/sync` from mutating `GET` to `POST`.
- Accept the scheduler credential only through an authorization header, never a URL/query value.
- Use timing-safe credential comparison and fail closed when configuration is absent.
- Validate the synchronization type from a bounded request body.
- Add an atomic, expiring Supabase lease so retries cannot overlap a still-running synchronization across Container App replicas.
- Configure bounded job timeout, retry count, and parallelism.
- Give the job a dedicated managed identity and access only to its scheduler credential.
- Pin the job image to an approved immutable digest with recorded provenance.
- Keep the Terraform job disabled by default; enabling its hourly schedule is a separate production approval.

### Correct and harden Terraform/workflows

- Replace the stale Mystira subscription/backend defaults with the confirmed NeuralLiquid subscription context without changing the caller's active Azure CLI subscription.
- Validate `max_replicas >= min_replicas` and reject invalid input early.
- Do not create placeholder secret values or real secret values in Terraform. Model only the vault, access boundary, and references to separately provisioned secrets.
- Gate runtime secret references and sync-job creation behind `runtime_secret_references_enabled`, permitting a first apply to create the vault before separately approved secret provisioning and a second reviewed apply.
- Gate web application creation behind `application_enabled`, so the first apply cannot fail against an empty newly created registry and cannot expose an unreviewed application origin.
- Narrow Key Vault grants from whole-vault access where Azure supports a secret-scoped assignment suitable for the runtime reference design.
- Set `persist-credentials: false` on workflow checkout steps.
- Pass GitHub variables through environment variables rather than interpolating them directly into shell commands.
- Ignore all Terraform variable-file variants while preserving a committed example file if one is required.
- Correct the configuration audit and environment inventory, including `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING`.
- Initialize Application Insights for both browser navigation and Node SSR/API
  traffic, and admit only the configured HTTPS ingestion origin in browser CSP.
- Keep public hostname binding and certificate issuance out of this
  source-preparation module until the separate routing gate owns a complete,
  validated binding flow.

## Expected files

The exact diff remains review-driven, but preparation is expected to touch:

- `.azure/plan.md`
- `.github/workflows/deploy-azure.yml`
- `.github/workflows/terraform-validate.yml`
- `.gitignore`
- `app/api/cron/sync/route.ts`
- `components/analytics/analytics-scripts.tsx`
- `lib/analytics/provider.ts`
- `lib/analytics/auth-analytics.ts`
- `lib/api-client.ts`
- `lib/services/scheduled-sync-lease.ts`
- `migrations/14_create_scheduled_sync_lease.sql`
- `middleware.ts`
- `next.config.mjs`
- `package.json` and `pnpm-lock.yaml`
- `infra/terraform/backend.tf`
- `infra/terraform/main.tf`
- `infra/terraform/variables.tf`
- `infra/terraform/outputs.tf` if output contracts change
- Azure operating/migration documentation, renamed to reflect current Azure-only preparation rather than a live Vercel migration
- Focused tests for analytics and scheduled synchronization behavior

## Validation plan

Source preparation is complete only when all applicable checks pass on the exact proposed head:

1. `pnpm install --frozen-lockfile`
2. Focused unit tests for analytics and the scheduler route
3. `pnpm build`
4. Configuration audit
5. `terraform fmt -check -recursive`
6. `terraform init -backend=false`
7. `terraform validate`
8. Repository search proving no active Vercel code, dependency, header, environment detection, or deployment instructions remain
9. Self-review of the complete diff
10. CodeRabbit/bot review on the exact head, with zero unresolved actionable threads
11. All required GitHub checks green on the exact head before merge

Successful source checks prove only that the repository is prepared. They do not prove Terraform plan/apply, image publication, Azure deployment health, Cloudflare/DNS routing, secret availability, Mystira OIDC, or authentic signed-in user acceptance.

## Gated execution sequence

- [x] Inventory the existing Azure branch and active Vercel residue.
- [x] Confirm workload classification, subscription, and region.
- [x] Check relevant quota/capacity bounds; record the tenant-context caveat.
- [x] Produce this source-preparation plan.
- [x] Obtain explicit approval of this plan.
- [x] Research Container Apps, Key Vault, Application Insights, Node.js container, Terraform, and subscription-policy constraints.
- [x] Implement the source-only changes on the isolated branch.
- [x] Run local validation and self-review.
- [ ] Update PR #163 or land an explicitly linked stacked PR without losing existing work.
- [ ] Complete exact-head bot review and required checks.
- [ ] Merge only when green and free of unresolved actionable threads.
- [ ] Run Azure pre-deployment validation as a distinct phase.
- [ ] Obtain separate approval before any Terraform apply, secret provisioning, image publication, deployment, job enablement, Cloudflare/DNS change, or production gate action.
- [ ] Verify deployment health separately from authentic user acceptance.

## Rollback and failure boundaries

- Before merge, rollback is branch/PR-only: revert the preparation commit(s).
- No runtime rollback is created or exercised by this source-only plan because no runtime change is authorized.
- The scheduled job remains disabled until the route, credential, and deployment are verified together.
- A clean Terraform validation or plan is insufficient evidence that callback URLs, secret references, provider names, managed identities, DNS, or production behavior are correct.

## Baton linkage

- `5e2ccd07` — remove active Vercel runtime/deployment residue
- `8b7810bf` — replace Vercel Analytics with Application Insights
- `4dbd360c` — replace Vercel Cron with Azure scheduled sync
- `8012b910` — verify/complete Azure origin behind Cloudflare
- `d42250cb` — Cloudflare/DNS/Vercel residue
- `9267bc17` — archive historical Vercel records after cleanup
- `5361478e` — resolved hourly cadence decision
- `342f38fa` — resolved subscription/region decision
- `2cbbb7e4` — resolved workload-classification decision

## Approval checkpoint

Approval of this document authorizes implementation and validation of repository source changes only. It does not authorize any Azure, Cloudflare, DNS, Key Vault, GitHub environment approval, Mystira Identity, or production mutation.

## Local validation evidence

- `pnpm test`: 11 focused scheduler, distributed lease, and Application Insights provider tests passed.
- `pnpm build`: passed with representative, non-secret public Supabase build values; existing theme-provider and metadata warnings remain non-fatal.
- `node scripts/audit-config.js`: passed with no violations.
- `terraform fmt -check -recursive infra/terraform`: passed.
- `terraform -chdir=infra/terraform init -backend=false`: passed with AzureRM 4.81.0 and AzAPI 2.12.0.
- `terraform -chdir=infra/terraform validate`: passed.
- `terraform -chdir=infra/terraform init -reconfigure`: passed against the configured NeuralLiquid Azure Storage backend.
- `terraform -chdir=infra/terraform state list`: passed and returned an empty state.
- `terraform plan -lock=false` from `infra/terraform`: passed with the safe defaults (`application_enabled = false`, `runtime_secret_references_enabled = false`, `sync_job_enabled = false`); preview is 14 additions, 0 changes, and 0 destroys. No saved plan artifact was produced.
- Active-tree residue scan excluding this forensic plan: no active Vercel code, package, environment detection, header, deployment instruction, or documentation remains.
- `git diff --check`: passed.
- Docker build-context review: `scripts/run-scheduled-sync.mjs` is explicitly included after the `scripts/*` exclusion. Docker client 29.2.1 is installed locally, but the Docker Desktop Linux daemon is not running, so an actual container build remains an exact-head CI/release prerequisite.
- Local CodeRabbit CLI: unavailable; exact-head CodeRabbit GitHub App review remains required before merge.
