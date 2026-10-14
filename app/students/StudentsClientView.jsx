"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ContextAssessmentModal from "../components/ContextAssessmentModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  BookOpen, 
  FileText,
  Mail,
  ExternalLink,
  Layers,
  Download,
  Terminal,
  FolderGit2
} from "lucide-react";
import { sound } from "../utils/sound";
import { STUDENT_OFFERS, STUDENT_RESOURCES } from "../data/portfolioData";

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

export default function StudentsClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Handle auto-scroll and highlight on hash navigation (e.g. #student-mentorship, #resource-fullstack-ai-roadmap)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const targetId = hash.slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -100, duration: 1.0 });
            } else {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            el.classList.add("ring-2", "ring-[#B45309]", "ring-offset-4", "transition-all", "duration-500");
            setTimeout(() => {
              el.classList.remove("ring-2", "ring-[#B45309]", "ring-offset-4");
            }, 2500);
          }, 120);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Filter resources by category
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    (STUDENT_RESOURCES || []).forEach(r => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, []);

  const filteredResources = useMemo(() => {
    if (selectedCategory === "All") return STUDENT_RESOURCES || [];
    return (STUDENT_RESOURCES || []).filter(r => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      {/* Scroll indicator bar */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#B45309] origin-left z-50 pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <Navbar 
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAssessment={() => setAssessmentOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden border-b border-[#E4D9BC]/80">
          <ConstellationCanvas />

          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Category Eyebrow Pill */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#E4D9BC] font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Free Community Initiative · Students &amp; Early Builders
                </span>
              </div>

              {/* Title */}
              <RevealTitle text="Free Resources, Mentorship &amp; Grants for Student Builders." />

              {/* Subtitle */}
              <p className="mt-6 text-[1.125rem] leading-[1.75] text-[#57534E] font-light max-w-2xl">
                Real-world engineering feedback, production roadmaps, and boilerplate starters for college students, self-taught coders, and campus founders — 100% free with zero corporate fluff.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#resources"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-3 font-mono text-xs font-bold text-white shadow-xs hover:bg-[#A16207] transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Free Resources ({STUDENT_RESOURCES?.length || 0})</span>
                </a>
                <a
                  href="#offers"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-white px-5 py-3 font-mono text-xs font-semibold text-[#4A3B33] border border-[#E4D9BC] shadow-xs hover:border-[#B45309]/50 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Student Perks &amp; Grants ({STUDENT_OFFERS?.length || 0})</span>
                </a>
              </div>

              {/* Quick Trust Counters */}
              <div className="mt-12 pt-8 border-t border-[#E4D9BC]/70 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
                <div>
                  <div className="text-2xl font-bold text-[#4A3B33]">100% Free</div>
                  <div className="text-[11px] text-[#78716C] uppercase tracking-wider mt-0.5">Resources &amp; Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#B45309]">48-Hour</div>
                  <div className="text-[11px] text-[#78716C] uppercase tracking-wider mt-0.5">Turnaround Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#4A3B33]">Zero Fluff</div>
                  <div className="text-[11px] text-[#78716C] uppercase tracking-wider mt-0.5">Direct 1-on-1 Access</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#059669]">80% Grant</div>
                  <div className="text-[11px] text-[#78716C] uppercase tracking-wider mt-0.5">For Student Startups</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: FREE DEVELOPER RESOURCES & LEARNING TOOLKITS */}
        <section id="resources" className="py-20 md:py-28 bg-[#FAF6EE]/50 border-b border-[#E4D9BC]/80 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                  <BookOpen className="w-3.5 h-3.5" />
                  Free Toolkits &amp; Guides
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A3B33] mt-2 mb-3">
                  Free Student Developer Resources
                </h2>
                <p className="text-[1rem] text-[#57534E] max-w-2xl leading-relaxed">
                  Curated roadmaps, production starters, architecture cheatsheets, and developer templates. 100% open and free to use.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[#B45309] text-white border-[#B45309] shadow-xs"
                        : "bg-white text-[#78716C] border-[#E4D9BC] hover:border-[#B45309]/50 hover:text-[#4A3B33]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredResources.map((res, idx) => (
                <div
                  key={res.id}
                  id={`resource-${res.id}`}
                  className="scroll-mt-32 group relative rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-7 sm:p-9 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] hover:border-[#B45309]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Category & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-[#B45309] bg-[#B45309]/10 px-2.5 py-1 rounded border border-[#B45309]/20">
                        {res.category.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded border border-[#059669]/20">
                        {res.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-[#4A3B33] mb-2 group-hover:text-[#B45309] transition-colors">
                      {res.title}
                    </h3>

                    {/* Tagline */}
                    <p className="font-mono text-xs text-[#78716C] mb-4">
                      {res.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] mb-6">
                      {res.description}
                    </p>

                    {/* Tags */}
                    {res.tags && res.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {res.tags.map((t, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="font-mono text-[10.5px] text-[#78716C] bg-[#FAF6EE] border border-[#E4D9BC] px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-[#E4D9BC]/60">
                    <a
                      href={res.downloadOrOpenUrl}
                      target={res.downloadOrOpenUrl.startsWith("http") ? "_blank" : undefined}
                      rel={res.downloadOrOpenUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => sound.playClick()}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#FAF6EE] border border-[#E4D9BC] py-3 px-4 font-mono text-xs font-bold text-[#4A3B33] group-hover:bg-[#B45309] group-hover:text-white group-hover:border-[#B45309] transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{res.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: STUDENT PERKS & OFFERS */}
        <section id="offers" className="py-20 md:py-28 bg-[#FDFBF7] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                <Sparkles className="w-3.5 h-3.5" />
                Mentorship &amp; Grants
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A3B33] mt-2 mb-4">
                Student Perks &amp; Builder Offers
              </h2>
              <p className="text-[1rem] text-[#57534E] max-w-2xl leading-relaxed">
                Direct engineering mentorship, free GitHub code reviews, open-source production templates, and subsidized MVP build grants.
              </p>
            </div>

            {/* Grid of Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {STUDENT_OFFERS.map((offer, idx) => (
                <div
                  key={offer.id}
                  id={`student-${offer.id}`}
                  className="scroll-mt-32 group relative rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-7 sm:p-9 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] hover:border-[#B45309]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Number & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="font-mono text-xs font-bold text-[#B45309] bg-[#B45309]/10 px-2.5 py-1 rounded border border-[#B45309]/20">
                        0{idx + 1} // {offer.highlight}
                      </span>
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded border border-[#059669]/20">
                        {offer.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-[#4A3B33] mb-2 group-hover:text-[#B45309] transition-colors">
                      {offer.title}
                    </h3>

                    {/* Tagline */}
                    <p className="font-mono text-xs text-[#78716C] mb-4">
                      {offer.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] mb-6">
                      {offer.description}
                    </p>

                    {/* Perks List */}
                    <div className="border-t border-[#E4D9BC]/60 pt-4 mb-6">
                      <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#78716C] font-semibold mb-3">
                        Included in this offer:
                      </div>
                      <ul className="space-y-2">
                        {offer.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#57534E] leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-[#E4D9BC]/60">
                    <a
                      href={offer.actionUrl}
                      target={offer.actionUrl.startsWith("http") ? "_blank" : undefined}
                      rel={offer.actionUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => sound.playClick()}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#FAF6EE] border border-[#E4D9BC] py-3 px-4 font-mono text-xs font-bold text-[#4A3B33] group-hover:bg-[#B45309] group-hover:text-white group-hover:border-[#B45309] transition-all cursor-pointer"
                    >
                      <span>{offer.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* How to claim card */}
            <div className="mt-16 p-8 rounded-xl border border-[#E4D9BC] bg-[#FAF6EE] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  Simple Eligibility Rule
                </div>
                <h4 className="font-serif text-xl font-bold text-[#4A3B33]">
                  No red tape. Just genuine students who are actively building.
                </h4>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  You don&apos;t need an official institutional email. Any active student ID, GitHub profile showing your projects, or a link to what you&apos;re currently learning is enough.
                </p>
              </div>

              <a
                href="mailto:aniketmishra492@gmail.com?subject=Student%20Offer%20Inquiry&body=Hi%20Aniket,%20I%20am%20a%20student%20and%20interested%20in..."
                onClick={() => sound.playClick()}
                className="shrink-0 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-3 font-mono text-xs font-bold text-white shadow-xs hover:bg-[#A16207] transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Aniket Directly →</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section specifically for students */}
        <section className="py-16 md:py-20 border-t border-[#E4D9BC] bg-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-8">
            <h3 className="font-serif text-2xl font-bold text-[#4A3B33] mb-8 text-center">
              Frequently Asked Questions for Students
            </h3>

            <div className="space-y-4">
              {[
                {
                  q: "Is the mentorship and code review really 100% free?",
                  a: "Yes, completely free. I dedicate several slots each month to support aspiring engineers and open-source contributors without charging anything."
                },
                {
                  q: "How does the 80% MVP grant work for student startups?",
                  a: "If you and your co-founders are college students building a serious MVP, I subsidize up to 80% of typical commercial agency costs so you can launch a production-grade software product in 2–4 weeks."
                },
                {
                  q: "What tech stack do you review?",
                  a: "Next.js, React, Node.js, Python, FastAPI, .NET, PostgreSQL, Supabase, Tailwind CSS, Chrome Extensions (MV3), and AI agent pipelines."
                },
                {
                  q: "How soon can I expect a response?",
                  a: "Usually within 24 to 48 hours directly on email or GitHub."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-lg border border-[#E4D9BC] bg-[#FDFBF7]">
                  <div className="font-serif font-bold text-sm text-[#4A3B33] mb-1.5">
                    {item.q}
                  </div>
                  <div className="text-xs text-[#57534E] leading-relaxed">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <DarkCTA />
      </main>

      <Footer />

      <SearchModal 
        isOpen={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />

      <ContextAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />
    </div>
  );
}
