import React from "react";
import SecurityClientView from "./SecurityClientView";

export const metadata = {
  title: "Security & SOC 2 Compliance - Aniket AI | Enterprise Context Layer",
  description:
    "Aniket AI Enterprise Security: SOC 2 Type II compliance, Zero-Training Commitment, Tenant-Isolated Clusters, and End-to-End Cryptographic Auditability.",
  alternates: {
    canonical: "https://aniket.one/security"
  }
};

export default function SecurityPage() {
  return <SecurityClientView />;
}
