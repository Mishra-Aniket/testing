import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug, COMPARISONS } from "../../data/comparisons";
import ComparisonClientView from "./ComparisonClientView";

export function generateStaticParams() {
  // Section hidden — slugs still enumerated so static export succeeds,
  // but every page prerenders as 404 (see notFound() below).
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
  return { title: "Not Found" };
}

export default async function ComparisonPage({ params }) {
  // Comparison pages (fictional "Aniket AI" product) hidden — returns 404.
  // To re-enable: restore generateStaticParams + metadata + the render below.
  notFound();
  const resolvedParams = await params;
  const comp = getComparisonBySlug(resolvedParams.slug);
  if (!comp) notFound();
  return <ComparisonClientView comp={comp} />;
}
