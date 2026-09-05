# Dependency audit baseline — 2026-09-05

## Outcome

The authoritative pnpm graph now reports:

| Severity | Before | After |
| --- | ---: | ---: |
| Critical | 3 | 0 |
| High | 38 | 0 |
| Moderate | 35 | 0 |
| Low | 10 | 2 |
| Total | 86 | 2 |

The before/after figures come from `pnpm audit --prod` on the merged `main`
baseline and `pnpm audit` after remediation. The pre-change GitHub default-branch
summary was broader (125 alerts: 5 critical, 51 high, 54 moderate, 15 low)
because GitHub also retained its own alert state and development paths.

## Remediation

- Upgraded Next.js from 15.3.1 to the patched 15.5.25 release line.
- Upgraded NextAuth from 4.24.11 to 4.24.15.
- Upgraded Supabase JS from 2.49.9 to 2.115.0.
- Upgraded AI SDK within v4 from 4.3.16 to 4.3.19.
- Removed unused direct `@auth/core` and `nodemailer` dependencies. Both were
  optional NextAuth peers and neither was imported by application code.
- Pinned patched transitive versions for the remaining vulnerable build and
  runtime dependency paths through pnpm overrides.
- Added `pnpm audit --audit-level=high` to Web Quality so critical/high
  regressions fail pull-request and `main` CI.

## Residual low-severity findings

1. `ai` has a file-type whitelist bypass fixed in AI SDK 5.0.52. The application
   uses the v4 `generateText` API in four server routes and does not expose the
   affected file-upload feature. Moving to v5 is a separately validated major
   migration rather than a lockfile-only security patch.
2. `@ai-sdk/provider-utils` is pulled through `@ai-sdk/deepinfra`. The advisory
   currently declares no patched version. This provider path should be removed
   or migrated when the AI provider surface is consolidated.

These residuals do not meet the high-severity CI threshold. They remain visible
in `pnpm audit`; no ignore or audit suppression was added.

## Validation

- `pnpm audit`: 0 critical, 0 high, 0 moderate, 2 low.
- `pnpm test`: 40/40 passed.
- `pnpm run audit-config`: passed.
- `pnpm build`: passed and generated 129/129 pages.
- `pnpm exec tsc --noEmit`: still stops on the same eight pre-existing syntax
  errors in untouched files. The dependency change introduced no new reported
  typecheck baseline errors before that existing parse barrier.
