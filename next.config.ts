import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['jspdf', 'fflate'],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
