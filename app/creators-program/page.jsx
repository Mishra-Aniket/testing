import React from "react";
import { notFound } from "next/navigation";
import CreatorsClientView from "./CreatorsClientView";

export default function CreatorsProgramPage() {
  // Creators program (fictional SaaS) hidden — page returns 404.
  // To re-enable: remove notFound() below and restore the <CreatorsClientView /> render.
  notFound();
  return <CreatorsClientView />;
}
