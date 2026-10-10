'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { SiteBlock, SectionName } from '@/lib/types';
import { SortableBlockItem } from './SortableBlockItem';
import { reorderBlocks, togglePublish, softDeleteBlock, undoDeleteBlock } from '@/app/admin/actions';
import toast from 'react-hot-toast';

interface BlockListProps {
  blocks: SiteBlock[];
  section: SectionName;
  onUpdate: () => void;
}

export function BlockList({ blocks, section, onUpdate }: BlockListProps) {
  const [items, setItems] = useState(blocks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems); // Optimistic update

    try {
      await reorderBlocks(section, newItems.map((i) => i.id));
      toast.success('Reordered');
    } catch {
      setItems(blocks); // Revert
      toast.error('Failed to reorder');
    }
  }

  async function handleTogglePublish(id: string, currentState: boolean) {
    try {
      await togglePublish(id, !currentState);
      setItems((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_published: !currentState } : b))
      );
      toast.success(currentState ? 'Hidden' : 'Published');
    } catch {
      toast.error('Failed to update');
    }
  }

  async function handleDelete(id: string) {
    const block = items.find((b) => b.id === id);
    setItems((prev) => prev.filter((b) => b.id !== id)); // Optimistic

    try {
      await softDeleteBlock(id);
      const undoToast = toast(
        (t) => (
          <div className="flex items-center gap-3">
            <span className="text-sm">Block deleted</span>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await undoDeleteBlock(id);
                  if (block) setItems((prev) => [...prev, block]);
                  toast.success('Restored');
                } catch {
                  toast.error('Failed to restore');
                }
              }}
              className="text-sm font-medium text-primary-light hover:text-primary underline"
            >
              Undo
            </button>
          </div>
        ),
        { duration: 30000 }
      );
    } catch {
      if (block) setItems((prev) => [...prev, block]); // Revert
      toast.error('Failed to delete');
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-text-dim text-sm">No blocks in this section. Add one to get started.</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((block) => (
            <SortableBlockItem
              key={block.id}
              block={block}
              onTogglePublish={handleTogglePublish}
              onDelete={handleDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
