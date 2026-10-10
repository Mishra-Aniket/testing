'use client';

import { useState } from 'react';
import type { SectionName, BlockType } from '@/lib/types';
import { createBlock } from '@/app/admin/actions';
import { BlockForm } from './BlockForm';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddBlockDialogProps {
  section: SectionName;
  allowedTypes: BlockType[];
  onClose: () => void;
  onCreated: () => void;
}

export function AddBlockDialog({
  section,
  allowedTypes,
  onClose,
  onCreated,
}: AddBlockDialogProps) {
  const [selectedType, setSelectedType] = useState<BlockType | null>(
    allowedTypes.length === 1 ? allowedTypes[0]! : null
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function handleSubmit(data: Record<string, unknown>) {
    if (!selectedType) return;

    const result = await createBlock({
      section,
      type: selectedType,
      data,
    });

    if (result && 'error' in result && result.error) {
      setFieldErrors(result.error as Record<string, string[]>);
      toast.error('Validation failed');
      return;
    }

    toast.success('Block created');
    onCreated();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-bg-card rounded-xl border border-border w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Add block"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text">
            Add Block to {section}
          </h2>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-text p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!selectedType ? (
          <div className="space-y-2">
            <p className="text-text-muted text-sm mb-4">Choose a block type:</p>
            {allowedTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="w-full text-left px-4 py-3 rounded-lg border border-border hover:border-border-hover hover:bg-bg-elevated transition-colors text-sm text-text capitalize"
              >
                {type}
              </button>
            ))}
          </div>
        ) : (
          <BlockForm
            blockType={selectedType}
            onSubmit={handleSubmit}
            submitLabel="Create Block"
            fieldErrors={fieldErrors}
          />
        )}
      </div>
    </div>
  );
}
