import React from "react";
import { notFound } from "next/navigation";
import ArticleClientView from "./ArticleClientView";
import { BLOG_ARTICLES } from "../../data/blogArticles";
import { ARTICLE_CONTENT } from "../content";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: "/blog-og.png", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/blog-og.png"],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  const blocks = ARTICLE_CONTENT[slug];
  if (!article || !blocks) notFound();

  // Newest-first order (BLOG_ARTICLES is date-sorted)
  const idx = BLOG_ARTICLES.findIndex((a) => a.slug === slug);
  const prev = BLOG_ARTICLES[idx + 1] || null; // older article
  const next = idx > 0 ? BLOG_ARTICLES[idx - 1] : null; // newer article
  const related = BLOG_ARTICLES
    .filter((a) => a.slug !== slug)
    .sort((a, b) => (a.tag === article.tag ? -1 : 0) - (b.tag === article.tag ? -1 : 0))
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author, url: "https://aniket.one" },
    publisher: { "@type": "Person", name: "Aniket Mishra", url: "https://aniket.one" },
    url: `https://aniket.one/blog/${article.slug}`,
    image: "https://aniket.one/blog-og.png",
    keywords: (article.keywords || []).join(", "),
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClientView article={article} blocks={blocks} prev={prev} next={next} related={related} />
    </>
  );
}
