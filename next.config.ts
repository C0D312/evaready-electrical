import type { NextConfig } from "next";
import { resolveDeploymentConfig } from "./config/deployment";

const deployment = resolveDeploymentConfig();
const basePath = deployment.basePath;

// Keep application metadata and asset helpers on the exact same build profile.
process.env.NEXT_PUBLIC_BASE_PATH = deployment.basePath;
process.env.NEXT_PUBLIC_SITE_URL = deployment.siteUrl;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
