import type { NextConfig } from 'next';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

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
  // TODO: 추후 다른 기능 생기면 제거
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

export default nextConfig;
