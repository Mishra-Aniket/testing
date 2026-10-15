import type { MetadataRoute } from 'next';
import { COMPARISONS } from './data/comparisons';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one';

  // All static pages
  const staticPages = [
    '', // homepage
    '/blog',
    '/compare',
    '/creators-program',
    '/docs',
    '/labs',
    '/pricing',
    '/privacy',
    '/security',
    '/students',
    '/terms',
    '/thesis',
    '/use-cases',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  // All comparison pages (primary slugs + aliases)
  const comparisonSlugs: string[] = [];
  for (const [slug, data] of Object.entries(COMPARISONS)) {
    if (typeof data === 'function') continue; // skip getComparison helper
    comparisonSlugs.push(slug);
    if ((data as any).aliases) {
      comparisonSlugs.push(...(data as any).aliases);
    }
  }

  const comparisonEntries: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...comparisonEntries];
}
