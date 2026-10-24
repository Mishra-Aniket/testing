"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { Check, ArrowRight, Zap, Rocket, Compass, MessageSquare, FileText, Code2, ShieldCheck, Loader2, CheckCircle2, Mail, Clock } from "lucide-react";
import { sound } from "../utils/sound";
import { createClient } from "../../lib/supabase/client";
import { sendEmail } from "../../lib/emailjs";

const TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY;

function RevealTitle({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="font-serif text-[clamp(2.125rem,4.6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#4A3B33] text-balance m-0">
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

const SPRINTS = [
  {
    id: "focused",
    icon: Zap,
    name: "Focused Sprint",
    timeline: "3 – 7 Days",
    tagline: "One sharp problem, shipped fast.",
    deliverables: [
      "Performance tuning & Core Web Vitals audits",
      "Landing pages & marketing sites",
      "Chrome extension features or fixes",
      "API integrations & automations",
      "Bug hunts with documented root-cause fixes"
    ],
    cta: "Get a Fixed Quote"
  },
  {
    id: "extension",
    icon: Rocket,
    name: "Extension / App Sprint",
    timeline: "7 – 14 Days",
    tagline: "A production browser product, store-ready.",
    featured: true,
    deliverables: [
      "Manifest V3 Chrome extension, end to end",
      "Background workers, storage & messaging done right",
      "Web Store listing, icons & review-safe packaging",
      "Zero-telemetry privacy architecture",
      "2 weeks of post-launch fixes included"
    ],
    cta: "Start a Sprint"
  },
  {
    id: "mvp",
    icon: Compass,
    name: "MVP Sprint",
    timeline: "2 – 4 Weeks",
    tagline: "From wireframe to launched, revenue-ready product.",
    deliverables: [
      "Full-stack app (Next.js / FastAPI / PostgreSQL)",
      "Auth, payments (Stripe / Razorpay) & admin panels",
      "Deployed, monitored & documented",
      "Weekly demos — you see progress every week",
      "Complete source handover, 100% IP yours"
    ],
    cta: "Scope My MVP"
  }
];

const BUDGETS = ["Under ₹50k", "₹50k – ₹2L", "₹2L – ₹5L", "₹5L+", "Let's discuss"];
const TIMELINES = ["ASAP", "Within 2 weeks", "This month", "Flexible"];

const PROCESS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery Call",
    body: "A 30-minute call to understand your goal, users and constraints. No charge, no pressure — we both check the fit."
  },
  {
    icon: FileText,
    step: "02",
    title: "Fixed-Scope Proposal",
    body: "You get a written proposal within 48 hours: exact deliverables, timeline, milestone payments and what's out of scope."
  },
  {
    icon: Code2,
    step: "03",
    title: "Sprint & Weekly Demos",
    body: "I build in weekly cycles. Every week you get a deployed build you can click through — progress you can verify, not just trust."
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Handover & Support",
    body: "Full source code, documentation and a walkthrough call. NDA available, IP transfers to you on final payment."
  }
];

const FAQS = [
  {
    q: "How is pricing decided?",
    a: "Every sprint is a fixed quote based on scope — agreed before any work starts. You pay per milestone, never per hour. Most clients start with a Focused Sprint to evaluate, then move to a full MVP engagement."
  },
  {
    q: "Do you work on hourly or retainer basis?",
    a: "Fixed-scope sprints are the default because clients budget better with them. For ongoing product work, a monthly retainer with a defined output rhythm is available after the first sprint — submit the form below and we'll discuss."
  },
  {
    q: "Who owns the code?",
    a: "You do — 100%. On final payment, the complete repository, documentation and all intellectual property transfer to you. A bilateral NDA is available before we exchange any sensitive details."
  },
  {
    q: "What if I need changes mid-sprint?",
    a: "Small course corrections are normal and included. If a change materially alters scope, I'll propose a written change order with revised timeline and cost before touching code — you decide, nothing is billed silently."
  },
  {
    q: "What do you need from me to start?",
    a: "A rough idea of the goal, any designs or references you have, and access to the accounts we'll deploy on (or I set them up in your name). That's it — I handle architecture, build and deployment."
  }
];

function nextMonthLabel() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function PricingClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Proposal form state
  const [selectedSprint, setSelectedSprint] = useState("mvp");
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const scrollToForm = (sprintId) => {
    setSelectedSprint(sprintId);
    const el = document.getElementById("propose");
    if (!el) return;
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -90 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const buildMailto = () => {
    const sprintLabel = SPRINTS.find((s) => s.id === selectedSprint)?.name || selectedSprint;
    const subject = encodeURIComponent(`Project Proposal Request — ${sprintLabel} — ${form.name}`);
    const body = encodeURIComponent(
      `Hi Aniket,\n\nI'd like to propose a project.\n\n` +
      `Name: ${form.name}\nEmail: ${form.email}\n` +
      (form.company ? `Company: ${form.company}\n` : "") +
      `Sprint: ${sprintLabel}\n` +
      (form.budget ? `Budget: ${form.budget}\n` : "") +
      (form.timeline ? `Timeline: ${form.timeline}\n` : "") +
      `\nProject details:\n${form.message}\n\n` +
      `---\nSent from aniket.one/pricing`
    );
    return `mailto:hello@aniket.one?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    // 1. EmailJS — lands directly in the inbox, works from the static site
    const emailed = await sendEmail(TPL, {
      from_name: form.name.trim(),
      reply_email: form.email.trim(),
      project_type: SPRINTS.find((s) => s.id === selectedSprint)?.name || selectedSprint,
      budget: form.budget || "-",
      timeline: form.timeline || "-",
      message: form.message.trim(),
    });

    // 2. Supabase record (contact_messages table, anonymous insert allowed by RLS)
    let dbSaved = false;
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        const { error } = await supabase.from("contact_messages").insert({
          name: form.name.trim(),
          email: form.email.trim(),
          project_type: SPRINTS.find((s) => s.id === selectedSprint)?.name || selectedSprint,
          budget: form.budget || null,
          timeline: form.timeline || null,
          message: form.message.trim(),
        });
        dbSaved = !error;
      }
    } catch {
      /* fall through to email */
    }

    // 2. Email delivery — guaranteed path on a static site: opens the
    //    visitor's mail client with the full proposal prefilled.
    try {
      window.open(buildMailto(), "_blank");
    } catch {
      /* popup blocked — email link is also shown below */
    }

    setSubmitting(false);
    setSubmitted(true);
    if (!emailed && !dbSaved) {
      setSubmitError("Your mail app should have opened with the proposal. If it didn't, email it directly to hello@aniket.one.");
    } else {
      setSubmitError("");
    }
    sound.playSuccess();
  };

  const inputCls =
    "w-full rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-4 py-3 text-sm text-[#4A3B33] placeholder-[#A8A29E] outline-none transition-all duration-200 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]/30";

  const chipCls = (active) =>
    `px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
      active
        ? "bg-[#B45309] border-[#B45309] text-white shadow-xs"
        : "bg-white border-[#E4D9BC] text-[#78716C] hover:border-[#B45309] hover:text-[#B45309]"
    }`;

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4D9BC] z-[9999] pointer-events-none transition-transform duration-75 ease-out"
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }}
      />

      <ConstellationCanvas />

      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenAssessment={() => {}} />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        {/* Header */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[1200px]">
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
                  <span className="text-[#B45309] font-semibold">Pricing</span>
                </li>
              </ol>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/[0.08] border border-[#B45309]/20 rounded-[var(--radius)] px-3 py-1.5">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-current animate-pulse" />
                Now Booking {nextMonthLabel()}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 bg-emerald-600/[0.07] border border-emerald-600/20 rounded-[var(--radius)] px-3 py-1.5">
                <Clock className="w-3 h-3" />
                Proposal in 48h
              </span>
            </motion.div>

            <RevealTitle text="Sprint Pricing, Agreed Before We Start" />

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Three engagement shapes built around how real freelance work succeeds: one sharp deliverable, a
              store-ready product, or a full MVP. Pick a sprint, submit your proposal, and get a written
              fixed-scope quote within 48 hours.
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

        {/* Sprint Cards */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {SPRINTS.map((sprint, idx) => {
              const Icon = sprint.icon;
              const selected = selectedSprint === sprint.id;
              return (
                <motion.div
                  key={sprint.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.55 + idx * 0.1 }}
                  className={`rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between relative ${
                    sprint.featured
                      ? "border-2 border-[#B45309] shadow-xl"
                      : "border border-[#E4D9BC] shadow-[var(--shadow-soft)]"
                  }`}
                >
                  {sprint.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B45309] text-white px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
                      Most Requested
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">
                        {sprint.name}
                      </span>
                      <Icon className="w-4 h-4 text-[#B45309]" />
                    </div>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-serif text-[1.65rem] font-black text-[#4A3B33]">{sprint.timeline}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#57534E]">{sprint.tagline}</p>

                    <ul className="mt-6 space-y-3 text-xs text-[#4A3B33] font-medium border-t border-[#E4D9BC]/60 pt-5 m-0 p-0 list-none">
                      {sprint.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#B45309] shrink-0 mt-[1px]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      scrollToForm(sprint.id);
                    }}
                    className={`mt-8 block w-full text-center rounded-[var(--radius)] py-2.5 text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selected
                        ? "bg-[#4A3B33] text-white"
                        : sprint.featured
                        ? "bg-[#B45309] text-white shadow-soft hover:bg-[#A16207]"
                        : "border border-[#E4D9BC] bg-[#FAF6EE] text-[#4A3B33] hover:border-[#B45309] hover:text-[#B45309]"
                    }`}
                  >
                    {selected ? "Selected ↓" : sprint.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Proposal Form */}
        <section id="propose" className="relative w-full bg-[#F8F4EE] border-t border-[#E4D9BC]/70 py-20 scroll-mt-20">
          <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left: pitch + what happens next */}
              <div className="lg:col-span-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">
                  Submit Your Proposal
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33] m-0">
                  Tell Me What You're Building
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
                  Two minutes of your time gets you a written, fixed-scope proposal — deliverables, timeline,
                  and milestone payments. No calls required to get started.
                </p>

                <div className="mt-8 rounded-xl border border-[#E4D9BC] bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A8A29E] mb-4">
                    What happens after you submit
                  </p>
                  <ol className="m-0 p-0 list-none space-y-4">
                    {[
                      { t: "Within 24 hours", d: "Personal reply with clarifying questions, if any." },
                      { t: "Within 48 hours", d: "Written fixed-scope proposal with timeline & milestone pricing." },
                      { t: "On approval", d: "Kickoff call, then the sprint starts — weekly demos from week one." },
                    ].map((s, i) => (
                      <li key={s.t} className="flex gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-[#B45309]/10 border border-[#B45309]/25 grid place-items-center font-mono text-[10px] font-bold text-[#B45309] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <div className="text-[13px] font-bold text-[#4A3B33]">{s.t}</div>
                          <div className="text-[12.5px] text-[#57534E] leading-relaxed">{s.d}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Response within 24h", "NDA on request", "100% IP handover", "Milestone payments"].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#78716C] bg-white border border-[#E4D9BC] rounded-full px-3 py-1.5"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: the form */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-[#E4D9BC] bg-white p-6 sm:p-8 shadow-[var(--shadow-soft-lg)]">
                  {submitted ? (
                    <div className="py-10 text-center">
                      <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-emerald-600/10 border border-emerald-600/25 mb-4">
                        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#4A3B33] m-0 mb-2">Proposal Submitted</h3>
                      <p className="text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
                        Thanks {form.name.split(" ")[0]} — your {SPRINTS.find((s) => s.id === selectedSprint)?.name} proposal is in.
                        You'll get a personal reply within 24 hours and a written quote within 48.
                      </p>
                      {submitError && (
                        <p className="mt-4 text-xs text-[#B45309] bg-[#B45309]/[0.06] border border-[#B45309]/20 rounded-lg px-4 py-3 max-w-md mx-auto text-left">
                          {submitError}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href="mailto:hello@aniket.one"
                          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#B45309] text-white hover:bg-[#A16207] transition-all no-underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email Directly
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setForm({ name: "", email: "", company: "", budget: "", timeline: "", message: "" });
                          }}
                          className="font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-[#E4D9BC] text-[#78716C] hover:border-[#B45309] hover:text-[#B45309] transition-all cursor-pointer"
                        >
                          Submit Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-2">
                          Which sprint?
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SPRINTS.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setSelectedSprint(s.id);
                              }}
                              className={chipCls(selectedSprint === s.id)}
                            >
                              {s.name}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setSelectedSprint("not-sure");
                            }}
                            className={chipCls(selectedSprint === "not-sure")}
                          >
                            Not Sure Yet
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="pf-name" className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                            Your Name *
                          </label>
                          <input
                            id="pf-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jane Sharma"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label htmlFor="pf-email" className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                            Email *
                          </label>
                          <input
                            id="pf-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="jane@company.com"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pf-company" className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                          Company / Project Name
                        </label>
                        <input
                          id="pf-company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Acme Labs (optional)"
                          className={inputCls}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-2">
                            Budget Range
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => {
                                  sound.playClick();
                                  setForm((f) => ({ ...f, budget: f.budget === b ? "" : b }));
                                }}
                                className={chipCls(form.budget === b)}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-2">
                            Start Timeline
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => {
                                  sound.playClick();
                                  setForm((f) => ({ ...f, timeline: f.timeline === t ? "" : t }));
                                }}
                                className={chipCls(form.timeline === t)}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pf-message" className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                          Project Details *
                        </label>
                        <textarea
                          id="pf-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="What are you building, who is it for, and what does 'done' look like? Links to designs/repos help."
                          className={`${inputCls} resize-y min-h-[120px]`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <span>Submit Proposal — Get Quote in 48h</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[11px] font-mono text-[#A8A29E] m-0">
                        Submitting opens your mail app with everything prefilled — just hit send. NDA available before you share sensitive details.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We'll Work */}
        <section className="relative mx-auto px-6 lg:px-8 py-20 max-w-[1200px]">
          <div className="max-w-[700px] mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">
              How We'll Work Together
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33] m-0">
              A Process Built on Verifiable Progress
            </h2>
            <p className="mt-2 text-sm text-[#57534E]">
              Freelance works when trust is structural, not blind. Here's exactly what happens from first
              message to final handover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-xl border border-[#E4D9BC] bg-white p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#B45309]/10 border border-[#B45309]/20 grid place-items-center">
                      <Icon className="w-4 h-4 text-[#B45309]" />
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#A8A29E] tracking-widest">{p.step}</span>
                  </div>
                  <h3 className="font-serif text-[1.05rem] font-bold text-[#4A3B33] m-0">{p.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#57534E] m-0">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[848px]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4A3B33] mb-8 mt-0">
            Frequent Questions From Clients
          </h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#4A3B33] mb-2 mt-0">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#57534E] m-0">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#B45309]/25 bg-[#B45309]/[0.05] p-6 text-center">
            <h3 className="font-serif text-xl font-bold text-[#4A3B33] mt-0 mb-2">Still Deciding?</h3>
            <p className="text-sm text-[#57534E] mb-4">
              Start with a Focused Sprint — the smallest possible engagement that proves the working
              relationship. If it goes well, we scale up.
            </p>
            <button
              type="button"
              onClick={() => scrollToForm("focused")}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#B45309] text-white hover:bg-[#A16207] transition-all cursor-pointer"
            >
              Try a Focused Sprint <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
