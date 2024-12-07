/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'mwitophcdn.woyiswoy.com',
        port: '',
        pathname: '/img/**',
    }],
  },
  ... process.env.USEDOCKER === 'true' ? {
    experimental: {
      outputFileTracingRoot: '/app', // Important for Docker builds
    },
    output: 'standalone',
  } : {},
};

export default nextConfig;
