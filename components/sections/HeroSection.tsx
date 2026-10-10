import type { SiteBlock, HeroData } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import DynamicTechOrb from '@/components/three/DynamicTechOrb';

interface HeroSectionProps {
  blocks: SiteBlock[];
}

export function HeroSection({ blocks }: HeroSectionProps) {
  const hero = blocks.find((b) => b.type === 'hero');
  if (!hero) return null;

  const data = hero.data as unknown as HeroData;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center section-padding"
    >
      <div className="container-tight w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            {data.availability && (
              <Badge variant="accent" className="text-sm">
                <span className="w-2 h-2 rounded-full bg-accent mr-2 inline-block animate-pulse" />
                {data.availability}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {data.name}
            </h1>
            <p className="text-xl md:text-2xl text-text-muted max-w-lg">
              {data.role}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={data.cta_primary_url || '#contact'}>
                <Button variant="accent" size="lg">
                  {data.cta_primary_text || 'Hire me'}
                </Button>
              </a>
              <a href={data.cta_secondary_url || '#projects'}>
                <Button variant="secondary" size="lg">
                  {data.cta_secondary_text || 'View projects'}
                </Button>
              </a>
            </div>
          </div>

          {/* 3D Orb */}
          <div className="relative h-[350px] md:h-[450px] lg:h-[500px]">
            <DynamicTechOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
