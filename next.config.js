/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  },
};

module.exports = nextConfig;
