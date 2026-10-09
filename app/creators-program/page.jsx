import React from "react";
import CreatorsClientView from "./CreatorsClientView";

export const metadata = {
  title: "Creators Program - Aniket AI | Grants & Free Tier for Builders",
  description:
    "Join the Aniket AI Creators Program. Receive 10M free context tokens per month, private Slack channel with core architects, and community showcase spotlights.",
  alternates: {
    canonical: "https://aniket.one/creators-program"
  }
};

export default function CreatorsProgramPage() {
  return <CreatorsClientView />;
}
