"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PartnerMarquee from "./components/PartnerMarquee";
import ModelSovereignty from "./components/ModelSovereignty";
import CodeWalkthrough from "./components/CodeWalkthrough";
import FAQ from "./components/FAQ";
import DarkCTA from "./components/DarkCTA";
import Footer from "./components/Footer";
import FeaturedProjects from "./components/FeaturedProjects";
import ServicesWorkflow from "./components/ServicesWorkflow";
import SearchModal from "./components/SearchModal";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("search") === "true") {
        setSearchOpen(true);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      {/* Floating Pill Header / Navigation */}
      <Navbar 
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAssessment={() => {}}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero with 3D isometric 5-layer architecture stack & hover zoom telemetry */}
        <Hero />

        {/* Hidden SEO overview */}
        <section aria-label="Aniket Mishra engineering overview" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", clipPath: "inset(50%)", whiteSpace: "nowrap" }}>
          <h2 className="sr-only">Aniket Mishra: Full-Stack &amp; AI Systems Engineer Portfolio</h2>
          <p>
            Aniket Mishra is a Full-Stack and AI Systems Engineer building scalable web applications, autonomous AI agent pipelines, and high-performance digital products for founders and engineering teams. Specializing in Next.js 15, React, Python, FastAPI, PostgreSQL, vector search, and LLM orchestration.
          </p>
          <h3>Core Engineering Capabilities</h3>
          <p>
            Full-stack product engineering from architecture to deployment. Rapid 2–4 week MVP development, high-throughput microservices, edge computing, distributed caching, and interactive 3D WebGL / SVG web experiences.
          </p>
          <h3>AI Engineering &amp; Autonomous Agents</h3>
          <p>
            Production retrieval-augmented generation (RAG), tool-calling autonomous agents, evaluation harnesses, semantic caching, and multi-model routing across Claude 3.5, GPT-4o, and Gemini 1.5 Pro.
          </p>
          <h3>Freelance, Contract &amp; Technical Advisory</h3>
          <p>
            Available for freelance projects, technical consulting, and contract engineering. Registered MSME Enterprise (UDYAM-UP-03-0065855), Prayagraj, Uttar Pradesh, India. Contact aniketmishra492@gmail.com to discuss project scopes and timelines.
          </p>
        </section>

        {/* 2. Partner Marquee with Developer Teams */}
        <PartnerMarquee />

        {/* 3. Featured Projects & Production Systems (Driven by app/data/portfolioData.js) */}
        <FeaturedProjects />

        {/* 5. Freelance Services, 4-Week Delivery Protocol & Founder Testimonials */}
        <ServicesWorkflow />

        {/* 6. Model Sovereignty 3D Router Graphic (Claude, GPT, Gemini) */}
        <ModelSovereignty />

        {/* 7. 4 Engineering Primitives / Code Walkthrough */}
        <CodeWalkthrough />

        {/* 8. FAQ */}
        <FAQ />

        {/* 9. Dark CTA + Request API Access */}
        <DarkCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* ⌘K Quick Search Modal & Fixed Floating Bottom Dock */}
      <SearchModal
        isOpen={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
