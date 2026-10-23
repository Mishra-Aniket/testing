import React from "react";
import { notFound } from "next/navigation";
import CompareIndexClientView from "./CompareIndexClientView";

export default function ComparePage() {
  // Comparison pages (fictional "Aniket AI" product) hidden — returns 404.
  // To re-enable: remove notFound() below and restore the <CompareIndexClientView /> render.
  notFound();
  return <CompareIndexClientView />;
}
