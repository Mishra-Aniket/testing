import React from "react";
import TermsClientView from "./TermsClientView";

export const metadata = {
  title: "Terms of Use — Apps & Engineering Services",
  description:
    "Terms of Use for Aniket Mishra's applications, Chrome extensions (OmTabs, OmSpace), web tools, and freelance engineering services. Transparent terms, IP ownership, and acceptable use.",
  alternates: {
    canonical: "https://aniket.one/terms"
  }
};

export default function TermsPage() {
  return <TermsClientView />;
}
