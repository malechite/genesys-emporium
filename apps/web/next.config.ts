import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Discord OAuth redirects during development
  experimental: {
    allowedDevOrigins: ['discord.com', 'discordapp.com'],
  },
};

export default nextConfig;
