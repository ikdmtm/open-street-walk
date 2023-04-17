/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['open-street-walk-backend.fly.dev', 'localhost'], // ホスト名を設定
  },
}

module.exports = nextConfig