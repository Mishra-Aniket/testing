'use client';

import { useState } from 'react';
import type { SiteBlock, FaqData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  blocks: SiteBlock[];
}

export function FaqSection({ blocks }: FaqSectionProps) {
  const faqs = blocks.filter((b) => b.type === 'faq');
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="section-padding">
      <div className="container-tight max-w-3xl">
        <SectionHeading title="FAQ" subtitle="Common questions answered" />
        {faqs.length === 0 ? (
          <EmptyState message="No FAQs published yet." />
        ) : (
          <div className="space-y-3">
            {faqs.map((block) => {
              const f = block.data as unknown as FaqData;
              const isOpen = openId === block.id;
              return (
                <div
                  key={block.id}
                  className="rounded-lg border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : block.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-card transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-text text-sm font-medium pr-4">
                      {f.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-text-dim shrink-0 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4">
                      <p className="text-text-muted text-sm leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
