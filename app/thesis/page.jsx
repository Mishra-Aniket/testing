import React from "react";
import { notFound } from "next/navigation";
import ThesisClientView from "./ThesisClientView";

export const metadata = {
  title: "The Context Thesis - Aniket AI | Sovereign Context Layer",
  description:
    "Why models will keep changing, but your company's institutional context is the sovereign asset that compounds.",
  alternates: {
    canonical: "https://aniket.one/thesis"
  }
};

export default function ThesisPage() {
  // Learn & Docs section hidden permanently — page returns 404.
  // To re-enable: remove notFound() below and restore the <ThesisClientView /> render.
  notFound();
  return <ThesisClientView />;
}
