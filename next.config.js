/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

module.exports = nextConfig;
