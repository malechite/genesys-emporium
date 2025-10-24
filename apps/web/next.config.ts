import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@genesys-emporium/emporium'],
  // Empty turbopack config to acknowledge we're using Turbopack
  // Path aliases are configured in tsconfig.json and automatically picked up
  turbopack: {},
};

export default nextConfig;
