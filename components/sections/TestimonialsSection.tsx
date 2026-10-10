import type { SiteBlock, TestimonialData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface TestimonialsSectionProps {
  blocks: SiteBlock[];
}

export function TestimonialsSection({ blocks }: TestimonialsSectionProps) {
  const testimonials = blocks.filter((b) => b.type === 'testimonial');

  // Only show section if there are testimonials
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Testimonials"
          subtitle="What clients and colleagues say"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((block) => {
            const t = block.data as unknown as TestimonialData;
            return (
              <blockquote
                key={block.id}
                className="rounded-xl border border-border bg-bg-card p-6"
              >
                <p className="text-text-muted text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  {t.avatar_url && (
                    <img
                      src={t.avatar_url}
                      alt={`${t.author} avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-text text-sm font-medium">{t.author}</p>
                    {(t.role || t.company) && (
                      <p className="text-text-dim text-xs">
                        {[t.role, t.company].filter(Boolean).join(' at ')}
                      </p>
                    )}
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
