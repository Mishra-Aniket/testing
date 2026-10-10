'use client';

import { useState, useCallback } from 'react';
import type { SiteBlock, SectionName, BlockType } from '@/lib/types';
import { BlockList } from './BlockList';
import { AddBlockDialog } from './AddBlockDialog';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface SectionManagerProps {
  sections: SectionName[];
  groupedBlocks: Record<string, SiteBlock[]>;
}

const SECTION_ALLOWED_TYPES: Record<string, BlockType[]> = {
  hero: ['hero', 'scene'],
  projects: ['project'],
  services: ['service'],
  experience: ['job'],
  stack: ['skill'],
  testimonials: ['testimonial'],
  faq: ['faq'],
  contact: ['text', 'cta'],
  footer: ['text', 'cta'],
};

export function SectionManager({ sections, groupedBlocks }: SectionManagerProps) {
  const [activeSection, setActiveSection] = useState<SectionName>(sections[0]!);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [localBlocks, setLocalBlocks] = useState(groupedBlocks);

  const activeBlocks = localBlocks[activeSection] ?? [];
  const allowedTypes = SECTION_ALLOWED_TYPES[activeSection] ?? [];

  const handleBlocksUpdated = useCallback(() => {
    // Force a refresh - in production this would use router.refresh()
    window.location.reload();
  }, []);

  return (
    <div>
      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm capitalize transition-colors',
              activeSection === section
                ? 'bg-primary text-white'
                : 'bg-bg-elevated text-text-muted hover:text-text'
            )}
          >
            {section}
            <span className="ml-2 text-xs opacity-70">
              ({(localBlocks[section] ?? []).length})
            </span>
          </button>
        ))}
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text capitalize">
          {activeSection}
        </h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          variant="primary"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Block
        </Button>
      </div>

      {/* Block list with drag and drop */}
      <BlockList
        blocks={activeBlocks}
        section={activeSection}
        onUpdate={handleBlocksUpdated}
      />

      {/* Add block dialog */}
      {showAddDialog && (
        <AddBlockDialog
          section={activeSection}
          allowedTypes={allowedTypes}
          onClose={() => setShowAddDialog(false)}
          onCreated={handleBlocksUpdated}
        />
      )}
    </div>
  );
}
