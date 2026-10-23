import React from "react";
import { notFound } from "next/navigation";
import UseCasesClientView from "./UseCasesClientView";

export const metadata = {
  title: "Enterprise Use Cases - Aniket AI Context Layer | Aniket AI",
  description:
    "Explore how enterprise teams deploy Aniket AI across Customer Support, Financial Ops, Healthcare Continuity, and Legal Compliance.",
  alternates: {
    canonical: "https://aniket.one/use-cases"
  }
};

export default function UseCasesPage() {
  // Learn & Docs section hidden permanently — page returns 404.
  // To re-enable: remove notFound() below and restore the <UseCasesClientView /> render.
  notFound();
  return <UseCasesClientView />;
}
