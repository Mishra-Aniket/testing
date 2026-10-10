import type { SiteBlock, JobData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';

interface ExperienceSectionProps {
  blocks: SiteBlock[];
}

export function ExperienceSection({ blocks }: ExperienceSectionProps) {
  const jobs = blocks.filter((b) => b.type === 'job');

  return (
    <section id="experience" className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Experience"
          subtitle="Where I've built and shipped"
        />
        {jobs.length === 0 ? (
          <EmptyState message="No experience listed yet." />
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {jobs.map((block) => {
                const j = block.data as unknown as JobData;
                return (
                  <div key={block.id} className="relative md:pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-[13px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-bg hidden md:block" />

                    <div className="rounded-xl border border-border bg-bg-card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-text">{j.role}</h3>
                          <p className="text-text-muted text-sm">
                            {j.org_url ? (
                              <a
                                href={j.org_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-light transition-colors"
                              >
                                {j.organization}
                              </a>
                            ) : (
                              j.organization
                            )}
                          </p>
                        </div>
                        <span className="text-text-dim text-sm whitespace-nowrap">
                          {j.start_date} – {j.is_current ? 'Present' : j.end_date}
                        </span>
                      </div>
                      {j.impact.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {j.impact.map((item, i) => (
                            <li key={i} className="text-text-muted text-sm flex items-start gap-2">
                              <span className="text-primary-light mt-1.5 shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
