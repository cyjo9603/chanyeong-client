import type { NextConfig } from 'next';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig: NextConfig = {
  distDir: 'dist',
  poweredByHeader: false,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/')],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    remotePatterns: [{ hostname: 'chanyeong-assets.kr.object.ncloudstorage.com' }, { hostname: 'image.toast.com' }],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [{ source: '/', destination: '/blog', permanent: true }];
  },
  rewrites: isDevelopment
    ? async () => {
        return [
          {
            source: '/graphql',
            destination: 'http://localhost:4011/graphql',
          },
        ];
      }
    : undefined,
};

export default withBundleAnalyzer(nextConfig);
