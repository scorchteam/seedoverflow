/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdnb.artstation.com",
              "via.placeholder.com",
              "source.unsplash.com"]
  },
  env: {
    ENV: process.env.NODE_ENV,
    DEV_API: process.env.DEV_API,
    PROD_API: process.env.PROD_API
  }
}

module.exports = nextConfig
