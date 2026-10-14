"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, Smartphone, CheckCircle2 } from "lucide-react";
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

export default function PrivacyClientView() {
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
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4C090] z-[9999] pointer-events-none transition-transform duration-75 ease-out" 
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
                  <span className="text-[#B45309] font-semibold">Privacy Policy</span>
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
                Updated October 2026
              </span>
            </motion.div>

            <RevealTitle text="Privacy Policy for Aniket Mishra Apps & Extensions" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              This Privacy Policy explains how Aniket Mishra (&ldquo;I&rdquo;, &ldquo;me&rdquo;, or &ldquo;we&rdquo;) handles and protects your data across all of my software applications, browser extensions (including OmTabs and OmSpace on the Chrome Web Store), web utilities (including ImgWorld.buzz), and engineering client services.
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

        {/* Content Body */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px] space-y-12 text-[#57534E] leading-[1.8] text-[15px]">
          {/* Card Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                100% Local Browser Storage
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Chrome extensions (OmTabs &amp; OmSpace) store your customized tab titles, focus bookmarks, and preferences exclusively in your local Chrome browser storage via the Chrome Storage API. No tab contents are sent to any remote server.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                On-Device Media Processing
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                ImgWorld.buzz processes images directly inside your browser using WebAssembly and native Canvas APIs. Your photos never leave your device, ensuring complete visual confidentiality.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Zero Data Monetization
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                I do not sell, rent, license, or broker personal information to advertisers or data brokers. There are zero tracking pixels or third-party ads embedded in any of my extensions or apps.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Scoped Cloud Permissions
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                For cloud automation pipelines (Centrix, Nexus Streamer), Google Drive and YouTube API tokens are strictly scoped to the exact task you authorize and are never accessible to unauthorized third parties.
              </p>
            </div>
          </div>

          {/* Section 1: Chrome Extensions (OmTabs & OmSpace) */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              1. Chrome Extensions Policy (OmTabs &amp; OmSpace)
            </h2>
            <p>
              When installing OmTabs or OmSpace from the official Google Chrome Web Store, the extensions request minimal necessary browser permissions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#4A3B33]">Tabs permission (`tabs`):</strong> Used solely to retrieve current tab IDs, URLs, and titles so you can rename, pin, group, or organize them.
              </li>
              <li>
                <strong className="text-[#4A3B33]">Storage permission (`storage`):</strong> Used to persist your custom tab labels, workspace names, and dashboard settings locally inside `chrome.storage.local` and `chrome.storage.sync`.
              </li>
              <li>
                <strong className="text-[#4A3B33]">No External Transmission:</strong> Your browsing history, visited websites, and tab URLs are never tracked, logged, or uploaded to any analytics or cloud servers.
              </li>
            </ul>
          </div>

          {/* Section 2: Enterprise Systems (Centrix & Nexus Streamer) */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              2. Enterprise Automation Systems (Centrix &amp; Nexus Streamer)
            </h2>
            <p>
              Centrix coordinates automated lecture and operations file ingestion across physical learning centers. Nexus Streamer provides automated zero-RAM cloud streaming from Google Drive to YouTube:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                OAuth credentials and refresh tokens are encrypted at rest using industry-standard cryptography.
              </li>
              <li>
                Files are streamed directly between authenticated endpoints without storing permanent unencrypted video assets on intermediary servers.
              </li>
              <li>
                You may revoke Google Drive / YouTube access at any time directly through your Google Account Security settings.
              </li>
            </ul>
          </div>

          {/* Section 3: Client & Freelance Projects */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              3. Freelance Engineering &amp; Client Data
            </h2>
            <p>
              For clients engaging my software engineering, MVP development, or consulting services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All proprietary client documentation, API keys, database credentials, and business logic are treated with strict confidentiality.</li>
              <li>Upon project completion and milestone handover, 100% of code, intellectual property, and access tokens are transferred to the client, with all temporary local staging credentials purged.</li>
              <li>Mutual Non-Disclosure Agreements (NDAs) are routinely executed prior to codebase access.</li>
            </ul>
          </div>

          {/* Section 4: Contact Information */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              4. Contact &amp; Data Subject Requests
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, your rights, or wish to make an inquiry regarding any of my applications, please contact me directly:
            </p>
            <div className="rounded-xl border border-[#E4D9BC] bg-[#FAF6EE] p-6 space-y-2">
              <div className="font-bold text-[#4A3B33]">Aniket Mishra</div>
              <div className="text-sm">Full-Stack &amp; Systems Engineer · MSME Registered Enterprise (Govt. of India)</div>
              <div className="text-sm font-mono text-[#B45309]">Udyam Reg. No: UDYAM-UP-03-0065855 (Micro · Services)</div>
              <div className="text-sm">Registered Entity: Prayagraj, Uttar Pradesh 211008, India (Full address on formal contract / NDA)</div>
              <div className="text-sm font-mono">Email: aniketmishra492@gmail.com</div>
              <div className="text-sm font-mono">GitHub: https://github.com/aniketmishra-0</div>
            </div>
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
