import React from "react";
import { notFound } from "next/navigation";
import LabsClientView from "./LabsClientView";

export const metadata = {
  title: "Aniket AI Labs - Context Arithmetic & Model Hot-Swap Simulator",
  description:
    "Interactive Laboratory for Context Set Arithmetic (∩ ∪ − rank) and multi-model hot-swapping between Claude 3.5 Sonnet, GPT-4o, and Gemini 2.0 Flash.",
  alternates: {
    canonical: "https://aniket.one/labs"
  }
};

export default function LabsPage() {
  // Learn & Docs section hidden permanently — page returns 404.
  // To re-enable: remove notFound() below and restore the <LabsClientView /> render.
  notFound();
  return <LabsClientView />;
}
