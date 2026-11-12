import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.15", "localhost", "127.0.0.1"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 80],
  },
};

export default nextConfig;
