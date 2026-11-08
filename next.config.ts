import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/docs/motion", destination: "/motion", permanent: true }]
  },
  images: {
    // Hosts used by the image examples in components/examples.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
}

export default nextConfig
