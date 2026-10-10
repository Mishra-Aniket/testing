import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({ title, subtitle, className, id }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', className)} id={id}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-muted text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
