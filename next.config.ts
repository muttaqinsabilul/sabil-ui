import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out,
  // served by a Cloudflare Worker with static assets (see wrangler.jsonc).
  // Redirects live in public/_redirects, which Cloudflare reads.
  output: "export",
  images: {
    // No image server in a static export; remote images load as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
}

export default nextConfig
