import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContextThesis() {
  return (
    <section id="why-context" className="relative py-20 md:py-28 bg-[#F8F4EE] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="mb-14 md:mb-20">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Philosophy &amp; Approach
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 id="why-context-heading" className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7">
              Frameworks evolve. Solid architecture &amp;{' '}
              <span className="text-[#B45309]">craftsmanship</span> compound.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                I don&apos;t just build templates — I build resilient, full-stack digital products. Every project combines crisp UI performance, robust backend systems, and context-aware AI pipelines engineered to scale from Day 1.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Split Cards with exact rounded-[var(--radius)] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-16">
          {/* Left Quote Card */}
          <div className="lg:col-span-6 flex">
            <blockquote className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090] flex w-full flex-col p-10 lg:p-12">
              <div className="flex flex-1 flex-col justify-center">
                <span aria-hidden="true" className="block font-serif text-[112px] leading-[0.7] text-[#E4C090] select-none">
                  “
                </span>
                <p className="mt-8 text-[1.375rem] sm:text-[1.625rem] lg:text-[1.75rem] font-bold text-[#4A3B33] leading-[1.35] tracking-[-0.02em]">
                  Anyone can call an LLM API. The true edge lies in building{' '}
                  <span className="text-[#B45309]">reliable, observable systems</span> with
                  delightful user experience that genuinely move business needles.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-[#E4D9BC]/60">
                <Link
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B45309] font-semibold hover:text-[#A16207]"
                >
                  Explore Engineering Workflow
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </blockquote>
          </div>

          {/* Right Cards Stack */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Technical Case */}
            <div className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090] flex flex-col flex-1">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A16207] mb-3">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#A16207]" />
                The Engineering Standard
              </span>
              <h3 className="mb-3 text-[1.3125rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                Sub-100ms speed. Clean code. Zero technical debt.
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.7] text-[#57534E]">
                Strict TypeScript, modular Next.js app architecture, reactive state management, and optimized asset pipelines. Every component is designed to render instantly and handle high concurrency without degradation.
              </p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {['Next.js 15 & React', 'Tailwind & 3D WebGL', 'FastAPI & Node.js', 'PostgreSQL & Redis', 'Sub-100ms Latency'].map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex items-center font-mono text-[10.5px] tracking-[0.04em] text-[#57534E] bg-[#F8F4EE] border border-[#E4D9BC] rounded-[var(--radius)] px-2.5 py-1.5 transition-colors duration-200 group-hover:bg-white group-hover:border-[#E4C090]">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Case */}
            <div className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090] flex flex-col flex-1">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] mb-3">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#B45309]" />
                The Freelance &amp; Client Guarantee
              </span>
              <h3 className="mb-3 text-[1.3125rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                Rapid turnaround without sacrificing technical excellence.
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.7] text-[#57534E]">
                Whether you need a SaaS MVP launched in 2–4 weeks, an AI agent system integrated with your existing data, or a mission-critical web application overhaul — you get transparent weekly sprints, direct Slack/Discord communication, and clean documentation.
              </p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {['2–4 Week MVP Sprints', 'Direct 1-on-1 Communication', 'Docker & Cloud CI/CD', 'Full Source Handover'].map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex items-center font-mono text-[10.5px] tracking-[0.04em] text-[#57534E] bg-[#F8F4EE] border border-[#E4D9BC] rounded-[var(--radius)] px-2.5 py-1.5 transition-colors duration-200 group-hover:bg-white group-hover:border-[#E4C090]">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
