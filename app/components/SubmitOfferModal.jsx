"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PlusCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Layers,
  Flame,
  ArrowRight,
  Lock,
  Unlock,
  Trash2,
  Check,
  Clock,
  AlertTriangle
} from "lucide-react";
import { sound } from "../utils/sound";

const CATEGORIES = [
  "Developer Tools",
  "AI & ML",
  "Cloud & Infra",
  "Design & 3D",
  "Productivity",
  "Web & Domains",
  "Database & Data",
  "Learning",
  "Security"
];

const ADMIN_PASSCODE = "aniket";

export default function SubmitOfferModal({ isOpen, onClose, onOfferSubmitted }) {
  const [activeTab, setActiveTab] = useState("submit"); // 'submit' | 'admin'
  const [isAdmin, setIsAdmin] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");
  const [pendingQueue, setPendingQueue] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    link: "",
    offer: "",
    category: "Developer Tools",
    requiresCard: "no",
    isExpiring: false,
    expiryDays: "14",
    submitter: "",
    directPublish: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Load pending submissions from localStorage
  const loadPendingQueue = () => {
    if (typeof window === "undefined") return;
    try {
      const pending = JSON.parse(localStorage.getItem("aniket_pending_submissions") || "[]");
      setPendingQueue(pending);
    } catch {}
  };

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError("");
      setPassError("");
      loadPendingQueue();
      setFormData({
        name: "",
        link: "",
        offer: "",
        category: "Developer Tools",
        requiresCard: "no",
        isExpiring: false,
        expiryDays: "14",
        submitter: "",
        directPublish: isAdmin
      });
    }
  }, [isOpen, isAdmin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === ADMIN_PASSCODE) {
      try {
        sound.playClick();
      } catch {}
      setIsAdmin(true);
      setPassError("");
      setPasscode("");
      setFormData((prev) => ({ ...prev, directPublish: true }));
    } else {
      setPassError("Incorrect admin passcode. Try 'aniket'.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.offer.trim() || !formData.link.trim()) {
      setError("Please fill in the Tool Name, Official Link, and Perk details.");
      return;
    }

    try {
      sound.playClick();
    } catch {}

    const isExpiring = Boolean(formData.isExpiring);
    const daysLeft = isExpiring && formData.expiryDays ? parseInt(formData.expiryDays, 10) : null;

    const newOffer = {
      id: "deal_" + Date.now(),
      name: formData.name.trim(),
      link: formData.link.trim().startsWith("http") ? formData.link.trim() : `https://${formData.link.trim()}`,
      offer: formData.offer.trim(),
      category: formData.category,
      domain: formData.link.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
      requiresCard: formData.requiresCard === "yes",
      recentlyAdded: true,
      expiringSoon: isExpiring,
      daysLeft: daysLeft,
      submittedBy: formData.submitter.trim() || (isAdmin ? "Aniket Mishra (Admin)" : "Student Contributor"),
      submittedAt: new Date().toISOString(),
      status: (isAdmin && formData.directPublish) ? "verified" : "pending"
    };

    if (isAdmin && formData.directPublish) {
      // Direct Admin Publish: goes straight to live verified offers
      try {
        const verified = JSON.parse(localStorage.getItem("aniket_verified_offers") || "[]");
        const updated = [newOffer, ...verified];
        localStorage.setItem("aniket_verified_offers", JSON.stringify(updated));
      } catch {}

      if (onOfferSubmitted) onOfferSubmitted(newOffer);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("aniket_offer_approved", { detail: newOffer }));
      }
    } else {
      // Normal submission: enters the Pending Moderation Queue
      try {
        const pending = JSON.parse(localStorage.getItem("aniket_pending_submissions") || "[]");
        const updated = [newOffer, ...pending];
        localStorage.setItem("aniket_pending_submissions", JSON.stringify(updated));
        setPendingQueue(updated);
      } catch {}
    }

    setSubmitted(true);
  };

  // Admin approves a pending submission
  const handleApprove = (item) => {
    try {
      sound.playClick();
    } catch {}

    const approvedItem = { ...item, status: "verified", approvedAt: new Date().toISOString() };

    try {
      // 1. Remove from pending queue
      const pending = JSON.parse(localStorage.getItem("aniket_pending_submissions") || "[]");
      const updatedPending = pending.filter((p) => p.id !== item.id);
      localStorage.setItem("aniket_pending_submissions", JSON.stringify(updatedPending));
      setPendingQueue(updatedPending);

      // 2. Add to verified live offers
      const verified = JSON.parse(localStorage.getItem("aniket_verified_offers") || "[]");
      const updatedVerified = [approvedItem, ...verified];
      localStorage.setItem("aniket_verified_offers", JSON.stringify(updatedVerified));

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("aniket_offer_approved", { detail: approvedItem }));
      }
    } catch (err) {
      console.warn("Approve error:", err);
    }
  };

  // Admin rejects a pending submission
  const handleReject = (itemId) => {
    try {
      sound.playClick();
    } catch {}

    try {
      const pending = JSON.parse(localStorage.getItem("aniket_pending_submissions") || "[]");
      const updatedPending = pending.filter((p) => p.id !== itemId);
      localStorage.setItem("aniket_pending_submissions", JSON.stringify(updatedPending));
      setPendingQueue(updatedPending);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-2xl border border-white/[0.14] bg-[#181614] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-lg text-[#A8A29E] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Mode Selector: Post Deal vs Admin Review */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/[0.08] pb-3 pr-8">
            <button
              onClick={() => setActiveTab("submit")}
              className={`font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === "submit"
                  ? "bg-[#B45309] text-white"
                  : "text-[#A8A29E] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              + Submit A Deal
            </button>

            <button
              onClick={() => setActiveTab("admin")}
              className={`font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "admin"
                  ? "bg-[#E4C090]/20 text-[#E4C090] border border-[#E4C090]/40"
                  : "text-[#A8A29E] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {isAdmin ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Admin Verification ({pendingQueue.length})</span>
            </button>
          </div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* TAB 1: DEAL SUBMISSION FORM                                */}
          {/* ════════════════════════════════════════════════════════════ */}
          {activeTab === "submit" && !submitted && (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4C090]/15 border border-[#E4C090]/35 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#E4C090] mb-2.5">
                  <PlusCircle className="w-3.5 h-3.5" />
                  // MODERATED COMMUNITY SUBMISSIONS
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Post A Student Deal
                </h3>
                <p className="mt-1.5 text-xs text-[#A8A29E] leading-relaxed">
                  Know a zero-cost software grant or limited-time cohort? Submit it below. Submissions undergo quick verification by Aniket before going live to keep the catalog 100% spam-free.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tool Name */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                    Software / Platform Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Cursor Pro, Supabase, Neon DB, Warp AI..."
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-sm text-white placeholder:text-[#78716C] focus:border-[#E4C090] focus:outline-none focus:ring-1 focus:ring-[#E4C090]/50"
                  />
                </div>

                {/* Official Link */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                    Official Student URL *
                  </label>
                  <input
                    type="url"
                    name="link"
                    required
                    placeholder="https://vendor.com/students"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-sm text-white placeholder:text-[#78716C] focus:border-[#E4C090] focus:outline-none focus:ring-1 focus:ring-[#E4C090]/50"
                  />
                </div>

                {/* Perk Description */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                    Student Perk Details *
                  </label>
                  <textarea
                    name="offer"
                    rows={2}
                    required
                    placeholder="e.g. Free 1-year Pro plan, $100 server credit for semester hackathon, or 100% off coupon code"
                    value={formData.offer}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#211E1B] border border-white/[0.14] text-sm text-white placeholder:text-[#78716C] focus:border-[#E4C090] focus:outline-none focus:ring-1 focus:ring-[#E4C090]/50 resize-none"
                  />
                </div>

                {/* Category + Credit Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-xs text-white focus:border-[#E4C090] focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                      Requires Credit Card?
                    </label>
                    <select
                      name="requiresCard"
                      value={formData.requiresCard}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-xs text-white focus:border-[#E4C090] focus:outline-none"
                    >
                      <option value="no">No (100% Zero-Card / Direct ID)</option>
                      <option value="yes">Yes (Billing validation required)</option>
                    </select>
                  </div>
                </div>

                {/* Expiring Soon Toggle */}
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isExpiring"
                      checked={formData.isExpiring}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-[#B45309] focus:ring-[#E4C090] bg-[#211E1B] border-white/[0.2]"
                    />
                    <span className="font-mono text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Mark as Limited-Time / Expiring Soon Deal
                    </span>
                  </label>

                  {formData.isExpiring && (
                    <div className="pt-1.5 border-t border-amber-500/20">
                      <label className="block text-[11px] font-mono text-[#D6D3D1] mb-1">
                        Days remaining until expiration:
                      </label>
                      <select
                        name="expiryDays"
                        value={formData.expiryDays}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg bg-[#211E1B] border border-amber-500/40 text-xs text-white focus:outline-none"
                      >
                        <option value="3">3 Days (Urgent Flash Grant)</option>
                        <option value="7">7 Days (1 Week Remaining)</option>
                        <option value="14">14 Days (2 Weeks Remaining)</option>
                        <option value="30">30 Days (End of Current Month)</option>
                        <option value="60">60 Days (Semester Cohort)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Submitter Handle */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#E7E5E4] uppercase tracking-wider mb-1.5">
                    Your Name or GitHub Handle (optional)
                  </label>
                  <input
                    type="text"
                    name="submitter"
                    placeholder="e.g. @yourgithub"
                    value={formData.submitter}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-xs text-white placeholder:text-[#78716C] focus:border-[#E4C090] focus:outline-none"
                  />
                </div>

                {/* Admin Direct Publish Checkbox */}
                {isAdmin && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-emerald-300 font-bold">
                      <input
                        type="checkbox"
                        name="directPublish"
                        checked={formData.directPublish}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-400"
                      />
                      <span>⚡ Admin Direct Publish (Bypass Review Queue)</span>
                    </label>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] hover:bg-[#A16207] p-3 font-mono text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E4C090]" />
                    <span>
                      {isAdmin && formData.directPublish ? "Publish Immediately To Site" : "Submit For Admin Review"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submission Success Confirmation */}
          {activeTab === "submit" && submitted && (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                {isAdmin && formData.directPublish ? "Deal Published Live!" : "Submitted For Review!"}
              </h3>
              <p className="text-sm text-[#D6D3D1] max-w-sm mx-auto mb-6 leading-relaxed">
                {isAdmin && formData.directPublish ? (
                  <>
                    &ldquo;<span className="text-[#E4C090] font-semibold">{formData.name}</span>&rdquo; is now officially live on the website.
                  </>
                ) : (
                  <>
                    Thank you! To ensure 100% spam-free quality, &ldquo;<span className="text-[#E4C090] font-semibold">{formData.name}</span>&rdquo; has been sent to Aniket for review. Once verified, it will appear live on the page!
                  </>
                )}
              </p>
              <button
                onClick={() => {
                  try {
                    sound.playClick();
                  } catch {}
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-2.5 font-mono text-xs font-bold text-white hover:bg-[#A16207] transition-all cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* TAB 2: ADMIN MODERATION / REVIEW QUEUE                     */}
          {/* ════════════════════════════════════════════════════════════ */}
          {activeTab === "admin" && (
            <div>
              {!isAdmin ? (
                /* Admin Login Prompt */
                <div className="py-6 text-center max-w-sm mx-auto">
                  <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Aniket Admin Portal
                  </h3>
                  <p className="text-xs text-[#A8A29E] leading-relaxed mb-6">
                    Enter your admin key to review pending student submissions, approve verified software grants, or purge spam links.
                  </p>

                  {passError && (
                    <div className="mb-4 p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                      {passError}
                    </div>
                  )}

                  <form onSubmit={handleAdminLogin} className="space-y-3">
                    <input
                      type="password"
                      placeholder="Enter admin passcode (aniket)"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#211E1B] border border-white/[0.14] text-sm text-white placeholder:text-[#78716C] text-center focus:border-[#E4C090] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#B45309] hover:bg-[#A16207] text-white font-mono text-xs font-bold shadow-md cursor-pointer"
                    >
                      Unlock Admin Queue
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Admin Review Queue */
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-white">
                        Pending Deals Moderation Queue
                      </h4>
                      <p className="text-xs text-[#A8A29E]">
                        Review user submissions before making them visible to all visitors.
                      </p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#E4C090]/15 text-[#E4C090] border border-[#E4C090]/30 font-bold">
                      {pendingQueue.length} Pending
                    </span>
                  </div>

                  {pendingQueue.length === 0 ? (
                    <div className="text-center py-12 border border-white/[0.08] rounded-xl bg-[#211E1B]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-white">Queue is clear!</p>
                      <p className="text-xs text-[#A8A29E] mt-1">No unverified submissions waiting for approval.</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
                      {pendingQueue.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-white/[0.12] bg-[#211E1B] hover:border-white/[0.2] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="font-serif font-bold text-base text-white">
                                {item.name}
                              </div>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-[#E4C090] hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <span>{item.domain || item.link}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            <div className="flex items-center gap-2">
                              {item.expiringSoon && (
                                <span className="font-mono text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                                  🔥 {item.daysLeft ? `${item.daysLeft}d` : "Expiring"}
                                </span>
                              )}
                              <span className="font-mono text-[10px] text-[#A8A29E] bg-white/[0.06] px-2 py-0.5 rounded border border-white/[0.1]">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#D6D3D1] bg-black/30 p-2.5 rounded-lg border border-white/[0.06] mb-3">
                            {item.offer}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                            <span className="text-[10px] font-mono text-[#78716C]">
                              By: {item.submittedBy || "Anonymous"}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleReject(item.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 font-mono text-xs font-bold transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Reject / Delete</span>
                              </button>

                              <button
                                onClick={() => handleApprove(item)}
                                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-colors cursor-pointer shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Approve &amp; Publish</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
