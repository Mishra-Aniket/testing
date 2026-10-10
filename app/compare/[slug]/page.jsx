import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug, COMPARISONS } from "../../data/comparisons";
import ComparisonClientView from "./ComparisonClientView";

export function generateStaticParams() {
  const slugs = [];
  for (const key of Object.keys(COMPARISONS)) {
    const comp = COMPARISONS[key];
    slugs.push({ slug: comp.slug });
    if (comp.aliases) {
      for (const alias of comp.aliases) {
        slugs.push({ slug: alias });
      }
    }
  }
  return slugs;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const comp = getComparisonBySlug(resolvedParams.slug);

  if (!comp) {
    return {
      title: "Comparison Not Found | Aniket AI"
    };
  }

  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    alternates: {
      canonical: `https://aniket.one/compare/${comp.slug}`
    },
    openGraph: {
      title: comp.metaTitle,
      description: comp.metaDescription,
      url: `https://aniket.one/compare/${comp.slug}`
    }
  };
}

export default async function ComparisonPage({ params }) {
  const resolvedParams = await params;
  const comp = getComparisonBySlug(resolvedParams.slug);

  if (!comp) {
    notFound();
  }

  return <ComparisonClientView comp={comp} />;
}
