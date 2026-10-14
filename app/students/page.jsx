import React from "react";
import StudentsClientView from "./StudentsClientView";

export const metadata = {
  title: "Free Student Perks & Builder Grants — Aniket Mishra",
  description:
    "Free 1-on-1 engineering mentorship, architecture code reviews, open-source production starters, and subsidized MVP grants for student developers and founders.",
  alternates: {
    canonical: "https://aniket.one/students",
  },
};

export default function StudentsPage() {
  return <StudentsClientView />;
}
