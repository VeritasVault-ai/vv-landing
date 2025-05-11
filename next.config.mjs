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
}

export default nextConfig
