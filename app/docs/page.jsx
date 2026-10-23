import React from "react";
import { notFound } from "next/navigation";
import DocsClientView from "./DocsClientView";

export const metadata = {
  title: "Documentation & SDK Quickstart - Aniket AI",
  description:
    "Aniket AI Developer Guide and SDK Documentation. Quickstart guides for TypeScript, Python, and REST APIs to ground AI agents in persistent context.",
  alternates: {
    canonical: "https://aniket.one/docs"
  }
};

export default function DocsPage() {
  // Learn & Docs section hidden permanently — page returns 404.
  // To re-enable: remove notFound() below and restore the <DocsClientView /> render.
  notFound();
  return <DocsClientView />;
}
