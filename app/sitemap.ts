import type { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from './data/blogArticles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one';

  // Live static pages.
  // Hidden sections (kept in code, removed from sitemap):
  //   '/compare' (+24 slugs), '/creators-program', '/docs', '/labs', '/thesis', '/use-cases', '/students'
  const staticPages = [
    '', // homepage
    '/about',
    '/blog',
    '/pricing',
    '/privacy',
    '/security',
    '/terms',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  // Blog article pages
  const articleEntries: MetadataRoute.Sitemap = BLOG_ARTICLES.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}

