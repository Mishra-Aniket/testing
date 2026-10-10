import type { SiteBlock, ServiceData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';
import { Check } from 'lucide-react';

interface ServicesSectionProps {
  blocks: SiteBlock[];
}

export function ServicesSection({ blocks }: ServicesSectionProps) {
  const services = blocks.filter((b) => b.type === 'service');

  return (
    <section id="services" className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Services"
          subtitle="How I can help you build"
        />
        {services.length === 0 ? (
          <EmptyState message="No services listed yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((block) => {
              const s = block.data as unknown as ServiceData;
              return (
                <div
                  key={block.id}
                  className="rounded-xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors"
                >
                  <h3 className="text-lg font-semibold text-text">{s.title}</h3>
                  <p className="mt-2 text-text-muted text-sm">{s.description}</p>
                  {s.duration && (
                    <p className="mt-2 text-text-dim text-xs">Duration: {s.duration}</p>
                  )}
                  {s.best_for && (
                    <p className="mt-1 text-text-dim text-xs">Best for: {s.best_for}</p>
                  )}
                  {s.includes.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {s.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                          <Check className="w-4 h-4 text-primary-light mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
