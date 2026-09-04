/** @type {import('next').NextConfig} */
const nextConfig = {
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
