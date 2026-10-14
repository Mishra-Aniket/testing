"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { FileCheck2, Scale, Code2, ShieldAlert, Cpu } from "lucide-react";
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

export default function TermsClientView() {
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
                  <span className="text-[#B45309] font-semibold">Terms of Use</span>
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

            <RevealTitle text="Terms of Use for Apps, Extensions & Engineering Services" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              These Terms of Use govern your access to and use of software applications, Chrome extensions (including OmTabs and OmSpace), open-source releases, web tools, and freelance engineering services provided by Aniket Mishra.
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
          {/* Terms Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Browser Extensions License
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                OmTabs and OmSpace are provided under personal and commercial use licenses via the Chrome Web Store. You may use them freely to optimize tab management, productivity, and privacy.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                100% Client IP Handover
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                For freelance software development engagements, full intellectual property, source code, and deployment ownership are transferred to the client upon milestone completion.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              1. Acceptance of Terms
            </h2>
            <p>
              By installing my browser extensions, accessing my web applications (such as aniket.one, ImgWorld.buzz, Centrix Demo, or Office Mobile), or contracting my software development services, you agree to be bound by these Terms of Use. If you do not agree, you should uninstall the extensions and discontinue use of the web properties.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              2. Acceptable Use of Applications &amp; Tools
            </h2>
            <p>
              You agree to use all published software tools in compliance with applicable laws and regulations. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use tools (such as Nexus Streamer or Centrix) to infringe upon third-party copyrights or broadcast unauthorized media content.</li>
              <li>Reverse-engineer or attempt to exploit any security vulnerabilities in published web services.</li>
              <li>Impersonate or misrepresent affiliation with Aniket Mishra or associated client projects.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              3. Freelance Sprints &amp; Service Deliverables
            </h2>
            <p>
              When contracting freelance engineering services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#4A3B33]">Clear Milestone Scopes:</strong> Work is executed in structured 1–2 week sprints with live staging links, direct daily/weekly communication, and documented milestone targets.
              </li>
              <li>
                <strong className="text-[#4A3B33]">Code &amp; IP Ownership:</strong> Upon settlement of agreed project milestone invoices, the client receives 100% copyright and intellectual property rights to the custom source code created for that project.
              </li>
              <li>
                <strong className="text-[#4A3B33]">Warranty Period:</strong> All production MVP deliverables include a complimentary 14-day post-launch bug fix and warranty period to ensure operational stability.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              4. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p>
              Free web utilities, open-source repositories, and Chrome extensions are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. While I endeavor to keep all software bug-free, performant, and secure, I shall not be liable for any incidental, indirect, or consequential damages resulting from browser crashes or third-party service outages (e.g. Google Drive, YouTube, or Vercel downtime).
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A3B33]">
              5. Governing Contact
            </h2>
            <p>
              For legal inquiries, commercial licensing, or freelance project contracts:
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
