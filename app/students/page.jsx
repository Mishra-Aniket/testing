import React from "react";
import { notFound } from "next/navigation";
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
  // Students section temporarily hidden — page returns 404.
  // To re-enable: remove notFound() below and restore the <StudentsClientView /> render.
  notFound();
  return <StudentsClientView />;
}
