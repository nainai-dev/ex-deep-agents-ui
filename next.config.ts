import type { NextConfig } from "next";

// Static export for Cloudflare Pages. The app is 100% client-side
// (no API routes, no server actions, no server components doing data fetch),
// so `next build` emits a fully static `out/` tree.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
