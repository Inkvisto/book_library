/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: false,
  async redirects() {
    return [
      {
        source: '/500',
        destination: '/',
        permanent: true,
      }
    ]
  },
};

export default nextConfig
