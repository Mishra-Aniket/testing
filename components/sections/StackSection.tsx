import type { SiteBlock, SkillData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';

interface StackSectionProps {
  blocks: SiteBlock[];
}

export function StackSection({ blocks }: StackSectionProps) {
  const skills = blocks.filter((b) => b.type === 'skill');

  // Group by category
  const categories: Record<string, Array<{ name: string; level: number }>> = {};
  for (const block of skills) {
    const s = block.data as unknown as SkillData;
    if (!categories[s.category]) {
      categories[s.category] = [];
    }
    categories[s.category]!.push({ name: s.name, level: s.level });
  }

  return (
    <section id="stack" className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies I work with daily"
        />
        {skills.length === 0 ? (
          <EmptyState message="No skills listed yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text">{item.name}</span>
                        <span className="text-text-dim">{item.level}/5</span>
                      </div>
                      <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(item.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
