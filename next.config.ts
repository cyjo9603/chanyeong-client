import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  distDir: "dist",
  poweredByHeader: false,
  output: "standalone",
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
