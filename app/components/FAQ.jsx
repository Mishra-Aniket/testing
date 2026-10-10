import { ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What services do you offer for freelance clients and startups?",
    a: "I provide end-to-end full-stack web engineering (Next.js 15, React, Node, FastAPI), custom AI agent & RAG architectures (Claude 3.5, GPT-4o, Gemini), rapid MVP prototyping (2–4 week turnaround), and interactive 3D UI design.",
    linkText: "Discuss your project requirements →",
    href: "#get-access"
  },
  {
    q: "What does your typical project workflow look like?",
    a: "We start with a technical discovery call to define scope and milestones. The project runs in agile 1-week sprints with live preview deployments, daily/weekly async updates via Slack/Discord, and clean git commits.",
    linkText: "Explore our delivery roadmap →",
    href: "#how-it-works"
  },
  {
    q: "Can you integrate AI capabilities into my existing product?",
    a: "Yes. From vector search and document retrieval over proprietary company data to autonomous agent workflows and automated background workers, I can dock AI securely into your existing stack with zero vendor lock-in.",
    linkText: "Learn about custom AI integrations →",
    href: "#why-context"
  },
  {
    q: "How fast can you build and launch a production-ready MVP?",
    a: "Most MVPs take between 2 to 4 weeks. You receive a fully deployed, high-speed product with database schemas, authentication, responsive styling, error monitoring, and complete source code ownership.",
    linkText: "Estimate your MVP timeline →",
    href: "#get-access"
  },
  {
    q: "Are you available for contract roles and consulting?",
    a: "Yes! I am available for high-impact freelance contracts, technical architecture consulting, and select startup roles worldwide. Reach out to discuss availability and rates.",
    linkText: "Reach out via email or book a call →",
    href: "#get-access"
  }
];

export default function FAQ() {
  return (
    <section id="context-questions" className="relative w-full bg-[#FDFBF7] py-20 md:py-28 border-t border-[#E4D9BC]">
      <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="mb-14">
          <h2 id="context-questions-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4A3B33]">
            Frequently Asked Questions (Freelance &amp; Collaboration)
          </h2>
        </div>

        {/* Single-column expanded Q&A list, exactly like the original site */}
        <div className="flex flex-col gap-10 md:gap-12">
          {FAQ_ITEMS.map((item, idx) => (
            <article key={idx} className="max-w-[76ch]">
              <h3 className="mb-3 text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-[#4A3B33]">
                {item.q}
              </h3>
              <p className="mb-4 text-[0.9375rem] leading-[1.75] text-[#57534E]">
                {item.a}
              </p>
              <a
                href={item.href}
                className="group inline-flex items-center gap-1.5 text-[0.8125rem] font-mono font-semibold tracking-[0.02em] text-[#B45309] hover:text-[#A16207] transition-colors"
              >
                <span>{item.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
