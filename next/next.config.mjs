/** @type {import('next').NextConfig} */
import pwa from '@ducanh2912/next-pwa';

const withPWA = pwa({
  dest:'public',
  disable: process.env.NODE_ENV === 'development'
})

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
      },{
        source: '/email',
        destination: '/email#inbox',
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
        hostname: '**',
        port: '',
        pathname: '**',
      },
      
    ],
  },
};

export default withPWA(nextConfig)
