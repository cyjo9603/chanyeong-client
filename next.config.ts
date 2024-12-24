import type { NextConfig } from "next";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  distDir: "dist",
  poweredByHeader: false,
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "src/")],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  rewrites: isDevelopment
    ? async () => {
        return [
          {
            source: "/graphql",
            destination: "http://localhost:4011/graphql",
          },
        ].filter((v) => v);
      }
    : undefined,
};

export default nextConfig;
