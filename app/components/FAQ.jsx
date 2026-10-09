import { ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is an AI context layer?",
    a: "An AI context layer stores and retrieves the information an AI application needs for a task: company documents, business definitions, and saved interactions. Aniket provides this knowledge layer for AI agents through an API, so teams can reuse business context across models and inspect the sources used in retrieval.",
    linkText: "Connect your company knowledge →",
    href: "#how-it-works"
  },
  {
    q: "Why does my AI agent keep giving generic answers?",
    a: "An agent may give generic answers because the relevant company information never reaches its context window. Check whether your application has ingested the right documents, retrieved the relevant passages, and passed them to the model. Better prompts help specify the task, but cannot supply missing business facts by themselves.",
    linkText: "Diagnose generic and unsupported answers →",
    href: "#how-it-works"
  },
  {
    q: "How can I add business knowledge to my AI agent?",
    a: "Start with a trusted set of company documents and record their sources, versions, and access boundaries. Store that context, retrieve relevant passages for each question, and pass those passages to your LLM. In Aniket AI, developers integrate context storage and search through the API or SDKs; teams remain responsible for source quality and application permissions.",
    linkText: "Follow the business knowledge integration steps →",
    href: "#how-it-works"
  },
  {
    q: "How is AI agent memory different from a company knowledge base?",
    a: "AI agent memory preserves information from previous interactions, such as a user preference or an unfinished task. A company knowledge base holds shared information such as policies and product documentation. An agent may need both: session history to understand the conversation, and current business knowledge to answer a company-specific question.",
    linkText: "Learn how persistent agent memory works →",
    href: "#how-it-works"
  },
  {
    q: "Can grounding an LLM in enterprise data stop hallucinations?",
    a: "Grounding gives the model relevant evidence, which can reduce unsupported answers about your business. It does not guarantee correctness. Keep documents current, check retrieval quality, require source references, and make the agent say when evidence is missing. Review high-impact answers and test both retrieval and generation before expanding a workflow.",
    linkText: "Build a workflow for grounded answers →",
    href: "#how-it-works"
  }
];

export default function FAQ() {
  return (
    <section id="context-questions" className="relative w-full bg-[#FDFBF7] py-20 md:py-28 border-t border-[#E4D9BC]">
      <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="mb-14">
          <h2 id="context-questions-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4A3B33]">
            How do you give AI agents your business knowledge?
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
