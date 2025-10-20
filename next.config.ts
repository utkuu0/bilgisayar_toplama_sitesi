import type { NextConfig } from "next";

const nextConfig = {
  /* Ensure Turbopack uses this folder as the workspace root to avoid lockfile root warnings */
  turbopack: {
    root: __dirname,
  },
} as NextConfig & { turbopack?: { root?: string } };

export default nextConfig;
