import type { SiteBlock, ProjectData } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  blocks: SiteBlock[];
}

export function ProjectsSection({ blocks }: ProjectsSectionProps) {
  const projects = blocks
    .filter((b) => b.type === 'project')
    .sort((a, b) => {
      const aFeatured = (a.data as unknown as ProjectData).featured ? 0 : 1;
      const bFeatured = (b.data as unknown as ProjectData).featured ? 0 : 1;
      return aFeatured - bFeatured;
    });

  return (
    <section id="projects" className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Projects"
          subtitle="Selected work showcasing what I build"
        />
        {projects.length === 0 ? (
          <EmptyState message="No projects published yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((block) => {
              const p = block.data as unknown as ProjectData;
              return (
                <article
                  key={block.id}
                  className="group rounded-xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text group-hover:text-primary-light transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-text-muted text-sm leading-relaxed">
                        {p.summary}
                      </p>
                    </div>
                    {p.featured && (
                      <Badge variant="primary">Featured</Badge>
                    )}
                  </div>

                  {p.problem && (
                    <p className="mt-3 text-text-dim text-sm">
                      {p.problem}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <Badge
                      variant={
                        p.status === 'completed'
                          ? 'default'
                          : p.status === 'in-progress'
                            ? 'accent'
                            : 'primary'
                      }
                    >
                      {p.status}
                    </Badge>
                    {p.live_url && (
                      <a
                        href={p.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary-light text-sm inline-flex items-center gap-1 transition-colors"
                      >
                        Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.repo_url && (
                      <a
                        href={p.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary-light text-sm inline-flex items-center gap-1 transition-colors"
                      >
                        Code <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
