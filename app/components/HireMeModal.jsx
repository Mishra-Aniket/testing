"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { sound } from "../utils/sound";
import { createClient } from "../../lib/supabase/client";
import { sendEmail } from "../../lib/emailjs";
import { sendWeb3Form } from "../../lib/web3forms";

const TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY;

export default function HireMeModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fallbackNote, setFallbackNote] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");

  // Scroll lock (Lenis) + Escape to close
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) window.__lenis.stop();
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        if (typeof window !== "undefined" && window.__lenis) window.__lenis.start();
      };
    }
  }, [isOpen, onClose]);

  const buildMailto = () => {
    const subject = encodeURIComponent(`Project Inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Hi Aniket,\n\nI'd like to start a project.\n\n` +
      `Name: ${form.name}\nEmail: ${form.email}\n\n` +
      `Details:\n${form.message}\n\n---\nSent from aniket.one`
    );
    return `mailto:hello@aniket.one?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFallbackNote("");

    // 1. EmailJS — branded template email to the inbox
    const emailed = await sendEmail(TPL, {
      from_name: form.name.trim(),
      reply_email: form.email.trim(),
      message: form.message.trim(),
    });

    // 2. Web3Forms fallback — plain notification if branded delivery fails
    if (!emailed) {
      await sendWeb3Form({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: `New Project Inquiry — ${form.name.trim()}`,
        message: form.message.trim(),
      });
    }

    // 2. Supabase record (when keys + table exist)
    let dbSaved = false;
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        const { error } = await supabase.from("contact_messages").insert({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        });
        dbSaved = !error;
      }
    } catch {
      /* fall through */
    }

    setSubmitting(false);

    if (emailed || dbSaved) {
      sound.playSuccess();
      setSubmitted(true);
      return;
    }

    // 3. Fallback: hand the visitor a prefilled draft they can open deliberately
    setMailtoUrl(buildMailto());
    sound.playSuccess();
    setSubmitted(true);
    if (!dbSaved) {
      setFallbackNote("Delivery isn\'t configured yet — tap below to send your inquiry from your own mail app, or email hello@aniket.one directly.");
    }
    sound.playSuccess();
  };

  const inputCls =
    "w-full rounded-[var(--radius)] border border-[#E4D9BC] bg-white px-4 py-3 text-sm text-[#4A3B33] placeholder-[#A8A29E] outline-none transition-all duration-200 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]/30";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => { sound.playClick(); onClose(); }}
            className="fixed inset-0 z-[9998] bg-[#1C1917]/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Start a project"
              className="relative pointer-events-auto w-full max-w-[520px] max-h-[90svh] overflow-y-auto overscroll-contain rounded-2xl bg-[#FDFBF7] shadow-[0_40px_90px_-20px_rgba(28,25,23,0.6)]"
              data-hire-modal="true"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => { sound.playClick(); onClose(); }}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/90 border border-[#E4D9BC] text-[#78716C] hover:text-[#4A3B33] hover:border-[#B45309] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header band */}
              <div className="relative px-7 pt-8 pb-6 bg-[#F1E9D7] rounded-t-2xl overflow-hidden">
                <div aria-hidden="true" className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#B45309]/10 blur-2xl" />
                <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B45309] mb-3">
                  <span className="h-[6px] w-[6px] bg-[#B45309]" />
                  Start a Project
                </span>
                <h2 className="font-serif text-[1.65rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#4A3B33] m-0">
                  Tell me what to build.
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#57534E] m-0">
                  Two minutes now — a written fixed-scope proposal within 48 hours.
                </p>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                {submitted ? (
                  <div className="py-6 text-center">
                    <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-emerald-600/10 border border-emerald-600/25 mb-4">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#4A3B33] m-0 mb-2">Inquiry sent</h3>
                    <p className="text-sm text-[#57534E] leading-relaxed m-0">
                      Thanks {form.name.split(" ")[0]} — you'll get a personal reply within 24 hours
                      and a written quote within 48.
                    </p>
                    {fallbackNote && (
                      <div className="mt-4 text-xs text-[#B45309] bg-[#B45309]/[0.06] border border-[#B45309]/20 rounded-lg px-4 py-3 text-left">
                        <p className="m-0">{fallbackNote}</p>
                        {mailtoUrl && (
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1 mt-2 font-mono font-bold text-[#B45309] hover:underline no-underline"
                          >
                            Open prefilled email ↗
                          </a>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="mt-5 font-mono text-[10.5px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-[#E4D9BC] text-[#78716C] hover:border-[#B45309] hover:text-[#B45309] transition-all cursor-pointer"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hm-name" className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                          Name *
                        </label>
                        <input
                          id="hm-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="hm-email" className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                          Email *
                        </label>
                        <input
                          id="hm-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hm-message" className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#78716C] block mb-1.5">
                        What are we building? *
                      </label>
                      <textarea
                        id="hm-message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="The goal, who it's for, and what 'done' looks like."
                        className={`${inputCls} resize-y min-h-[96px]`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Inquiry — Reply in 24h
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10.5px] font-mono text-[#A8A29E] m-0">
                      Opens your mail app prefilled — just hit send. NDA available on request.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
