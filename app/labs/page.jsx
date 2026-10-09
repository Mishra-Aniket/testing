import React from "react";
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
  return <LabsClientView />;
}
