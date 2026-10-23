import React from "react";
import AboutClientView from "./AboutClientView";

export const metadata = {
  title: "About Me — Freelance Full-Stack & AI Systems Engineer",
  description:
    "What Aniket Mishra has shipped — Chrome extensions on the official Web Store, an edge-first ingestion engine, client-side AI tools and more. Fixed-scope sprints, weekly demos, full source handover.",
  alternates: {
    canonical: "https://aniket.one/about",
  },
  openGraph: {
    title: "About Aniket Mishra — Full-Stack & AI Systems Engineer",
    description: "Real shipped work, a boring-on-purpose process, and numbers that can be defended in a call.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aniket Mishra — About" }],
  },
};

export default function AboutPage() {
  return <AboutClientView />;
}
