import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    authInterrupts: true,
    optimizeCss: false,
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-switch",
      "@radix-ui/react-progress",
      "@radix-ui/react-scroll-area",
      "date-fns",
    ],
  },
};

export default nextConfig;
