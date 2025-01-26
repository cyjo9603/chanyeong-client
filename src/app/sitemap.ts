import type { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';

const getCachedPostIds = unstable_cache(
  async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/ids`);
    const ids: string[] = (await data.json()) || [];

    return ids;
  },
  ['sitemap'],
  { revalidate: 60 }
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await getCachedPostIds();

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...ids.map(
      (id: string) =>
        ({
          url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/posts/${id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        } as const)
    ),
  ];
}

export const dynamic = 'force-dynamic';
