/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  trailingSlash: false,
  poweredByHeader: false,

  // ===== Added for Pages deployment =====
  typescript: {
    ignoreBuildErrors: true, // ignores TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // skips linting during build
  },
};

module.exports = nextConfig;
