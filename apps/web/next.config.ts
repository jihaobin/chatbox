import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(appDir, "../../..");

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    // 配置允许的图片域名
    domains: ['images.unsplash.com'],
  },
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
