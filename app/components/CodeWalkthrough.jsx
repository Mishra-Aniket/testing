"use client";
import React, { useState, useEffect } from "react";
import { Check, Copy, ArrowRight, Play, Terminal, XCircle, RotateCcw } from "lucide-react";
import { sound } from "../utils/sound";
import AccuracyTerrain from "./AccuracyTerrain";

const SIMULATION_OUTPUTS = {
  0: [
    { text: "$ curl -I https://aniket.one/dashboard", color: "text-[#B45309]" },
    { text: "[12ms] HTTP/2 200 OK (Edge CDN Cache Hit)", color: "text-[#059669]" },
    { text: "[24ms] Hydrating React Server Components (Zero JS bundle bloat)", color: "text-[#059669]" },
    { text: "[38ms] Database query resolved via Connection Pool", color: "text-[#2563EB]" },
    { text: "✓ Lighthouse Score: 99/100 (TTFB < 40ms)", color: "text-[#10B981] font-bold" }
  ],
  1: [
    { text: "$ chrome-ext test --extension=OmTabs --mv3", color: "text-[#B45309]" },
    { text: "[4ms] Manifest V3 background service worker registered", color: "text-[#059669]" },
    { text: "[8ms] Local tab titles loaded from chrome.storage.local", color: "text-[#2563EB]" },
    { text: "[11ms] Instant tab title rename & biometric shield verified", color: "text-[#7C3AED]" },
    { text: "✓ Verified Chrome Web Store Build: Sub-10ms response time", color: "text-[#10B981] font-bold" }
  ],
  2: [
    { text: "$ dotnet run --project Centrix.Worker --center=PW-502", color: "text-[#B45309]" },
    { text: "[14ms] OBS video write stability confirmed (zero file corruption)", color: "text-[#059669]" },
    { text: "[28ms] Matched MaxHub whiteboard PDF with confidence score 99.4%", color: "text-[#2563EB]" },
    { text: "[52ms] Direct chunked resumable stream opened to Google Drive API v3", color: "text-[#7C3AED]" },
    { text: "✓ Processed 20,000+ daily center lectures: Zero cloud egress cost", color: "text-[#10B981] font-bold" }
  ],
  3: [
    { text: "$ imgworld test --file=sample_photo.jpg --mode=client-only", color: "text-[#B45309]" },
    { text: "[15ms] Image loaded directly into browser memory via ImageBitmap", color: "text-[#059669]" },
    { text: "[32ms] WebAssembly transform executed on local device CPU", color: "text-[#2563EB]" },
    { text: "[48ms] WebP compressed output generated (0 bytes sent to server)", color: "text-[#7C3AED]" },
    { text: "✓ 100% Private: Zero server uploads, instant on-device processing", color: "text-[#10B981] font-bold" }
  ]
};

function HighlightedCode({ code }) {
  const lines = code.split("\n");
  return (
    <div>
      {lines.map((line, lineIdx) => {
        if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
          return (
            <div key={lineIdx} className="text-[#8C827A] italic leading-relaxed">
              {line}
            </div>
          );
        }

        const parts = line.split(/(\/\/[^\n]*|#[^\n]*|".*?"|'.*?'|`.*?`|\bconst\b|\bawait\b|\blet\b|\bfunction\b|\breturn\b|\bpublic\b|\basync\b|\bTask\b|\bvar\b|\bchrome\b|\bdocument\b|\baniket\b|\bctx\b)/g);

        return (
          <div key={lineIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (!part) return null;
              if (part.startsWith("//") || part.startsWith("#")) {
                return <span key={pIdx} className="text-[#8C827A] italic">{part}</span>;
              }
              if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
                return <span key={pIdx} className="text-[#059669] font-medium">{part}</span>;
              }
              if (["const", "await", "let", "function", "return", "public", "async", "Task", "var"].includes(part)) {
                return <span key={pIdx} className="text-[#B45309] font-semibold">{part}</span>;
              }
              if (["chrome", "document", "aniket", "ctx"].includes(part)) {
                return <span key={pIdx} className="text-[#2563EB] font-semibold">{part}</span>;
              }
              return <span key={pIdx} className="text-[#4A3B33]">{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

const STEPS = [
  {
    id: "01",
    title: "How do I build high-performance Full-Stack Web Apps?",
    desc: "Built with Next.js 15, App Router, React Server Components, and edge database caching. Achieves sub-50ms database queries, smooth client interactivity, and 99+ Lighthouse performance scores.",
    file: "app_router_query.ts",
    code: `// Fast Next.js 15 Server Query with Supabase & Connection Pool
export async function getWorkspaceDashboard(workspaceId: string) {
  const data = await db.query.projects.findMany({
    where: eq(projects.workspaceId, workspaceId),
    with: { metrics: true, userRoles: true }
  });
  return { success: true, data, p95Latency: "< 45ms" };
}`
  },
  {
    id: "02",
    title: "How are Chrome Extensions engineered in Manifest V3?",
    desc: "Architected for OmTabs and OmSpace on the Chrome Web Store. Using background service workers, local session storage, and biometric shields with zero browser slowdown.",
    file: "omtabs_service_worker.ts",
    code: `// OmTabs Chrome Extension (Manifest V3) Background Service Worker
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const { customTabs } = await chrome.storage.local.get("customTabs");
    const activeLabel = customTabs?.[tab.url]?.customTitle;
    if (activeLabel) {
      await chrome.scripting.executeScript({
        target: { tabId },
        func: (title) => { document.title = title; },
        args: [activeLabel]
      });
    }
  }
});`
  },
  {
    id: "03",
    title: "How does Centrix automate Google Drive sync for 500+ centers?",
    desc: "Engineered for Physics Wallah Vidyapeeth centers across India. Real-time file write detection for OBS recordings and whiteboard notes, matching timetables and uploading to Google Drive with zero server RAM waste.",
    file: "centrix_ingestion_pipeline.cs",
    code: `// Centrix .NET 8 Automated Lecture Ingestion Pipeline
public async Task ProcessLectureSyncAsync(string centerId, string batchCode)
{
    var recording = await _fileWatcher.DetectStableWriteAsync("*.mp4", timeoutMs: 800);
    var notes = await _documentWatcher.FindMatchingNotesAsync(batchCode);
    
    // Direct chunked resumable upload to Google Drive v3
    var uploadJob = await _driveService.CreateResumableSessionAsync(recording, notes);
    await uploadJob.StreamChunksAsync(progress => NotifyCenterHud(centerId, progress));
}`
  },
  {
    id: "04",
    title: "How does ImgWorld.buzz process images 100% on-device?",
    desc: "Client-side privacy-first web tools. Images are processed directly inside the user's browser using WebAssembly and native Canvas APIs, meaning photos never touch external cloud servers.",
    file: "imgworld_processor.ts",
    code: `// ImgWorld.buzz 100% Client-Side Web Worker Processing
export async function processImageOnDevice(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  
  ctx?.drawImage(bitmap, 0, 0);
  // Transform & compress on-device via WebAssembly (Zero cloud upload)
  return await canvas.convertToBlob({ type: "image/webp", quality: 0.88 });
}`
  }
];

export default function CodeWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [simulatingStep, setSimulatingStep] = useState(null);

  // Setup scroll listener so as the user naturally scrolls, the left sticky indicator updates
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      let active = 0;
      STEPS.forEach((step, idx) => {
        const el = document.getElementById(`step-${step.id}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            active = idx;
          }
        }
      });
      setActiveStep(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (code, index) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunQuery = (idx) => {
    if (simulatingStep === idx) {
      sound.playClick();
      setSimulatingStep(null);
    } else {
      sound.playSuccess();
      setSimulatingStep(idx);
    }
  };

  const scrollToStep = (idx) => {
    sound.playClick();
    setActiveStep(idx);
    const el = document.getElementById(`step-${STEPS[idx].id}`);
    if (el) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -120, duration: 1.0 });
      } else {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="how-it-works" className="relative w-full bg-white py-20 md:py-28">
      <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Section Divider & Eyebrow */}
        <div className="mb-14 md:mb-20">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Engineering Primitives
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 id="fixes-heading" className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7 font-serif">
              How I architect, code &amp; ship{" "}
              <span className="text-[#B45309] italic font-normal">high-performance</span>{" "}
              apps &amp; systems.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                From production Chrome extensions and full-stack web applications to automated Google Drive ingestion pipelines — explore the actual code patterns and engineering logic behind my apps.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Sticky Horizontal Tabs */}
        <div className="lg:hidden sticky top-14 md:top-20 z-30 -mx-4 px-4 py-2.5 bg-[#FDFBF7]/95 backdrop-blur-md border-y border-[#E4D9BC]/70 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => scrollToStep(idx)}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeStep === idx
                    ? "bg-[#B45309] text-white shadow-xs"
                    : "bg-white text-[#78716C] border border-[#E4D9BC]"
                }`}
              >
                <span>{step.id}</span>
                <span className="max-w-[140px] truncate">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column: Sticky Step Navigation + Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32">
          {/* Sticky Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 md:top-32 w-full">
              {/* Progress Bars */}
              <div className="mb-8 flex gap-1.5" aria-hidden="true">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F1E9DA]">
                    <div 
                      className="absolute inset-0 origin-left bg-[#B45309] transition-transform duration-300" 
                      style={{ transform: idx <= activeStep ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                ))}
              </div>

              {/* Step Buttons */}
              <ol className="space-y-2">
                {STEPS.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(idx)}
                        className={`group flex w-full items-start gap-4 rounded-[6px] py-3 px-3 text-left transition-all duration-200 ${
                          isCurrent ? "bg-[#FAF6EE] shadow-sm" : "hover:bg-[#FAF6EE]/50"
                        }`}
                      >
                        <span className={`mt-[2px] font-mono text-[11px] font-semibold tracking-[0.14em] transition-colors duration-200 ${
                          isCurrent ? "text-[#B45309] font-bold" : "text-[#A8A29E] group-hover:text-[#78716C]"
                        }`}>
                          {step.id}
                        </span>
                        <span className={`text-[0.9375rem] font-bold leading-snug transition-colors duration-200 ${
                          isCurrent ? "text-[#4A3B33]" : "text-[#78716C] group-hover:text-[#4A3B33]"
                        }`}>
                          {step.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-10 md:gap-14">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                id={`step-${step.id}`}
                className="scroll-mt-32"
              >
                <div className="group relative rounded-[6px] border bg-white border-[#E4D9BC] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-7 sm:p-9 lg:p-10 transition-all duration-300 hover:border-[#E4C090] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="font-mono text-[12px] font-semibold tracking-[0.14em] text-[#B45309]">
                      {step.id}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-[#F1E9DA]" />
                  </div>

                  <h3 className="mb-4 text-[1.375rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                    {step.title}
                  </h3>

                  <p className="mb-8 text-[0.9375rem] leading-[1.75] text-[#57534E] max-w-[62ch]">
                    {step.desc}
                  </p>

                  {/* Code Box */}
                  <div className="group/code relative overflow-hidden rounded-[6px] border bg-[#FBF8F2] border-[#E4D9BC] shadow-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-[#E4D9BC] bg-[#F4EEDB] px-4 py-2 font-mono text-[11.5px] text-[#78716C]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                        <span className="font-semibold text-[#4A3B33]">{step.file}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Interactive Run Query Simulation Button */}
                        <button
                          type="button"
                          data-custom-sound="true"
                          onClick={() => handleRunQuery(idx)}
                          className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono font-bold transition-all duration-200 active:scale-95 ${
                            simulatingStep === idx
                              ? "bg-[#1C1917] text-white shadow-sm"
                              : "bg-[#B45309] text-white hover:bg-[#A16207] shadow-sm hover:-translate-y-px"
                          }`}
                          title="Simulate context query runtime"
                        >
                          {simulatingStep === idx ? (
                            <>
                              <RotateCcw className="w-3 h-3 text-[#E4C090] animate-spin" />
                              <span>Output Active</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current text-[#FDFBF7]" />
                              <span>Run Query</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(step.code, idx)}
                          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium text-[#78716C] hover:bg-[#EAE1CB] hover:text-[#4A3B33] transition-colors"
                          title="Copy code"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-green-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Syntax Highlighted Code Block */}
                    <div className="overflow-x-auto p-4 text-[12.5px] font-mono select-text bg-[#FDFBF7]">
                      <HighlightedCode code={step.code} />
                    </div>

                    {/* Interactive Animated Terminal Simulator Drawer */}
                    {simulatingStep === idx && (
                      <div className="border-t border-[#E4D9BC] bg-[#1C1917] p-4 font-mono text-[11.5px] text-[#F5F5F4] transition-all animate-fadeIn">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-[#A8A29E]">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-[#B45309]" />
                            <span className="font-semibold text-white">ANIKET CONTEXT ENGINE</span>
                            <span className="text-[#78716C]">·</span>
                            <span>QUERY RUNTIME: 28ms</span>
                          </span>
                          <button 
                            onClick={() => {
                              sound.playClick();
                              setSimulatingStep(null);
                            }}
                            className="text-[#A8A29E] hover:text-white px-1 transition-colors"
                            title="Close output"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-1.5 leading-relaxed pt-1">
                          {SIMULATION_OUTPUTS[idx].map((line, lIdx) => (
                            <div key={lIdx} className={`${line.color} flex items-start gap-2`}>
                              <span className="select-all">{line.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-Width 3D Accuracy Terrain Benchmark (between steps and the use-case banner, as on the original site) */}
        <AccuracyTerrain />

        {/* Context Tracing with OpenAI Euphony Walkthrough Banner */}
        <div className="relative rounded-[6px] border bg-[#F8F4EE] border-[#E4D9BC] p-8 sm:p-10 md:p-14 overflow-hidden transition-all duration-300 hover:border-[#E4C090] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-end gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#B45309]" />
                Example Use Case
              </p>
              <h3 className="mb-5 text-[1.5rem] md:text-[1.875rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#4A3B33] text-balance">
                How do you debug what an agent can't see? Context Tracing with OpenAI Euphony
              </h3>
              <p className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-[#57534E]">
                Pairing Aniket's Context Traces with Euphony, OpenAI's open-source conversation visualizer, creates an end-to-end debugging workflow. Every agent failure is now diagnosable in minutes: was it a retrieval problem, a configuration problem, or a model problem?
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end w-full lg:w-auto">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all hover:bg-[#A16207] hover:-translate-y-px w-full lg:w-auto text-center"
              >
                <span>Read the walkthrough</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
