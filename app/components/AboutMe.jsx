"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Github, Mail, ArrowRight, Briefcase, Layers, Clock } from "lucide-react";
import { sound } from "../utils/sound";

const FACTS = [
  { icon: MapPin, label: "Based in", value: "Prayagraj, India" },
  { icon: Briefcase, label: "Working as", value: "Freelance engineer" },
  { icon: Layers, label: "Daily stack", value: ".NET 8 · FastAPI · Next.js · PostgreSQL" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
];

export default function AboutMe() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#FDFBF7] border-t border-[#E4D9BC] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
            <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
            About Me
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Bio */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15] tracking-[-0.025em] font-bold text-[#4A3B33] text-balance m-0 mb-7"
            >
              I build software that ships, and I stick around{" "}
              <span className="text-[#B45309] italic font-normal">when it breaks.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 text-[1.02rem] leading-[1.8] text-[#57534E]"
            >
              <p className="m-0">
                I'm Aniket Mishra, a full-stack engineer from Prayagraj. Over the last few years I've built
                things people actually use — a lecture ingestion system that runs across 500+ Physics Wallah
                Vidyapeeth centers, two extensions sitting on the official Chrome Web Store, an image tool
                that edits photos entirely inside your browser, and a pipeline that moves multi-gigabyte
                videos between cloud services without filling a single server's RAM.
              </p>
              <p className="m-0">
                I work freelance, and I keep it boring on purpose: written scope before we start, a fixed
                price, a deployed build you can click through every week, and the full source handed over
                at the end. You will never sit through a "trust me, it's 90% done" call with me. If
                something breaks after delivery, I fix it — the same habit that keeps 500 centers recording
                lectures every morning.
              </p>
              <p className="m-0">
                Everything on this site is real work, live or having run in production. I don't pad a
                portfolio with tutorial clones, and I don't put a metric on this page that I can't defend
                in a call. That's the whole pitch — look at the work, talk to me, decide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="#get-access"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] font-bold text-sm tracking-wide px-6 py-3 transition-all duration-200 bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:-translate-y-px"
              >
                Work With Me
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/blog"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] font-bold text-sm tracking-wide px-6 py-3 transition-all duration-200 bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:-translate-y-px"
              >
                Read the Case Studies
              </Link>
            </motion.div>
          </div>

          {/* Quick facts card */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-[#E4D9BC] bg-white p-6 sm:p-7 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-4 pb-5 border-b border-[#E4D9BC]/70">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-[#B45309] text-white font-serif text-lg font-bold shrink-0">
                  AM
                </span>
                <div>
                  <div className="font-serif font-bold text-[#4A3B33] leading-tight">Aniket Mishra</div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C] mt-0.5">
                    Full-Stack &amp; AI Systems Engineer
                  </div>
                </div>
              </div>

              <dl className="m-0 py-2">
                {FACTS.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-start gap-3.5 py-3 border-b border-[#E4D9BC]/40 last:border-b-0">
                      <span className="grid place-items-center w-7 h-7 rounded-md bg-[#FAF6EE] border border-[#E4D9BC] shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#B45309]" />
                      </span>
                      <div className="min-w-0">
                        <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#A8A29E]">{f.label}</dt>
                        <dd className="text-[13.5px] font-semibold text-[#4A3B33] m-0 leading-snug mt-0.5">{f.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>

              <div className="pt-4 mt-1 flex flex-wrap gap-2">
                <a
                  href="https://github.com/aniketmishra-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#57534E] bg-[#FAF6EE] border border-[#E4D9BC] rounded-full px-3 py-1.5 hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
                >
                  <Github className="w-3 h-3" />
                  aniketmishra-0
                </a>
                <a
                  href="https://github.com/Mishra-Aniket"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#57534E] bg-[#FAF6EE] border border-[#E4D9BC] rounded-full px-3 py-1.5 hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
                >
                  <Github className="w-3 h-3" />
                  Mishra-Aniket
                </a>
                <a
                  href="mailto:hello@aniket.one"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#57534E] bg-[#FAF6EE] border border-[#E4D9BC] rounded-full px-3 py-1.5 hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
                >
                  <Mail className="w-3 h-3" />
                  hello@aniket.one
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
