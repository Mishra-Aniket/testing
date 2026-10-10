'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Copy, Check, Terminal, Code2 } from 'lucide-react';
import StackDiagram from './StackDiagram';
import ConstellationCanvas from './ConstellationCanvas';
import { sound } from '../utils/sound';

const QUICKSTART_TABS = [
  {
    id: 'npm',
    label: 'TypeScript / Node',
    command: 'git clone https://github.com/Mishra-Aniket/aniket.one',
    snippet: `// Hire Aniket for high-impact Full-Stack & AI Systems\nconst engineer = await hire({ role: "Full-Stack & AI", availability: "Immediate" });\nawait engineer.ship({ product: "AI-Powered SaaS", timeline: "2-4 Weeks" });`
  },
  {
    id: 'python',
    label: 'Python / AI',
    command: 'pip install langchain openai fastapi',
    snippet: `from aniket import SoftwareEngineer\nengineer = SoftwareEngineer(name="Aniket Mishra", skills=["Next.js", "FastAPI", "RAG"])\nengineer.build_mvp(quality="Production Grade", latency="< 100ms")`
  },
  {
    id: 'curl',
    label: 'Terminal Bio',
    command: 'curl -s https://aniket.one/api/bio',
    snippet: `// Response (Aniket Mishra Profile)\n{\n  "role": "Full-Stack & AI Systems Engineer",\n  "status": "Available for Freelance & Contracts",\n  "contact": "hello@aniket.one"\n}`
  }
];

export default function Hero({ onOpenAssessment }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = (text) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 md:pt-40 pb-16 md:pb-28 overflow-hidden bg-[#FDFBF7]">
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
            {/* Availability status badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#E4D9BC] bg-white shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#B45309] font-bold">
                  Available for Freelance &amp; Contract
                </span>
              </span>
              <span className="font-mono text-[11px] text-[#78716C]">Remote Worldwide</span>
            </div>

            {/* Main Heading - font-medium on Merriweather for editorial perfection */}
            <h1 id="hero-heading" className="font-serif text-[clamp(2.25rem,4.3vw,3.5rem)] font-medium tracking-[-0.03em] text-[#4A3B33] leading-[1.12] mb-7 max-w-[34rem] text-balance">
              Engineering Next-Gen Web &amp;{' '}
              <span className="text-[#B45309] italic font-normal">AI Products.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[1.0625rem] font-light text-[#57534E] leading-[1.75] mb-10 max-w-[29rem]">
              Hi, I&apos;m <strong className="font-semibold text-[#4A3B33]">Aniket Mishra</strong>. I architect hyper-performant web applications, custom agentic AI systems, and interactive 3D web interfaces for ambitious teams and startups.
            </p>

            {/* CTAs with exact rounded-[var(--radius)] architectural micro-corners */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="#get-access"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px"
              >
                Hire Me / Work Together
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenAssessment?.();
                }}
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide px-7 py-3.5 transition-all duration-200 active:translate-y-0 active:scale-[0.985] bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px cursor-pointer"
              >
                Estimate Project Scope
              </button>
            </div>

            {/* Telemetry Stats dl Row */}
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
                    production ready
                  </dt>
                  <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-normal tracking-[-0.01em] text-[#4A3B33] tabular-nums">
                    100%
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5 py-4 pr-4 sm:pr-8 pl-4 sm:pl-8 border-l border-[#E4D9BC]/80">
                  <dt className="order-2 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#78716C] whitespace-nowrap">
                    end-to-end delivery
                  </dt>
                  <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-normal tracking-[-0.01em] text-[#4A3B33] tabular-nums">
                    Full-Stack
                  </dd>
                </div>
              </dl>
            </div>

            {/* Feature 5: Interactive Copyable Terminal SDK Quickstart */}
            <div className="mt-8 rounded-[var(--radius)] border border-[#E4D9BC] bg-white overflow-hidden shadow-sm max-w-[34rem]">
              <div className="flex items-center justify-between border-b border-[#E4D9BC] bg-[#FAF6EE] px-2.5 sm:px-3 py-1.5 sm:py-2">
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                  {QUICKSTART_TABS.map((tab, idx) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab(idx);
                      }}
                      className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-medium rounded transition-colors whitespace-nowrap cursor-pointer touch-manipulation ${
                        activeTab === idx
                          ? "bg-white text-[#B45309] font-bold border border-[#E4D9BC] shadow-xs"
                          : "text-[#78716C] hover:text-[#4A3B33]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setShowCode(!showCode);
                    }}
                    className="p-1.5 text-[#78716C] hover:text-[#B45309] rounded hover:bg-[#F1E9DA] transition-colors cursor-pointer touch-manipulation active:scale-95"
                    title={showCode ? "Show install command" : "Show code snippet"}
                    aria-label="Toggle code snippet"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(showCode ? QUICKSTART_TABS[activeTab].snippet : QUICKSTART_TABS[activeTab].command)}
                    className="p-1.5 text-[#78716C] hover:text-[#B45309] rounded hover:bg-[#F1E9DA] transition-colors cursor-pointer touch-manipulation active:scale-95"
                    title="Copy command"
                    aria-label="Copy command"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#FDFBF7] font-mono text-[11.5px] text-[#4A3B33] overflow-x-auto">
                <pre className="whitespace-pre overflow-x-auto select-all leading-relaxed">
                  <code>{showCode ? QUICKSTART_TABS[activeTab].snippet : `$ ${QUICKSTART_TABS[activeTab].command}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Stack Diagram */}
          <div className="lg:col-span-6 relative">
            <StackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
