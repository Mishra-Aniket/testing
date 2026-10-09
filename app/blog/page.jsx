import React from "react";
import BlogClientView from "./BlogClientView";

export const metadata = {
  title: "Engineering Blog - Aniket AI | Context Tracing & Agent Systems",
  description:
    "Engineering walkthroughs, architecture benchmarks, and technical guides on debugging AI agents, context set arithmetic, and institutional knowledge graphs.",
  alternates: {
    canonical: "https://aniket.one/blog"
  }
};

export default function BlogPage() {
  return <BlogClientView />;
}
