import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isCustomDomain = process.env.CUSTOM_DOMAIN === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "testing";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions && !isCustomDomain ? `/${repo}` : "");

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
