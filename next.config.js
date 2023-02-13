/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
