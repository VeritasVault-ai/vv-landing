# Next.js 15 standalone build for Azure Container Apps.
#
# Why a container and not Static Web Apps: this app has middleware.ts and 45 API
# routes, which need a real Node server. SWA cannot run Next middleware properly.
# See docs/azure-runtime.md.

# ---- deps -------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app

# corepack pins pnpm from package.json's packageManager field, so the container
# resolves the same tree as local and CI. pnpm is authoritative here — the repo
# declares pnpm@10.11.0.
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build ------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Emits .next/standalone with a minimal server and only the traced deps.
ENV BUILD_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* values are inlined at build time, not read at runtime, so any
# that must differ per environment have to be passed as build args here rather
# than set on the Container App. See docs/azure-runtime.md.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_WS_BASE_URL
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING

RUN pnpm build

# ---- runtime ----------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run unprivileged.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/scripts/run-scheduled-sync.mjs ./scripts/run-scheduled-sync.mjs

USER nextjs
EXPOSE 3000

# Container Apps health probes hit /api/health — see infra/terraform/main.tf.
CMD ["node", "server.js"]
