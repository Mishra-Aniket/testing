import React from "react";
import PricingClientView from "./PricingClientView";

export const metadata = {
  title: "Pricing & Sprint Packages — Freelance Full-Stack Engineer",
  description:
    "Transparent freelance sprint pricing from Aniket Mishra: rapid MVP builds in 2–4 weeks, Chrome extensions in 7–14 days, and performance audits in 3–7 days. Fixed scope, clean handover, full IP ownership.",
  alternates: {
    canonical: "https://aniket.one/pricing",
  },
};

export default function PricingPage() {
  return <PricingClientView />;
}
