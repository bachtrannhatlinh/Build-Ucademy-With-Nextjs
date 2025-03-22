/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude the NestJS project from the build using module rules
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [
        /NodeJS\/Building-Professional-NodeJS-Backend/,
      ],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', 
        port: '',
        pathname: '/photo/**', 
        search: '',
      },
    ],
  },
};

module.exports = nextConfig; 