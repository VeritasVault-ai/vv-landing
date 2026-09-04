# VeritasVault Azure replacement preparation plan

**Status:** Planning  
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
| Log Analytics workspace | Cost-conscious retention | Platform logs |
| Application Insights | Workspace based | Browser/server telemetry |
| User-assigned managed identities | Separate web and sync identities | Least privilege |
| Role assignments | ACR pull plus narrowly scoped Key Vault access | Workload authorization |

## Quota and capacity check

All counts below are for `neuralliquid-sub`; regional counts are scoped to West Europe. The standard Azure resource inventory returned zero current West Europe resources. The Microsoft.App quota API returned the environment limit but its usage endpoint encountered a cross-tenant token issuer mismatch, so the zero-use value must be rechecked using the deployment credential context before any apply.

| Resource/quota | Current | Add | Projected | Limit/bound | Result |
|---|---:|---:|---:|---:|---|
| Resource groups per subscription | 6 | 1 | 7 | 980 | Within limit |
| Container Apps managed environments, West Europe | 0 | 1 | 1 | 20 | Within limit; usage recheck required before apply |
| Container Apps, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| Container Apps Jobs, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| Container registries, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound; proposed global name is available |
| Key Vaults, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound; proposed global name is available |
| Log Analytics workspaces, target resource group | 0 | 1 | 1 | No non-legacy service count cap; ARM bound 800/type/resource group | Within limit |
| Application Insights components, target resource group | 0 | 1 | 1 | 800 resources/type/resource group | Within ARM bound |
| User-assigned managed identities, West Europe | 0 | 2 | 2 | Creation rate 80/subscription/region/20 seconds; ARM bound 800/type/resource group | Within limit |
| Role assignments per subscription | 14 | 4 | 18 | 4,000 | Within limit |
| Key Vault secret creates | 0 by this plan | 0 | 0 | 300 create operations/10 seconds; no object-count restriction | No secret mutation authorized |

No quota increase is required for source preparation. Any changed current usage, SKU constraint, or tenant-context mismatch is a deployment preflight failure, not permission to proceed optimistically.

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
- Add an idempotency/concurrency guard so retries cannot overlap a still-running full synchronization.
- Configure bounded job timeout, retry count, and parallelism.
- Give the job a dedicated managed identity and access only to its scheduler credential.
- Pin the job image to an approved immutable digest with recorded provenance.
- Keep the Terraform job disabled by default; enabling its hourly schedule is a separate production approval.

### Correct and harden Terraform/workflows

- Replace the stale Mystira subscription/backend defaults with the confirmed NeuralLiquid subscription context without changing the caller's active Azure CLI subscription.
- Validate `max_replicas >= min_replicas` and reject invalid input early.
- Do not create placeholder secret values or real secret values in Terraform. Model only the vault, access boundary, and references to separately provisioned secrets.
- Narrow Key Vault grants from whole-vault access where Azure supports a secret-scoped assignment suitable for the runtime reference design.
- Set `persist-credentials: false` on workflow checkout steps.
- Pass GitHub variables through environment variables rather than interpolating them directly into shell commands.
- Ignore all Terraform variable-file variants while preserving a committed example file if one is required.
- Correct the configuration audit and environment inventory, including `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING`.

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
- [ ] Obtain explicit approval of this plan.
- [ ] Implement the source-only changes on the isolated branch.
- [ ] Run local validation and self-review.
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
