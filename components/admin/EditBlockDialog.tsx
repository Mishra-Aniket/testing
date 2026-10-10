'use client';

import { useState } from 'react';
import type { SiteBlock, BlockType } from '@/lib/types';
import { updateBlock } from '@/app/admin/actions';
import { BlockForm } from './BlockForm';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditBlockDialogProps {
  block: SiteBlock;
  onClose: () => void;
  onSaved: () => void;
}

export function EditBlockDialog({ block, onClose, onSaved }: EditBlockDialogProps) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function handleSubmit(data: Record<string, unknown>) {
    const result = await updateBlock({
      id: block.id,
      type: block.type as BlockType,
      data,
    });

    if (result && 'error' in result && result.error) {
      setFieldErrors(result.error as Record<string, string[]>);
      toast.error('Validation failed');
      return;
    }

    toast.success('Block updated');
    onSaved();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-bg-card rounded-xl border border-border w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Edit block"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text">
            Edit {block.type}
          </h2>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-text p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <BlockForm
          blockType={block.type as BlockType}
          initialData={block.data}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          fieldErrors={fieldErrors}
        />
      </div>
    </div>
  );
}
