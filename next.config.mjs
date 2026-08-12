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
  // Only the container build asks for a standalone server bundle. Vercel builds
  // must stay byte-identical to what is in production today, so this is opt-in
  // via BUILD_STANDALONE rather than set unconditionally.
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
}

export default nextConfig
