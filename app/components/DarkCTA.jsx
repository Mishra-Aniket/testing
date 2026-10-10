"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { sound } from "../utils/sound";

// Count-up on scroll-into-view, matching the original site's animated stat counters
function useCountUp(target, decimals, started) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const DURATION = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, decimals]);
  return value;
}

function AnimatedStats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const latency = useCountUp(300, 0, started);
  const halluc = useCountUp(99.7, 1, started);
  const debug = useCountUp(20, 0, started);
  const api = useCountUp(1, 0, started);

  const statWrap = "py-10 sm:py-12 sm:pr-8 lg:pr-10 border-white/[0.08]";
  const statWrapL = " border-t sm:border-t-0 sm:border-l sm:pl-8 lg:pl-10";
  const numCls = "font-bold text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em] tabular-nums mb-5 text-[#F5F5F4]";
  const titleCls = "text-[15px] font-bold leading-snug mb-2 text-[#E7E5E4]";
  const subCls = "font-mono text-[10.5px] uppercase tracking-[0.14em] leading-relaxed text-[#A8A29E]";

  return (
    <div ref={ref} className="relative mx-auto px-6 lg:px-8 max-w-[1200px] pt-24 md:pt-32 pb-4" aria-label="Aniket AI in numbers">
      <div aria-hidden="true" className="h-px w-full bg-white/[0.1] mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className={statWrap}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              <span className="text-[#E4C090]">&lt; </span>{latency}<span className="text-[#E4C090]">ms</span>
            </div>
            <div className={titleCls}>context retrieval latency</div>
            <div className={subCls}>p95 across all query types</div>
          </div>
        </div>
        <div className={statWrap + statWrapL}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {halluc.toFixed(1)}<span className="text-[#E4C090]">%</span>
            </div>
            <div className={titleCls}>reduction in hallucinations</div>
            <div className={subCls}>on domain-specific tasks</div>
          </div>
        </div>
        <div className={statWrap + " border-t lg:border-t-0 lg:border-l lg:pl-10"}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {debug}<span className="text-[#E4C090]">×</span>
            </div>
            <div className={titleCls}>faster agent debugging</div>
            <div className={subCls}>with context traces vs raw logs</div>
          </div>
        </div>
        <div className={statWrap + " border-t sm:border-l sm:pl-8 lg:border-t-0 lg:pl-10"}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {api}<span className="text-[#E4C090]"> API</span>
            </div>
            <div className={titleCls}>replaces 4 infra pieces</div>
            <div className={subCls}>vector DB, graph DB, cache, logger</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DarkCTA({ showStats = false }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      sound.playSuccess();
      setSubmitted(true);
    }
  };

  return (
    <div data-theme="dark" id="dark-cta-section" className="relative w-full bg-[#1C1917] text-[#F5F5F4] overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E4D9BC 1px, transparent 1px), linear-gradient(90deg, #E4D9BC 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      {/* STATS ROW with count-up - only shown on homepage when showStats=true */}
      {showStats && <AnimatedStats />}

      {/* CTA SECTION */}
      <section id="get-access" className="relative mx-auto max-w-[1200px] px-6 lg:px-8 pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="h-px w-full bg-white/[0.08] mb-16 md:mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="mb-7">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#E4C090]">
                <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#E4C090]" />
                Let&apos;s Build Together
              </span>
            </div>

            <h2 id="cta-heading" className="text-[clamp(2rem,4.2vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F4] mb-7 text-balance font-serif">
              {["Let's", "build", "something", "extraordinary"].map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.18em] -mr-[0.08em]">
                  <motion.span
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block will-change-transform"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              {" "}
              <span className="italic text-[#E4C090]">
                {["for", "your", "users."].map((word, idx) => (
                  <span key={idx} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.18em] -mr-[0.08em]">
                    <motion.span
                      initial={{ y: "110%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h2>

            <p className="text-[1.0625rem] text-[#A8A29E] leading-[1.75] mb-10 max-w-[30rem]">
              Available for high-impact freelance contracts, MVP product sprints, and custom AI integrations. Have a project idea or need technical advisory? Let&apos;s make it reality.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 max-w-[30rem]">
              {[
                "Rapid 2–4 Week MVPs",
                "Full Source Ownership",
                "Direct 1-on-1 Access",
                "Zero Technical Debt"
              ].map((badge, idx) => (
                <li key={idx} className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] uppercase text-[#D6D3D1]">
                  <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#E4C090]" />
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Request API Access / Project Inquiry Card */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-[6px] border border-white/[0.09] bg-[#232020]/90 p-8 lg:p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#F5F5F4] mb-2 font-serif">
                Start a Project / Hire Me
              </h3>
              <p className="text-sm text-[#A8A29E] mb-8">
                Drop your email and let&apos;s schedule a quick introductory chat.
              </p>

              {submitted ? (
                <div className="rounded-[6px] border border-[#E4C090]/30 bg-[#E4C090]/10 p-5 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#E4C090] mx-auto mb-2" />
                  <div className="font-serif font-bold text-white text-base mb-1">
                    Inquiry Received!
                  </div>
                  <p className="text-xs text-[#A8A29E]">
                    Thank you! I will get back to you at <span className="text-white font-mono">{email}</span> within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <label htmlFor="cta-email" className="sr-only">Email</label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    className="w-full rounded-[6px] border border-white/[0.1] bg-[#1C1917] px-4 py-3.5 text-sm text-[#F5F5F4] placeholder-[#78716C] outline-none transition-all duration-200 focus:border-[#E4C090]/70 focus:ring-1 focus:ring-[#E4C090]/40"
                  />
                  <button
                    type="submit"
                    data-custom-sound="true"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207]"
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}

              <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:gap-6 font-mono text-xs">
                <a href="mailto:hello@aniket.one" className="text-[#E4C090] hover:underline font-semibold">
                  Direct Email: hello@aniket.one →
                </a>
                <a href="#how-it-works" className="text-[#E4C090] hover:underline font-semibold">
                  View Workflow →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
