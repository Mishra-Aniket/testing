"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2, Terminal } from "lucide-react";
import { sound } from "../utils/sound";

function RevealTitle({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="font-serif text-[clamp(2.125rem,4.6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#4A3B33] text-balance">
      {words.map((word, idx) => (
        <span 
          key={idx} 
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.18em] -mr-[0.08em]"
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.82,
              delay: 0.12 + idx * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function SecurityClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4D9BC] z-[9999] pointer-events-none transition-transform duration-75 ease-out" 
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }} 
      />

      <ConstellationCanvas />

      <Navbar 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenAssessment={() => {}} 
      />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[848px]">
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Breadcrumb" 
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-7"
            >
              <ol className="flex items-center gap-2 m-0 p-0 list-none">
                <li>
                  <Link 
                    href="/" 
                    onClick={() => sound.playClick()}
                    className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]"
                  >
                    Home
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-[#D6D3D1]">/</span>
                </li>
                <li>
                  <span className="text-[#B45309] font-semibold">Security & Architecture</span>
                </li>
              </ol>
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/[0.08] border border-[#B45309]/20 rounded-[var(--radius)] px-3 py-1.5">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-current" />
                Security Standards
              </span>
            </motion.div>

            <RevealTitle text="Application Security, Privacy & System Integrity" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Every tool, browser extension, and system I build is architected with strict security-by-design: on-device data isolation, minimal OAuth scoping, zero telemetry selling, and hardened cloud pipelines.
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.95, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "0% 50%" }}
              aria-hidden="true" 
              className="h-px w-full bg-[#E4D9BC] mt-12 md:mt-16" 
            />
          </div>
        </header>

        {/* Security Principles */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px] space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Local-First &amp; On-Device Isolation
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Chrome extensions (OmTabs, OmSpace) keep session data on the user&apos;s machine via Chrome Storage API. ImgWorld runs 100% on-device via WebAssembly without external image uploads.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Scoped OAuth &amp; Token Encryption
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Automations like Centrix and Nexus Streamer request strictly minimal Google Drive/YouTube API scopes with AES-256 encrypted token handling at rest.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Hardened Cloud Infrastructure
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Deployed across Vercel, Docker, and edge networks with TLS 1.3 encryption, strict Content Security Policy (CSP), HSTS headers, and automated vulnerability scanning in GitHub Actions.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Clean Client Code Handover
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                For freelance software engineering contracts, all custom code is delivered clean, audited, and without proprietary vendor lock-in or hidden telemetry. 100% IP belongs to the client.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E4D9BC] bg-[#FAF6EE] p-8 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#4A3B33]">
              Security &amp; Vulnerability Reporting
            </h3>
            <p className="text-sm text-[#57534E] max-w-[500px] mx-auto">
              If you identify any security vulnerability or bug in any of my published Chrome extensions or web applications, please reach out directly for expedited review.
            </p>
            <a
              href="mailto:aniketmishra492@gmail.com"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-soft hover:bg-[#A16207] transition-all"
            >
              Contact Aniket Mishra
            </a>
          </div>
        </section>

        <DarkCTA />
      </main>

      <Footer />

      <SearchModal
        isOpen={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
