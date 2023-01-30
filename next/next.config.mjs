/** @type {import('next').NextConfig} */



const nextConfig = {
  experimental: {
    appDir: true
  },
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '**',
      },
      
    ],
  },
};

export default nextConfig
