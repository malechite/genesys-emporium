import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@genesys-emporium/emporium'],
  webpack: (config) => {
    const emporiumSrc = path.resolve(__dirname, '../../packages/emporium/src');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emporium/app': path.join(emporiumSrc, 'app'),
      '@emporium/redux': path.join(emporiumSrc, 'redux'),
      '@emporium/actions': path.join(emporiumSrc, 'redux/actions.tsx'),
      '@emporium/selectors': path.join(emporiumSrc, 'redux/selectors'),
      '@emporium/components': path.join(emporiumSrc, 'app/components'),
      '@emporium/ui': path.join(emporiumSrc, 'app/components'),
      '@emporium/data': path.join(emporiumSrc, 'assets/data'),
      '@emporium/data-lists': path.join(emporiumSrc, 'assets/data/lists.js'),
      '@emporium/images': path.join(emporiumSrc, 'assets/images'),
      '@emporium/styles': path.join(emporiumSrc, 'styles'),
      '@emporium/api': path.join(emporiumSrc, 'api'),
      '@emporium': emporiumSrc,
    };
    return config;
  },
};

export default nextConfig;
