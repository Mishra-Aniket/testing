import React from "react";
import BlogClientView from "./BlogClientView";

export const metadata = {
  title: "Engineering Blog & Technical Deep-Dives — Aniket Mishra",
  description:
    "Engineering guides, architecture deep-dives, and performance case studies by Aniket Mishra on scaling enterprise ingestion pipelines, Manifest V3 Chrome extensions, and cloud streaming.",
  alternates: {
    canonical: "https://aniket.one/blog"
  }
};

export default function BlogPage() {
  return <BlogClientView />;
}
