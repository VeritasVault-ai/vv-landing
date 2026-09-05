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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
