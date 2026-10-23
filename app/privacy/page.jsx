import React from "react";
import PrivacyClientView from "./PrivacyClientView";

export const metadata = {
  title: "Privacy Policy — Apps & Extensions",
  description:
    "Privacy Policy for Aniket Mishra's applications, Chrome extensions (OmTabs, OmSpace), web tools (ImgWorld.buzz), and software engineering services. Zero data selling, local storage, and strict on-device processing.",
  alternates: {
    canonical: "https://aniket.one/privacy"
  }
};

export default function PrivacyPage() {
  return <PrivacyClientView />;
}
