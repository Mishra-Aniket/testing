'use client';

import { useState } from 'react';
import type { BlockType } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ImageUpload } from './ImageUpload';

// Field configs per block type
const FIELD_CONFIGS: Record<string, FieldConfig[]> = {
  hero: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'role', label: 'Role / Tagline', type: 'text', required: true },
    { name: 'availability', label: 'Availability Badge', type: 'text', placeholder: 'Open for freelance' },
    { name: 'cta_primary_text', label: 'Primary CTA Text', type: 'text', placeholder: 'Hire me' },
    { name: 'cta_primary_url', label: 'Primary CTA URL', type: 'text', placeholder: '#contact' },
    { name: 'cta_secondary_text', label: 'Secondary CTA Text', type: 'text', placeholder: 'View projects' },
    { name: 'cta_secondary_url', label: 'Secondary CTA URL', type: 'text', placeholder: '#projects' },
  ],
  project: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'summary', label: 'Summary', type: 'textarea', required: true },
    { name: 'problem', label: 'Problem Statement', type: 'textarea' },
    { name: 'stack', label: 'Tech Stack (comma separated)', type: 'tags' },
    { name: 'status', label: 'Status', type: 'select', options: ['completed', 'in-progress', 'maintained'] },
    { name: 'featured', label: 'Featured', type: 'checkbox' },
    { name: 'live_url', label: 'Live URL', type: 'text', placeholder: 'https://...' },
    { name: 'repo_url', label: 'Repo URL', type: 'text', placeholder: 'https://...' },
    { name: 'case_study_url', label: 'Case Study URL', type: 'text', placeholder: 'https://...' },
    { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  ],
  service: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g., 2-4 weeks' },
    { name: 'best_for', label: 'Best For', type: 'text' },
    { name: 'includes', label: 'Includes (one per line)', type: 'list' },
    { name: 'icon', label: 'Icon Name', type: 'text' },
  ],
  job: [
    { name: 'role', label: 'Role', type: 'text', required: true },
    { name: 'organization', label: 'Organization', type: 'text', required: true },
    { name: 'org_url', label: 'Organization URL', type: 'text', placeholder: 'https://...' },
    { name: 'start_date', label: 'Start Date', type: 'text', required: true, placeholder: 'Jan 2023' },
    { name: 'end_date', label: 'End Date', type: 'text', placeholder: 'Dec 2023' },
    { name: 'is_current', label: 'Current Position', type: 'checkbox' },
    { name: 'impact', label: 'Impact Items (one per line)', type: 'list' },
  ],
  skill: [
    { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., Frontend' },
    { name: 'name', label: 'Skill Name', type: 'text', required: true },
    { name: 'level', label: 'Level (1-5)', type: 'number', required: true },
  ],
  testimonial: [
    { name: 'author', label: 'Author Name', type: 'text', required: true },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'quote', label: 'Quote', type: 'textarea', required: true },
    { name: 'avatar_url', label: 'Avatar URL', type: 'text', placeholder: 'https://...' },
  ],
  faq: [
    { name: 'question', label: 'Question', type: 'text', required: true },
    { name: 'answer', label: 'Answer', type: 'textarea', required: true },
  ],
  text: [
    { name: 'heading', label: 'Heading', type: 'text' },
    { name: 'body', label: 'Body', type: 'textarea', required: true },
  ],
  cta: [
    { name: 'text', label: 'Button Text', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', required: true },
    { name: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary'] },
  ],
  scene: [
    { name: 'kind', label: 'Scene Kind', type: 'select', options: ['tech-orb'], required: true },
  ],
};

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'tags' | 'list';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface BlockFormProps {
  blockType: BlockType;
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  submitLabel?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export function BlockForm({
  blockType,
  initialData = {},
  onSubmit,
  submitLabel = 'Save',
  fieldErrors = {},
}: BlockFormProps) {
  const fields = FIELD_CONFIGS[blockType] ?? [];
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.type === 'tags') {
        const value = initialData[field.name];
        defaults[field.name] = Array.isArray(value) ? (value as string[]).join(', ') : '';
      } else if (field.type === 'list') {
        const value = initialData[field.name];
        defaults[field.name] = Array.isArray(value) ? (value as string[]).join('\n') : '';
      } else {
        defaults[field.name] = initialData[field.name] ?? (field.type === 'checkbox' ? false : field.type === 'number' ? 0 : '');
      }
    }
    return defaults;
  });
  const [loading, setLoading] = useState(false);

  function updateField(name: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Transform data before submission
    const transformed: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = formData[field.name];
      if (field.type === 'tags') {
        transformed[field.name] = (raw as string)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (field.type === 'list') {
        transformed[field.name] = (raw as string)
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (field.type === 'number') {
        transformed[field.name] = Number(raw) || 0;
      } else {
        transformed[field.name] = raw;
      }
    }

    try {
      await onSubmit(transformed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={`field-${field.name}`}
            className="block text-sm font-medium text-text mb-1.5"
          >
            {field.label}
            {field.required && <span className="text-accent ml-1">*</span>}
          </label>

          {field.type === 'text' && (
            <>
              <input
                type="text"
                id={`field-${field.name}`}
                value={(formData[field.name] as string) ?? ''}
                onChange={(e) => updateField(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className={cn(
                  'w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                  fieldErrors[field.name] ? 'border-red-500' : 'border-border'
                )}
              />
              {(field.name === 'image_url' || field.name === 'avatar_url') && (
                <div className="mt-2">
                  <ImageUpload
                    onUploaded={(url) => updateField(field.name, url)}
                  />
                </div>
              )}
            </>
          )}

          {field.type === 'textarea' && (
            <textarea
              id={`field-${field.name}`}
              value={(formData[field.name] as string) ?? ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              required={field.required}
              rows={4}
              placeholder={field.placeholder}
              className={cn(
                'w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none',
                fieldErrors[field.name] ? 'border-red-500' : 'border-border'
              )}
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              id={`field-${field.name}`}
              value={(formData[field.name] as number) ?? 0}
              onChange={(e) => updateField(field.name, parseInt(e.target.value, 10))}
              required={field.required}
              min={1}
              max={5}
              className={cn(
                'w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                fieldErrors[field.name] ? 'border-red-500' : 'border-border'
              )}
            />
          )}

          {field.type === 'checkbox' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id={`field-${field.name}`}
                checked={(formData[field.name] as boolean) ?? false}
                onChange={(e) => updateField(field.name, e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-text-muted">Enable</span>
            </label>
          )}

          {field.type === 'select' && (
            <select
              id={`field-${field.name}`}
              value={(formData[field.name] as string) ?? ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              required={field.required}
              className="w-full rounded-lg border border-border bg-bg-input px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="">Select...</option>
              {(field.options ?? []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === 'tags' && (
            <input
              type="text"
              id={`field-${field.name}`}
              value={(formData[field.name] as string) ?? ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.placeholder ?? 'React, Next.js, TypeScript'}
              className={cn(
                'w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                fieldErrors[field.name] ? 'border-red-500' : 'border-border'
              )}
            />
          )}

          {field.type === 'list' && (
            <textarea
              id={`field-${field.name}`}
              value={(formData[field.name] as string) ?? ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              rows={4}
              placeholder="One item per line"
              className={cn(
                'w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none',
                fieldErrors[field.name] ? 'border-red-500' : 'border-border'
              )}
            />
          )}

          {fieldErrors[field.name] && (
            <p className="mt-1 text-red-400 text-xs">
              {fieldErrors[field.name]![0]}
            </p>
          )}
        </div>
      ))}

      <div className="pt-4">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
