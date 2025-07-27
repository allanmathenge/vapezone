const checkEnvVariables = require("./check-env-variables");

checkEnvVariables();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace('https://', ''),
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "bucket-production-b2ce.up.railway.app",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
            },
          ]
        : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vapezone.co.ke",
          },
        ],
        destination: "https://www.vapezone.co.ke/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
