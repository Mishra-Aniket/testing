"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Copy, Loader2 } from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { sendEmail } from "../../lib/emailjs";

const NEWSLETTER_TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER;
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

  const contribs = useCountUp(699, 0, started);
  const repos = useCountUp(64, 0, started);
  const extensions = useCountUp(2, 0, started);
  const weeks = useCountUp(4, 0, started);

  const statWrap = "py-10 sm:py-12 sm:pr-8 lg:pr-10 border-white/[0.08]";
  const statWrapL = " border-t sm:border-t-0 sm:border-l sm:pl-8 lg:pl-10";
  const numCls = "font-bold text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em] tabular-nums mb-5 text-[#F5F5F4]";
  const titleCls = "text-[15px] font-bold leading-snug mb-2 text-[#E7E5E4]";
  const subCls = "font-mono text-[10.5px] uppercase tracking-[0.14em] leading-relaxed text-[#A8A29E]";

  return (
    <div ref={ref} className="relative mx-auto px-6 lg:px-8 max-w-[1200px] pt-24 md:pt-32 pb-4" aria-label="Aniket Mishra in numbers">
      <div aria-hidden="true" className="h-px w-full bg-white/[0.1] mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className={statWrap}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {contribs}<span className="text-[#E4C090]">+</span>
            </div>
            <div className={titleCls}>GitHub contributions</div>
            <div className={subCls}>last 12 months, 2 profiles</div>
          </div>
        </div>
        <div className={statWrap + statWrapL}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {repos}<span className="text-[#E4C090]"> repos</span>
            </div>
            <div className={titleCls}>shipped &amp; public</div>
            <div className={subCls}>extensions, pipelines &amp; tools</div>
          </div>
        </div>
        <div className={statWrap + " border-t lg:border-t-0 lg:border-l lg:pl-10"}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              {extensions}<span className="text-[#E4C090]"> live</span>
            </div>
            <div className={titleCls}>extensions on the Chrome Web Store</div>
            <div className={subCls}>OmTabs &amp; OmSpace — official listings</div>
          </div>
        </div>
        <div className={statWrap + " border-t sm:border-l sm:pl-8 lg:border-t-0 lg:pl-10"}>
          <div className="h-full flex flex-col">
            <div className={numCls}>
              &lt; {weeks}<span className="text-[#E4C090]"> wks</span>
            </div>
            <div className={titleCls}>typical MVP sprint</div>
            <div className={subCls}>wireframe to launched</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DarkCTA({ showStats = false }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);

    // 1. EmailJS notification — lands in the inbox directly
    await sendEmail(NEWSLETTER_TPL, {
      subscriber_email: email.trim().toLowerCase(),
    });

    // 2. Supabase record (table exists via supabase/migrations/002_newsletter.sql)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        await supabase.from("subscribers").insert({ email: email.trim().toLowerCase() });
      }
    } catch {
      /* no keys / offline — subscription confirmed in UI regardless */
    }

    sound.playSuccess();
    setSubscribing(false);
    setSubscribed(true);
  };

  return (
    <div data-theme="dark" id="dark-cta-section" className="relative w-full bg-[#1C1917] text-[#F5F5F4] overflow-hidden">
      {/* Background subtle large grid matching Image 2 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          maskImage: "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 95%)"
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
                Follow the Build
              </h3>
              <p className="text-sm text-[#A8A29E] mb-8">
                One email when something new ships — projects, articles, free tools.
                No spam, unsubscribe anytime.
              </p>

              {subscribed ? (
                <div className="rounded-[6px] border border-[#E4C090]/30 bg-[#E4C090]/10 p-5 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#E4C090] mx-auto mb-2" />
                  <div className="font-serif font-bold text-white text-base mb-1">
                    You&apos;re on the list!
                  </div>
                  <p className="text-xs text-[#A8A29E]">
                    Welcome aboard — I&apos;ll email <span className="text-white font-mono">{email}</span> when
                    there&apos;s something worth reading.
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
                    disabled={subscribing}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Subscribing…</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Updates</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:gap-6 font-mono text-xs">
                <span className="inline-flex items-center gap-2">
                  <a href="mailto:hello@aniket.one" className="text-[#E4C090] hover:underline font-semibold">
                    Direct Email: hello@aniket.one →
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText("hello@aniket.one");
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 1600);
                      } catch {
                        /* clipboard unavailable */
                      }
                    }}
                    className="text-[#A8A29E] hover:text-[#E4C090] transition-colors cursor-pointer"
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {emailCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </span>
                <a href="#services" className="text-[#E4C090] hover:underline font-semibold">
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
