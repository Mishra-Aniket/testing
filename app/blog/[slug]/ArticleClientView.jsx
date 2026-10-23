"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import DarkCTA from "../../components/DarkCTA";
import Footer from "../../components/Footer";
import SearchModal from "../../components/SearchModal";
import ConstellationCanvas from "../../components/ConstellationCanvas";
import { Calendar, Clock, ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { sound } from "../../utils/sound";

// Render **bold** and `inline code` inside paragraph text
function renderInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#4A3B33]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="font-mono text-[0.85em] bg-[#FAF6EE] border border-[#E4D9BC] rounded px-1.5 py-0.5 text-[#B45309]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="relative group my-7 rounded-lg overflow-hidden border border-[#292524]">
      <div className="flex items-center justify-between bg-[#1C1917] px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8A29E]">{lang || "code"}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#A8A29E] hover:text-[#E4C090] transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="bg-[#231F1E] text-[#E7E5E4] text-[12.5px] leading-[1.7] font-mono overflow-x-auto p-4 m-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ArticleClientView({ article, blocks, prev, next, related }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const contentRef = useRef(null);

  const headings = useMemo(() => blocks.filter((b) => b.type === "h2"), [blocks]);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TOC scroll-spy: highlight the last heading scrolled past
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -110 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const articleUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${article.title} — Aniket Mishra`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "p":
        return (
          <p key={idx} className="text-[15.5px] sm:text-[16.5px] leading-[1.85] text-[#57534E] mb-6">
            {renderInline(block.text)}
          </p>
        );
      case "h2":
        return (
          <h2
            key={idx}
            id={block.id}
            className="font-serif text-2xl sm:text-[1.7rem] font-bold text-[#4A3B33] mt-12 mb-5 tracking-[-0.01em] scroll-mt-28"
          >
            {block.text}
          </h2>
        );
      case "h3":
        return (
          <h3 key={idx} id={block.id} className="font-serif text-xl font-bold text-[#4A3B33] mt-9 mb-4 scroll-mt-28">
            {block.text}
          </h3>
        );
      case "list":
        return (
          <ul key={idx} className="my-6 space-y-3 pl-1">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.75] text-[#57534E]">
                <span className="mt-[0.6em] h-[5px] w-[5px] rounded-full bg-[#B45309] shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      case "code":
        return <CodeBlock key={idx} lang={block.lang} code={block.code} />;
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-9 border-l-[3px] border-[#B45309] bg-[#FAF6EE] rounded-r-lg px-6 py-5 font-serif text-[1.1rem] italic leading-relaxed text-[#4A3B33]"
          >
            {block.text}
          </blockquote>
        );
      case "callout":
        return (
          <div
            key={idx}
            className="my-8 flex gap-3 rounded-lg border border-[#B45309]/25 bg-[#B45309]/[0.06] px-5 py-4"
          >
            <span className="mt-[0.45em] h-[7px] w-[7px] rounded-full bg-[#B45309] shrink-0" />
            <p className="m-0 text-[14.5px] leading-[1.7] text-[#57534E]">{renderInline(block.text)}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4D9BC] z-[9999] pointer-events-none transition-transform duration-75 ease-out"
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }}
      />

      <ConstellationCanvas />

      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenAssessment={() => {}} />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        {/* Article hero */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-10 md:pb-14 max-w-[848px]">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Breadcrumb"
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-7"
            >
              <ol className="flex items-center gap-2 m-0 p-0 list-none">
                <li>
                  <Link href="/" onClick={() => sound.playClick()} className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]">
                    Home
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-[#D6D3D1]">/</span>
                </li>
                <li>
                  <Link href="/blog" onClick={() => sound.playClick()} className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]">
                    Blog
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-[#D6D3D1]">/</span>
                </li>
                <li>
                  <span className="text-[#B45309] font-semibold">{article.tag}</span>
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.75rem,3.8vw,2.9rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#4A3B33] text-balance m-0"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#78716C]"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-[#B45309]/10 border border-[#B45309]/25 grid place-items-center text-[10px] font-bold text-[#B45309]">AM</span>
                By <strong className="text-[#4A3B33]">{article.author}</strong>
              </span>
              <span aria-hidden="true" className="text-[#D6D3D1]">•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
              <span aria-hidden="true" className="text-[#D6D3D1]">•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
            </motion.div>
          </div>
        </header>

        {/* Body with sticky TOC */}
        <div className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[848px]">
          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
            <article ref={contentRef} className="min-w-0">
              {blocks.map(renderBlock)}

              {/* Share row */}
              <div className="mt-14 pt-7 border-t border-[#E4D9BC] flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mr-1">Share</span>
                <button
                  type="button"
                  onClick={copyLink}
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border cursor-pointer transition-all ${
                    copiedLink
                      ? "bg-[#B45309] border-[#B45309] text-[#FDFBF7]"
                      : "bg-white border-[#E4D9BC] text-[#57534E] hover:border-[#B45309] hover:text-[#B45309]"
                  }`}
                >
                  {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedLink ? "Copied" : "Copy Link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border bg-white border-[#E4D9BC] text-[#57534E] hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
                >
                  Post on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border bg-white border-[#E4D9BC] text-[#57534E] hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
                >
                  LinkedIn
                </a>
              </div>
            </article>

            {/* Sticky table of contents (desktop only) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <nav aria-label="Table of contents" className="sticky top-28 pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A8A29E] mb-3">On this page</p>
                  <ul className="m-0 p-0 list-none border-l border-[#E4D9BC]">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <button
                          type="button"
                          onClick={() => scrollToHeading(h.id)}
                          className={`block w-full text-left text-[12px] leading-[1.5] pl-4 py-1.5 -ml-px border-l-2 cursor-pointer transition-all ${
                            activeHeading === h.id
                              ? "border-[#B45309] text-[#B45309] font-medium"
                              : "border-transparent text-[#78716C] hover:text-[#4A3B33]"
                          }`}
                        >
                          {h.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[#E4D9BC]/60">
                    <div className="h-[3px] w-full rounded-full bg-[#E4D9BC] overflow-hidden">
                      <div className="h-full bg-[#B45309] transition-[width] duration-150" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
                    </div>
                    <p className="mt-2 font-mono text-[10px] text-[#A8A29E]">{Math.round(scrollProgress * 100)}% read</p>
                  </div>
                </nav>
              </aside>
            )}
          </div>

          {/* Prev / Next */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                onClick={() => sound.playClick()}
                className="group rounded-xl border border-[#E4D9BC] bg-white p-5 hover:border-[#B45309] transition-all no-underline"
              >
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8A29E] mb-2">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="font-serif text-[15px] font-bold text-[#4A3B33] group-hover:text-[#B45309] transition-colors leading-snug">
                  {prev.title}
                </span>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                onClick={() => sound.playClick()}
                className="group rounded-xl border border-[#E4D9BC] bg-white p-5 hover:border-[#B45309] transition-all no-underline text-right sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8A29E] mb-2">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-serif text-[15px] font-bold text-[#4A3B33] group-hover:text-[#B45309] transition-colors leading-snug">
                  {next.title}
                </span>
              </Link>
            ) : <span />}
          </div>

          {/* More articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#A8A29E] mb-4">More from the blog</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    onClick={() => sound.playClick()}
                    className="group rounded-xl border border-[#E4D9BC] bg-white p-5 hover:border-[#B45309] hover:shadow-[var(--shadow-soft)] transition-all no-underline"
                  >
                    <span className="inline-block font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC] mb-2.5">
                      {r.tag}
                    </span>
                    <span className="block font-serif text-[15px] font-bold text-[#4A3B33] group-hover:text-[#B45309] transition-colors leading-snug">
                      {r.title}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10.5px] text-[#A8A29E]">{r.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <DarkCTA />
      </main>

      <Footer />

      <SearchModal isOpen={searchOpen} onOpen={() => setSearchOpen(true)} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
