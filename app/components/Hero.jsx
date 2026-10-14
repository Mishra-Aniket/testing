'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import StackDiagram from './StackDiagram';
import ConstellationCanvas from './ConstellationCanvas';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Hero({ onOpenAssessment }) {
  const availability = PERSONAL_INFO.availability || 'Available for Freelance & Contract Projects';
  const name = PERSONAL_INFO.name || 'Aniket Mishra';
  const ctaPrimaryText = 'Hire Me / Start a Project';
  const ctaPrimaryUrl = '#get-access';

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-[#FDFBF7]">
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
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Availability status badge & Signature flourish */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E4D9BC] bg-white shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#B45309] font-bold">
                  {availability}
                </span>
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E4D9BC]/70 bg-[#FAF6EE]">
                <span className="font-serif italic font-bold text-base text-[#B45309] tracking-wider select-none">
                  𝓐𝓷𝓲𝓴𝓮𝓽 𝓜
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 id="hero-heading" className="font-serif text-[clamp(2.25rem,4.3vw,3.5rem)] font-medium tracking-[-0.03em] text-[#4A3B33] leading-[1.12] mb-7 max-w-[34rem] text-balance">
              Engineering High-Impact Web &amp;{' '}
              <span className="text-[#B45309] italic font-normal">Scalable Systems.</span>
            </h1>

            {/* Subtitle - Freelance / Client oriented */}
            <p className="text-[1.0625rem] font-light text-[#57534E] leading-[1.75] mb-8 max-w-[30rem]">
              Hi, I&apos;m <strong className="font-semibold text-[#4A3B33]">{name} (Aniket M)</strong> — Senior Full-Stack Engineer. I partner with founders, startups, and engineering teams to build rapid 2–4 week production MVPs, custom Chrome extensions, high-throughput backend APIs (.NET / Python), and automated cloud pipelines.
            </p>

            {/* CTAs with exact rounded-[var(--radius)] */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href={ctaPrimaryUrl}
                onClick={() => sound.playClick()}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px"
              >
                {ctaPrimaryText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#projects"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px cursor-pointer"
              >
                Explore Featured Projects
              </Link>
            </div>

            {/* Telemetry Stats Row - Freelance & Performance Guarantees */}
            <div>
              <dl className="grid items-stretch border-y border-[#E4D9BC]/80 w-fit" style={{ gridTemplateColumns: 'repeat(3, auto)' }}>
                <div className="flex flex-col gap-1.5 py-4 pr-4 sm:pr-8">
                  <dt className="order-2 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#78716C] whitespace-nowrap">
                    fast performance
                  </dt>
                  <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-normal tracking-[-0.01em] text-[#4A3B33] tabular-nums">
                    &lt; 100ms
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5 py-4 pr-4 sm:pr-8 pl-4 sm:pl-8 border-l border-[#E4D9BC]/80">
                  <dt className="order-2 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#78716C] whitespace-nowrap">
                    rapid mvp sprint
                  </dt>
                  <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-normal tracking-[-0.01em] text-[#4A3B33] tabular-nums">
                    2–4 Weeks
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5 py-4 pr-4 sm:pr-8 pl-4 sm:pl-8 border-l border-[#E4D9BC]/80">
                  <dt className="order-2 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#78716C] whitespace-nowrap">
                    code &amp; ip handover
                  </dt>
                  <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-normal tracking-[-0.01em] text-[#4A3B33] tabular-nums">
                    100% Owned
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: 3D Stack Diagram */}
          <div id="stack" className="lg:col-span-6 relative scroll-mt-32">
            <StackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
