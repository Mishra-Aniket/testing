'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StackDiagram from './StackDiagram';
import ConstellationCanvas from './ConstellationCanvas';
import { sound } from '../utils/sound';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#FDFBF7]">
      {/* Background Constellation Canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 85% 78% at 50% 46%, #000 38%, transparent 86%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 78% at 50% 46%, #000 38%, transparent 86%)',
        }}
      >
        <ConstellationCanvas />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clean, simple, punchy copy */}
          <div className="lg:col-span-6 space-y-7">
            {/* Clean Status Pill */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E4D9BC] bg-white shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B45309] font-bold">
                  Available for Freelance &amp; New Projects
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 id="hero-heading" className="font-serif text-[clamp(2.25rem,4.4vw,3.65rem)] font-medium tracking-[-0.03em] text-[#4A3B33] leading-[1.12] max-w-[34rem] text-balance">
              Building Fast Web Apps &amp;{' '}
              <span className="text-[#B45309] italic font-normal">Production-Grade Systems.</span>
            </h1>

            {/* Subtitle - Simple, direct, no resume fluff */}
            <p className="text-[1.0625rem] font-light text-[#57534E] leading-[1.75] max-w-[31rem]">
              I help founders and businesses build fast, responsive web apps, MVPs, and custom software — with clean code, fast delivery, and 100% full ownership.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="#get-access"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px"
              >
                Hire Me / Start a Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#work"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px cursor-pointer"
              >
                Explore Featured Work
              </Link>
            </div>

            {/* Verifiable stats row — no invented metrics */}
            <div className="pt-2">
              <dl
                className="grid items-stretch border-y border-[#E4D9BC]/80 w-full sm:w-fit"
                style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
              >
                <div className="flex flex-col gap-1 py-3.5 pr-3 sm:pr-8">
                  <dt className="order-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#78716C] whitespace-nowrap">
                    GitHub Commits · 12 mo
                  </dt>
                  <dd className="order-1 text-[1rem] sm:text-[1.125rem] whitespace-nowrap font-semibold tracking-tight text-[#4A3B33] tabular-nums font-mono">
                    699+
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-3.5 px-3 sm:px-8 border-l border-[#E4D9BC]/80">
                  <dt className="order-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#78716C] whitespace-nowrap">
                    Typical MVP Sprint
                  </dt>
                  <dd className="order-1 text-[1rem] sm:text-[1.125rem] whitespace-nowrap font-semibold tracking-tight text-[#4A3B33] tabular-nums font-mono">
                    2–4 Weeks
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-3.5 pl-3 sm:pl-8 border-l border-[#E4D9BC]/80">
                  <dt className="order-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#78716C] whitespace-nowrap">
                    Code Ownership
                  </dt>
                  <dd className="order-1 text-[1rem] sm:text-[1.125rem] whitespace-nowrap font-semibold tracking-tight text-[#4A3B33] tabular-nums font-mono">
                    100% Yours
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Unique, Bespoke 3D Systems Architecture Visual */}
          <div id="stack" className="lg:col-span-6 relative scroll-mt-32">
            <StackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
