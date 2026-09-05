/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@azure/monitor-opentelemetry"],
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push({
        "@azure/monitor-opentelemetry": "commonjs @azure/monitor-opentelemetry",
      })
    }
    return config
  },
  // The legacy repository still has broad type debt outside the locked alpha
  // slice. CI type-checks the Phase 1 security surface via tsconfig.alpha.json.
  // Remove this only after the repository-wide debt is separately tracked.
  typescript: {
    ignoreBuildErrors: true,
  },
  // No repository ESLint dependency/config exists yet. The alpha security
  // surface is guarded by tests and the scoped TypeScript gate above.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable the automatic favicon handling
  images: {
    unoptimized: true,
  },
  // The container build asks for a standalone server bundle; local development
  // keeps Next's default output for faster iteration.
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
}

export default nextConfig
