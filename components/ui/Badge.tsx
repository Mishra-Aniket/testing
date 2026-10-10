import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
        {
          'bg-bg-elevated text-text-muted': variant === 'default',
          'bg-primary/10 text-primary-light': variant === 'primary',
          'bg-accent/10 text-accent': variant === 'accent',
          'border border-border text-text-muted': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
