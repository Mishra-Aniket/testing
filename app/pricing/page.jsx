import React from "react";
import PricingClientView from "./PricingClientView";

export const metadata = {
  title: "Pricing - Aniket AI Context Layer | Aniket AI",
  description:
    "Choose the plan that works best for your needs. All plans include core features to build context-aware AI with persistent memory and sub-300ms retrieval.",
  alternates: {
    canonical: "https://aniket.one/pricing"
  }
};

export default function PricingPage() {
  return <PricingClientView />;
}
