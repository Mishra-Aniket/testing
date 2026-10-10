interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No content yet.' }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <p className="text-text-dim text-sm">{message}</p>
    </div>
  );
}
