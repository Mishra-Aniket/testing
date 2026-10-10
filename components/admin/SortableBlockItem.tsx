'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SiteBlock } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GripVertical, Eye, EyeOff, Trash2, Pencil } from 'lucide-react';
import { EditBlockDialog } from './EditBlockDialog';

interface SortableBlockItemProps {
  block: SiteBlock;
  onTogglePublish: (id: string, currentState: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

function getBlockTitle(block: SiteBlock): string {
  const data = block.data as Record<string, unknown>;
  return (
    (data.title as string) ??
    (data.name as string) ??
    (data.question as string) ??
    (data.role as string) ??
    (data.text as string) ??
    (data.kind as string) ??
    `${block.type} block`
  );
}

export function SortableBlockItem({
  block,
  onTogglePublish,
  onDelete,
  onUpdate,
}: SortableBlockItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'flex items-center gap-3 rounded-lg border bg-bg-card p-4 transition-colors',
          isDragging ? 'border-primary shadow-lg z-50' : 'border-border',
          !block.is_published && 'opacity-60'
        )}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-text-dim hover:text-text-muted cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text truncate">
            {getBlockTitle(block)}
          </p>
          <p className="text-xs text-text-dim capitalize">
            {block.type}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-text-dim hover:text-text-muted rounded transition-colors"
            aria-label="Edit block"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onTogglePublish(block.id, block.is_published)}
            className="p-2 text-text-dim hover:text-text-muted rounded transition-colors"
            aria-label={block.is_published ? 'Hide block' : 'Publish block'}
          >
            {block.is_published ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-2 text-text-dim hover:text-red-400 rounded transition-colors"
            aria-label="Delete block"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit dialog */}
      {isEditing && (
        <EditBlockDialog
          block={block}
          onClose={() => setIsEditing(false)}
          onSaved={() => {
            setIsEditing(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
}
