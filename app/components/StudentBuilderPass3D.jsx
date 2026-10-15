"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Wifi,
  QrCode,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { sound } from "../utils/sound";

export default function StudentBuilderPass3D({ onOpenSubmit }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.85
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const toggleFlip = () => {
    try {
      sound.playClick();
    } catch {}
    setIsFlipped((prev) => !prev);
  };

  const filterExpiring = () => {
    try {
      sound.playClick();
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aniket_filter_status", { detail: { filterType: "expiring" } })
      );
    }
    const el = document.getElementById("offers-list");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOffers = () => {
    try {
      sound.playClick();
    } catch {}
    const el = document.getElementById("offers-list");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[460px] mx-auto select-none">
      {/* 3D Perspective Container */}
      <div
        className="relative"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Glow ambient background aura */}
        <div
          aria-hidden="true"
          className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#B45309]/25 via-[#E4C090]/20 to-[#B45309]/25 blur-2xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.95 : 0.55
          }}
        />

        {/* 3D Interactive Card Frame with True Double-Sided Y-Axis Rotation */}
        <div
          ref={cardRef}
          onClick={toggleFlip}
          className="relative aspect-[1.586/1] w-full cursor-pointer transition-transform duration-100 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg) scale(${
              isHovered ? 1.02 : 1
            })`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* ════════════════════════════════════════════════════════════ */}
          {/* FRONT FACE OF CARD                                         */}
          {/* ════════════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/[0.2] bg-gradient-to-br from-[#1C1917] via-[#141210] to-[#0D0B0A] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            {/* Holographic Dynamic Glare Overlayer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 mix-blend-color-dodge transition-opacity duration-300"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle 340px at ${glare.x}% ${glare.y}%, rgba(228, 192, 144, 0.45), rgba(255, 255, 255, 0.15) 30%, transparent 70%)`
              }}
            />

            {/* Prismatic Rainbow Sheen Ribbon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 top-1/2 -translate-y-1/2 h-16 -rotate-12 opacity-25 z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(228, 192, 144, 0.4), rgba(94, 234, 212, 0.4), rgba(244, 114, 182, 0.4), transparent)"
              }}
            />

            {/* Circuit Grid Wireframe Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(#E4C090 0.75px, transparent 0.75px), linear-gradient(to right, rgba(228,192,144,0.08) 1px, transparent 1px)",
                backgroundSize: "20px 20px, 40px 40px"
              }}
            />

            {/* TOP ROW: Microchip + NFC + Verified Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Physical Gold Embedded Microchip */}
                <div className="relative w-11 h-8 rounded-md bg-gradient-to-br from-[#F5D7A1] via-[#D4AF37] to-[#8C6D23] p-[1.5px] shadow-md">
                  <div className="w-full h-full rounded-[4px] bg-[#C59B27] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/45" />
                    <div className="absolute inset-y-0 left-1/3 w-[1px] bg-black/45" />
                    <div className="absolute inset-y-0 right-1/3 w-[1px] bg-black/45" />
                    <div className="w-2.5 h-3.5 border border-black/45 rounded-sm" />
                  </div>
                </div>

                {/* NFC Wireless Wave */}
                <Wifi className="w-4 h-4 text-[#E4C090] rotate-90" />
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 font-mono text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACADEMIC BUILDER PASS
              </div>
            </div>

            {/* MIDDLE ROW: Pass Digits & Subtitle */}
            <div className="relative z-10 my-auto py-2">
              <div className="font-mono text-[10px] text-[#A8A29E] tracking-[0.2em] uppercase mb-1">
                ZERO-COST SOFTWARE VAULT
              </div>
              <div className="font-mono text-lg sm:text-xl font-bold tracking-[0.25em] text-[#F5F5F4] flex items-center gap-2 drop-shadow-sm">
                <span>4096</span>
                <span>8192</span>
                <span>1024</span>
                <span className="text-[#E4C090]">2026</span>
              </div>
              <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-[#D6D3D1]">
                <span>148+ VERIFIED GRANTS</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">$100K+ COMMERCIAL VALUE</span>
              </div>
            </div>

            {/* BOTTOM ROW: Holder, Expiry & Flip prompt */}
            <div className="relative z-10 flex items-end justify-between border-t border-white/[0.1] pt-3">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#A8A29E]">
                  PASS HOLDER
                </div>
                <div className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  STUDENT DEVELOPER
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#A8A29E]">
                  VALID UNTIL
                </div>
                <div className="font-mono text-xs font-bold text-[#E4C090]">
                  GRADUATION &apos;26
                </div>
              </div>
            </div>

            {/* Flip badge indicator */}
            <div className="absolute bottom-2 right-2 z-30 font-mono text-[9px] text-[#A8A29E] bg-black/60 px-2 py-0.5 rounded border border-white/[0.08]">
              Click to flip ↺
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* BACK FACE OF CARD (Flipped 180deg)                         */}
          {/* ════════════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/[0.2] bg-gradient-to-br from-[#181614] via-[#12100E] to-[#0A0908] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            {/* Dark Magnetic Swipe Stripe Across Top */}
            <div className="absolute top-4 inset-x-0 h-9 bg-black/90 border-y border-white/[0.08]" />

            {/* Authorized Signature Box */}
            <div className="relative z-10 mt-10">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#A8A29E] mb-1">
                <span>AUTHORIZED STUDENT SIGNATURE</span>
                <span className="text-[#E4C090]">CVV: 148</span>
              </div>
              <div className="h-7 w-full rounded bg-white/[0.08] border border-white/[0.12] flex items-center px-3 font-serif italic text-xs text-[#E4C090]">
                verified.student.builder.2026
              </div>
            </div>

            {/* Security Hologram & Barcode Row */}
            <div className="relative z-10 flex items-center justify-between gap-4 py-2">
              <div>
                <div className="font-mono text-[10px] text-[#E7E5E4] font-bold">
                  NFC ENCRYPTED · ISO/IEC 14443
                </div>
                <div className="font-mono text-[9px] text-[#A8A29E]">
                  TOKEN: AM-PASS-0926-STUDENT-VAULT
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="h-6 w-28 flex items-end gap-[2px] opacity-75">
                {[2, 4, 1, 3, 5, 2, 6, 2, 4, 1, 3, 5, 2, 4, 1, 5, 3, 2, 4].map((h, i) => (
                  <div
                    key={i}
                    className="bg-[#E4C090] rounded-[0.5px]"
                    style={{ width: "2px", height: `${h * 4}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Back action: Tap to scroll down */}
            <div className="relative z-10 border-t border-white/[0.1] pt-3 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#A8A29E]">
                Direct official partner access
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#E4C090] hover:underline">
                <span>Browse 140+ Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Auxiliary Controls Below Card (No Duplication of Hero CTAs) ── */}
      <div className="mt-4 flex items-center justify-between gap-3 text-xs font-mono text-[#A8A29E] px-1">
        {/* Flip toggle button */}
        <button
          onClick={toggleFlip}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#D6D3D1] hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E4C090]" />
          <span>Flip Card (Front/Back)</span>
        </button>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">148 Grants Active</span>
        </div>
      </div>
    </div>
  );
}
