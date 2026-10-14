import React from "react";
import SecurityClientView from "./SecurityClientView";

export const metadata = {
  title: "Security & Architecture Standards — Aniket Mishra",
  description:
    "Security architecture across Aniket Mishra's applications, Chrome extensions, and systems. Zero data selling, on-device local storage, scoped OAuth APIs, and hardened full-stack deployments.",
  alternates: {
    canonical: "https://aniket.one/security"
  }
};

export default function SecurityPage() {
  return <SecurityClientView />;
}
