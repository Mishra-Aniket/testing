import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { sound } from "../utils/sound";

export default function Footer({
  onOpenCompare,
  onOpenResources,
  onOpenPricing,
  onOpenDocs,
  onOpenLabs,
  onOpenBlog
}) {
  const handleLinkClick = (e, item) => {
    sound.playClick();
    if (item.action) {
      e.preventDefault();
      item.action();
    }
  };

  const FOOTER_COLUMNS = [
    {
      title: "PRODUCT",
      links: [
        { label: "Context Layer", href: "/#how-it-works" },
        { label: "Thesis", href: "/thesis" },
        { label: "Pricing", href: "/pricing", action: onOpenPricing },
        { label: "Labs & Simulator", href: "/labs", action: onOpenLabs },
        { label: "Creators Program", href: "/creators-program", action: () => onOpenResources && onOpenResources("creators-program") }
      ]
    },
    {
      title: "USE CASES",
      links: [
        { label: "Finance", href: "/use-cases", action: () => onOpenResources && onOpenResources("use-cases") },
        { label: "Customer Support", href: "/use-cases", action: () => onOpenResources && onOpenResources("use-cases") },
        { label: "EdTech", href: "/use-cases", action: () => onOpenResources && onOpenResources("use-cases") },
        { label: "Healthcare", href: "/use-cases", action: () => onOpenResources && onOpenResources("use-cases") },
        { label: "All Use Cases", href: "/use-cases", action: () => onOpenResources && onOpenResources("use-cases") }
      ]
    },
    {
      title: "DEVELOPERS",
      links: [
        { label: "Documentation", href: "/docs", action: onOpenDocs },
        { label: "API Reference", href: "/docs", action: onOpenDocs },
        { label: "Python SDK", href: "/docs", action: onOpenDocs },
        { label: "Node.js SDK", href: "/docs", action: onOpenDocs },
        { label: "llms.txt", href: "/llms.txt" },
        { label: "llms-full.txt", href: "/llms-full.txt" }
      ]
    },
    {
      title: "COMPARE",
      links: [
        { label: "vs Mem0", href: "/compare/aniket-vs-mem0", action: () => onOpenCompare && onOpenCompare("mem0") },
        { label: "vs Glean", href: "/compare/aniket-vs-glean", action: () => onOpenCompare && onOpenCompare("glean") },
        { label: "vs Palantir", href: "/compare/aniket-vs-palantir", action: () => onOpenCompare && onOpenCompare("palantir") },
        { label: "vs Claude Memory", href: "/compare/aniket-vs-claude", action: () => onOpenCompare && onOpenCompare("claude") },
        { label: "vs LangChain", href: "/compare/aniket-vs-langchain", action: () => onOpenCompare && onOpenCompare("langchain") },
        { label: "All Comparisons", href: "/compare", action: () => onOpenCompare && onOpenCompare("mem0") }
      ]
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "/thesis" },
        { label: "Blog", href: "/blog", action: onOpenBlog },
        { label: "Case Studies", href: "/use-cases", action: () => onOpenResources && onOpenResources("case-study") },
        { label: "Contact", href: "mailto:hello@aniket.one" }
      ]
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/security", action: () => onOpenResources && onOpenResources("security") },
        { label: "Security & SOC2", href: "/security", action: () => onOpenResources && onOpenResources("security") },
        { label: "Terms of Use", href: "/security", action: () => onOpenResources && onOpenResources("security") }
      ]
    }
  ];
  return (
    <footer data-theme="dark" className="relative bg-[#1C1917] text-[#F5F5F4] overflow-hidden pt-16 pb-20 border-t border-white/[0.08]">
      {/* Background subtle grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E4D9BC 1px, transparent 1px), linear-gradient(90deg, #E4D9BC 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-16 md:grid-cols-4 lg:grid-cols-8 lg:pb-20">
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-10">
            <a href="/" className="mb-6 inline-flex items-center gap-2 group">
              <span className="text-[#E4C090] text-2xl font-black leading-none transform transition-transform group-hover:scale-110">
                ▲
              </span>
              <span className="font-serif font-black text-xl tracking-tight text-white">
                ANIKET
              </span>
              <span className="font-mono text-[9px] font-bold text-[#E4C090] bg-[#E4C090]/15 px-1.5 py-0.5 rounded tracking-widest border border-[#E4C090]/30 -translate-y-1.5">
                AI
              </span>
            </a>

            <p className="mb-6 max-w-[300px] text-[0.9375rem] leading-[1.7] text-[#A8A29E]">
              Persistent, traceable context and semantic retrieval for AI agents over your institutional knowledge graph.
            </p>

            <p className="mb-6 flex items-baseline gap-2.5 font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.16em] text-[#78716C]">
              <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-[#E4C090]" />
              <span>HEADQUARTERED IN <span className="text-[#D6D3D1]">BANGALORE, INDIA</span></span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mb-5">
              <a
                href="https://www.linkedin.com/in/aniketmishra0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn: aniketmishra0"
                title="LinkedIn: aniketmishra0"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/[0.08] text-[#A8A29E] transition-all hover:border-[#E4C090]/50 hover:text-[#E4C090] hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                  <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064zM3.56 20.452h3.554V9H3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                </svg>
              </a>

              <a
                href="https://github.com/aniketmishra-0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub: aniketmishra-0"
                title="GitHub: aniketmishra-0"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/[0.08] text-[#A8A29E] transition-all hover:border-[#E4C090]/50 hover:text-[#E4C090] hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href="https://x.com/aniketmishra0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X: aniketmishra0"
                title="X: aniketmishra0"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/[0.08] text-[#A8A29E] transition-all hover:border-[#E4C090]/50 hover:text-[#E4C090] hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[14px] w-[14px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx} className="col-span-1">
              <h3 className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716C]">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          sound.playClick();
                          if (link.action && !e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            link.action();
                          }
                        }}
                        className="text-[0.875rem] text-[#A8A29E] transition-colors duration-200 hover:text-[#E4C090] cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link)}
                        className="text-[0.875rem] text-[#A8A29E] transition-colors duration-200 hover:text-[#E4C090] cursor-pointer"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant Watermark Typography matching Image 5 & original site */}
        <div 
          aria-hidden="true" 
          className="relative w-full py-8 md:py-12 flex justify-center items-center select-none pointer-events-none overflow-hidden"
        >
          <span className="font-serif font-bold text-[clamp(4.5rem,13vw,11.5rem)] leading-none tracking-tight text-white/[0.06] whitespace-nowrap">
            Aniket AI
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4 text-xs text-[#78716C] font-mono">
          <div>
            © 2026 Aniket. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#E4C090] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#E4C090] transition-colors">Security</a>
            <a href="#" className="hover:text-[#E4C090] transition-colors">Terms of Use</a>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/[0.08] text-[#A8A29E] transition-colors hover:border-[#E4C090]/50 hover:text-[#E4C090]"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
