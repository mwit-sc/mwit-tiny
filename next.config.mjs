/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'mwitophcdn.woyiswoy.com',
        port: '',
        pathname: '/img/**',
    }, ],
},
};

export default nextConfig;
