"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PartnerMarquee from "./components/PartnerMarquee";
import ContextThesis from "./components/ContextThesis";
import ModelSovereignty from "./components/ModelSovereignty";
import CodeWalkthrough from "./components/CodeWalkthrough";
import FAQ from "./components/FAQ";
import DarkCTA from "./components/DarkCTA";
import Footer from "./components/Footer";
import ConstellationCanvas from "./components/ConstellationCanvas";
import SearchModal from "./components/SearchModal";
import ContextAssessmentModal from "./components/ContextAssessmentModal";
import ComparisonModal from "./components/ComparisonModal";
import ResourcesModal from "./components/ResourcesModal";
import PricingModal from "./components/PricingModal";
import DocsModal from "./components/DocsModal";
import LabsModal from "./components/LabsModal";
import BlogModal from "./components/BlogModal";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [compareState, setCompareState] = useState({ open: false, tab: "mem0" });
  const [resourcesState, setResourcesState] = useState({ open: false, tab: "use-cases" });
  const [pricingOpen, setPricingOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [labsOpen, setLabsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("search") === "true") {
        setSearchOpen(true);
      }
      if (params.get("assessment") === "true") {
        setAssessmentOpen(true);
      }

      const handleHashChange = () => {
        const hash = window.location.hash.toLowerCase();
        if (hash.startsWith("#compare")) {
          const compMatch = hash.replace("#compare-", "").replace("#compare", "");
          const tab = compMatch && ["mem0", "glean", "palantir", "claude", "langchain"].includes(compMatch) ? compMatch : "mem0";
          setCompareState({ open: true, tab });
        } else if (
          hash.startsWith("#resource") || 
          hash === "#use-cases" || 
          hash === "#case-study" || 
          hash === "#security" || 
          hash === "#creators"
        ) {
          let tab = "use-cases";
          if (hash.includes("case-study")) tab = "case-study";
          else if (hash.includes("security")) tab = "security";
          else if (hash.includes("creator")) tab = "creators-program";
          setResourcesState({ open: true, tab });
        } else if (hash === "#pricing") {
          setPricingOpen(true);
        } else if (hash === "#docs") {
          setDocsOpen(true);
        } else if (hash === "#labs") {
          setLabsOpen(true);
        } else if (hash === "#blog") {
          setBlogOpen(true);
        }
      };

      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      {/* Background Interactive Warm Constellation Particle Canvas */}
      <ConstellationCanvas />

      {/* Floating Pill Header / Navigation */}
      <Navbar 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenAssessment={() => setAssessmentOpen(true)}
        onOpenCompare={(tab = "mem0") => setCompareState({ open: true, tab })}
        onOpenResources={(tab = "use-cases") => setResourcesState({ open: true, tab })}
        onOpenPricing={() => setPricingOpen(true)}
        onOpenDocs={() => setDocsOpen(true)}
        onOpenLabs={() => setLabsOpen(true)}
        onOpenBlog={() => setBlogOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero with 3D isometric 5-layer architecture stack & hover zoom telemetry */}
        <Hero onOpenAssessment={() => setAssessmentOpen(true)} />

        {/* Hidden SEO overview (same pattern as the original site: rendered but visually hidden) */}
        <section aria-label="Aniket AI overview" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", clipPath: "inset(50%)", whiteSpace: "nowrap" }}>
          <h2 className="sr-only">Aniket AI: an AI context layer for business knowledge and agent memory</h2>
          <p>
            Aniket AI gives developers and enterprises a shared knowledge layer for AI agents through a single API. It combines
            persistent AI agent memory with semantic retrieval over company knowledge, helping applications give an LLM relevant
            internal documents and business context. The context layer keeps stored knowledge separate from the model, so
            applications can reuse it across models, sessions, and workflows. Grounding answers in enterprise data can reduce
            unsupported claims; correctness still depends on source quality, retrieval, application permissions, and the model&apos;s
            response.
          </p>
          <h3>Context arithmetic: the core primitive</h3>
          <p>
            Context arithmetic applies set operations over meaning at query time. Intersection narrows scope by team, region, or
            version. Union combines sources. Subtraction excludes superseded or out-of-scope content. Ranking selects the context
            that enters the model window. These operations over an institutional knowledge graph support memory behaviors:
            recalling what happened, resolving what it means, and informing the next action.
          </p>
          <h3>Context Traces, business definitions, and integrations</h3>
          <p>
            Context Traces expose retrieval sources, scores, and rules so teams can inspect which information reached an agent.
            Canonical business definitions help resolve terms such as revenue, pricing, and policy across teams. Integration
            resources cover Python, TypeScript, LangChain, LlamaIndex, n8n, and MCP clients such as Claude Desktop, Cursor, and
            VS Code.
          </p>
          <h3>Use cases, pricing, and trust</h3>
          <p>
            Use cases include customer support, employee support over internal policies, EdTech tutoring, finance, healthcare
            continuity, and voice agents. Aniket AI is headquartered in Bangalore, India. Contact hello@aniket.one for company
            information, security controls, and privacy details.
          </p>
          <h3>CLI, SDKs, and discovery</h3>
          <p>
            Install the SDK with npm install @aniket/sdk or pip install aniket. The developer guide explains how to add business
            knowledge to an AI agent. Machine-readable content is available for crawlers that support the llms.txt convention.
          </p>
        </section>

        {/* 2. Partner Marquee with Developer Teams */}
        <PartnerMarquee />

        {/* 3. The Context Thesis, Technical Case & Business Case */}
        <ContextThesis />

        {/* 4. Model Sovereignty 3D Router Graphic (Claude, GPT, Gemini) */}
        <ModelSovereignty />

        {/* 5. 4 Engineering Primitives / Code Walkthrough (includes the Accuracy Terrain benchmark, as on the original) */}
        <CodeWalkthrough />

        {/* 6. FAQ */}
        <FAQ />

        {/* 7. Dark CTA + Request API Access */}
        <DarkCTA />
      </main>

      {/* Footer */}
      <Footer 
        onOpenCompare={(tab = "mem0") => setCompareState({ open: true, tab })}
        onOpenResources={(tab = "use-cases") => setResourcesState({ open: true, tab })}
        onOpenPricing={() => setPricingOpen(true)}
        onOpenDocs={() => setDocsOpen(true)}
        onOpenLabs={() => setLabsOpen(true)}
        onOpenBlog={() => setBlogOpen(true)}
      />

      {/* ⌘K Quick Search Modal & Fixed Floating Bottom Dock */}
      <SearchModal 
        isOpen={searchOpen} 
        onOpen={() => setSearchOpen(true)} 
        onClose={() => setSearchOpen(false)} 
      />

      {/* Interactive Context Assessment Diagnostic Modal */}
      <ContextAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />

      {/* Interactive Architecture Comparison Modal */}
      <ComparisonModal
        isOpen={compareState.open}
        initialTab={compareState.tab}
        onClose={() => setCompareState(prev => ({ ...prev, open: false }))}
      />

      {/* Enterprise Resources & Security Modal */}
      <ResourcesModal
        isOpen={resourcesState.open}
        initialTab={resourcesState.tab}
        onClose={() => setResourcesState(prev => ({ ...prev, open: false }))}
      />

      {/* Transparent ROI & Pruning Savings Pricing Modal */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />

      {/* Interactive SDK & Quickstart Documentation Modal */}
      <DocsModal
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
      />

      {/* Live Context Arithmetic & Model Hot-Swap Laboratory Modal */}
      <LabsModal
        isOpen={labsOpen}
        onClose={() => setLabsOpen(false)}
      />

      {/* Deep Engineering Walkthrough Blog Modal */}
      <BlogModal
        isOpen={blogOpen}
        onClose={() => setBlogOpen(false)}
      />
    </div>
  );
}
