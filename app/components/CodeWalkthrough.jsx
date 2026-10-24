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
    { text: "✓ Lighthouse budgets audited: TTFB, CLS, LCP", color: "text-[#10B981] font-bold" }
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
    { text: "✓ Chunked resumable uploads: zero cloud egress cost", color: "text-[#10B981] font-bold" }
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
    desc: "Built with Next.js 15, App Router, React Server Components, and edge database caching. Connection-pooled queries, smooth client interactivity, and Lighthouse budgets enforced on every build.",
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
    title: "How does Centrix automate Google Drive sync at the edge?",
    desc: "Built for coaching networks — pairs recordings with panel notes and uploads straight to Drive with confidence-scored timetable matching.",
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
      const navOffset = typeof window !== "undefined" && window.innerWidth >= 1024 ? 112 : 108;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -navOffset, duration: 0.8 });
      } else {
        const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
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
