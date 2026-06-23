import type { NextConfig } from "next";
import path from "node:path";

// Design tokens live in src/shared/design and are auto-injected into every
// SCSS entry point (globals.scss) via `additionalData`. Single source of
// truth for the $sl-* tokens, available everywhere without an explicit
// @use in each file. Mirrors the voxanima / postpilot setup.
const designPath = path.join(process.cwd(), "src/shared/design");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [designPath],
    includePaths: [designPath],
    silenceDeprecations: ["legacy-js-api", "import"],
    additionalData: `@use "tokens" as *;\n`,
  },
  // Prospect listing photos are remote (Supabase storage / prospect CDNs).
  // We render plain <img> tags (no next/image) so any host works without a
  // remotePatterns allowlist — fine for a demo that's re-skinned per prospect.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
